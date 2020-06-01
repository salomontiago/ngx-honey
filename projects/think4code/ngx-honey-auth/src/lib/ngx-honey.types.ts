export interface AuthEndpoints {
  login: string;
  logout?: string;
}

export interface AuthConfig {
  appRoute: string | '' | 'dashboard' | 'app';
  authRoute: string | 'auth';
  authType: string | 'Bearer' | 'JWT';
  authHeaderType: string | 'Authorization';
  endpoints: AuthEndpoints;
  sessionStorage?: boolean;
  logoutByApi?: boolean;
  debug?: boolean;
}
