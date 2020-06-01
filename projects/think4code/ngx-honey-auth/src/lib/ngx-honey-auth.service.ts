import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgxHoneyConfigAuth } from './ngx-honey-config-auth';
import { AuthConfig } from './ngx-honey.types';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NgxHoneyAuthService {

  private storage;

  /**
   * Service responsible for all auth methods
   * @param config AuthConfig
   * @param http HttpClient
   */
  constructor(@Inject(NgxHoneyConfigAuth) public config: AuthConfig, private http: HttpClient, private router: Router) {
    if (!this.config) {
      throw new Error('NgxHoneyAuthService - You must define config for AuthService');
    } else {
      if (!this.config.authRoute) {
        throw new Error('NgxHoneyAuthService - You must define authRoute config');
      }

      if (!this.config.authHeaderType) {
        throw new Error('NgxHoneyAuthService - You must define authHeaderType config');
      }

      if (!this.config.endpoints) {
        throw new Error('NgxHoneyAuthService - You must define login endpoints for AuthService');
      }

      // Config the storage type
      this.setStorage();
    }
  }

  /**
   * Login method, responsible for user login
   * @param username string
   * @param password string
   * @param aditionalBody Object responsible for add aditional data to body before send to API
   * @param requestDataTransform Function responsible for transform parameters before send to API
   * @param responseDataTransform Function responsible for transform response before send subscribe
   */
  login(username, password, requestDataTransform?, responseDataTransform?, aditionalBody?): Observable<any> {

    let body = { username, password };

    if (!this.config.endpoints.login) {
      throw new Error('NgxHoneyAuthService - You must define login endpoint for AuthService');
    }

    this.debug('NgxHoneyAuthService - Login::body', body);

    if (requestDataTransform) {
      body = requestDataTransform(body);
      this.debug('NgxHoneyAuthService - Login::requestDataTransform', body);
    }

    if (aditionalBody) {
      body = Object.assign(body, aditionalBody);
    }


    return this.http.post(this.config.endpoints.login, body).pipe( map( (apidata: any) => {

      this.debug('NgxHoneyAuthService - Login::response', apidata);

      let data = apidata;
      if (responseDataTransform) {
        data = responseDataTransform(apidata);
        this.debug('NgxHoneyAuthService - Login::responseDataTransform', data);
      }

      if (!data || !data.token) {
        throw new Error('NgxHoneyAuthService - Auth endpoint or responseDataTransform function must return { token, expireIn? } type');
      } else {

        this.setToken(data);
        this.router.navigate([this.config.appRoute]);

        return data;
      }
    }));

  }

  /**
   * Logout method, responsible for uaer logout
   * @param responseDataTransform Function, responsible for data parse of API response.
   */
  logout(responseDataTransform?): Observable<any> {

    if (this.config.endpoints.logout) {

      return this.http.post(this.config.endpoints.logout, {}).pipe( map( (apidata: any) => {
        let data: { success } = apidata;
        if (responseDataTransform) {
          data = responseDataTransform(apidata);
          this.debug('NgxHoneyAuthService - Logout::responseDataTransform', data);
        }

        if (!data || !data.success) {
          throw new Error('NgxHoneyAuthService - Logout endpoint or responseDataTransform function must return { success } type');
        } else {
          this.clearStorage();
          this.router.navigate([this.config.authRoute]);
        }
      }));

    } else {
      this.clearStorage();
      this.router.navigate([this.config.authRoute]);
    }

  }

  /**
   * Return token according to configured storage
   */
  getToken() {
    return this.storage.getItem('token');
  }

  /**
   * Set token according to configured storage
   * @param data Contain token and possibly expireIn
   */
  setToken(data): void {

    if (data.token) {
      this.storage.setItem('token', data.token);
    }

    if (data.expireIn) {
      this.storage.setItem('tokenExpireIn', data.expireIn);
    }

  }

  /**
   * Clear storage
   */
  clearStorage() {
    this.storage.clear();
  }

  /**
   * Define storage from configs
   */
  setStorage() {
    this.storage = (this.config.sessionStorage) ? window.sessionStorage : window.localStorage;
  }

  /**
   * Display console informations about this service methods execution
   * @param label Identifier
   * @param data Data to display
   */
  debug(label, data) {
    if (this.config.debug) {
      console.log(label, data);
    }
  }

}
