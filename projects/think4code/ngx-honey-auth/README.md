
![Honey logo](https://salomontiago.github.io/ngx-honey/logo.svg)

NgxHoneyAuth is an authentication module, part of NgxHoney module set, responsible for, control user session. This module has AuthGuard and AuthService, for implement on any application auth module with Angular.

Below, we demonstrate how you can config this module. 

## Install

    yarn add @think4code/ngx-honey-auth

or 

    npm install @think4code/ngx-honey-auth

## Configurations

For config NgxHoneyAuthModule, you must to define the default configurations params, and import it on your module at Angular:
  
    NgxHoneyAuthModule.forRoot({
      appRoute: '',
      authRoute: 'auth',
      authHeaderType: 'Authorization',
      authType: 'Bearer',
      sessionStorage: true,
      endpoints: {
        login: 'http://localhost:1337/auth/local',
      },
      debug: true
    })
    

### Options

| Param | Description |
| -- | -- |
| appRoute | Responsible for application main route, this is used for redirection the app, after login success.
| authRoute | This is the login page route
| authHeaderType | This is the type of auth, set in header
| authType | This is the auth type, like Bearer, JWT or any other string
| endpoints | This param has two properties, login and logout. They are the endpoints called by app to login and logout. If you won't set logout property, the app just clear the storage and redirect to setted authRoute.
| debug? | This enable to display logs to browser console log, when NgxHoneyAuthService call the api
| sessionStorage? | If true the app use sessionStorage instead on localStorage


## Routing guard

For activate route guard, just add the
NgxHoneyAuthGuard as provider of your routing module, and in yours routes on canActivate, like below:

    const routes: Routes = [
      {
        path: '',
        loadChildren: () => import('./main/main.module').then(m => m.MainModule),
        canActivate: [NgxHoneyAuthGuard]
      },
      {
        path: 'auth',
        component: AuthComponent,
        canActivate: [NgxHoneyAuthGuard]
      },
    ];

    @NgModule({
      imports: [RouterModule.forRoot(routes)],
      exports: [RouterModule],
      providers: [
        NgxHoneyAuthGuard
      ]
    })
