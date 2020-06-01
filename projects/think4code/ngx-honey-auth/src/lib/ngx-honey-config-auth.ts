import { InjectionToken } from '@angular/core';
import { AuthConfig } from './ngx-honey.types';

export const NgxHoneyConfigAuth = new InjectionToken<AuthConfig>('AuthConfig');
