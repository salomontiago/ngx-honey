import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NgxHoneyAuthService } from './ngx-honey-auth.service';

@Injectable()
export class  NgxHoneyAuthInterceptor implements HttpInterceptor {

  constructor(private service: NgxHoneyAuthService, private route: Router) {}

  /**
   * Intercept all requests and if has token add it to request headers, else navigate to auth route.
   * @param req HttpRequest
   * @param next HttpHandler
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {


    if (this.service.getToken()) {
      req = this.addAuthenticationToken(req);
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error && error.status === 401) {
          this.route.navigate([this.service.config.authRoute]);
        } else {
          return throwError(error);
        }
      })
    );
  }

  /**
   * Add token to request headers.
   * @param request HttpRequest
   */
  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      headers: request.headers.set(this.service.config.authHeaderType, this.service.config.authType + this.service.getToken())
    });
  }
}
