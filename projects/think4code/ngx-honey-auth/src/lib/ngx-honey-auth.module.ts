import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxHoneyAuthInterceptor } from './ngx-honey-auth.interceptor';
import { NgxHoneyAuthService } from './ngx-honey-auth.service';
import { NgxHoneyConfigAuth } from './ngx-honey-config-auth';
import { AuthConfig } from './ngx-honey.types';


@NgModule({
  imports: [
    HttpClientModule
  ]
})
export class NgxHoneyAuthModule {

  static forRoot(config: AuthConfig): ModuleWithProviders {
    return {
      ngModule: NgxHoneyAuthModule,
      providers: [
        NgxHoneyAuthService,
        {
          provide: NgxHoneyConfigAuth,
          useValue: config
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass:  NgxHoneyAuthInterceptor,
          multi: true
        }
      ]
    }
  }

}
