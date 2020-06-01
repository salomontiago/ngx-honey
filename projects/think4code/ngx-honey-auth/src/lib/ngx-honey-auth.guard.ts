import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { NgxHoneyAuthService } from './ngx-honey-auth.service';


@Injectable()
export class NgxHoneyAuthGuard implements CanActivate {

  /**
   * Authentication guard
   * @param auth NgxHoneyAuthService service
   * @param router Router
   */
  constructor(private auth: NgxHoneyAuthService, private router: Router) {}

  /**
   * Responsible for, permit or not, access to the routes.
   * @param route Current route
   * @param state State of current route
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const token = this.auth.getToken();
    const isAuthRoute = state.url.includes(this.auth.config.authRoute);

    if (token && isAuthRoute) {
      this.router.navigate([this.auth.config.appRoute]);
      return true;
    } else if (token && !isAuthRoute) {
      return true;
    } else if (!token && isAuthRoute) {
      return true;
    } else {
      this.router.navigate([this.auth.config.authRoute]);
      return true;
    }
  }
}
