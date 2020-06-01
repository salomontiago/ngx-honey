import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { NgxHoneyAuthGuard } from '@think4code/ngx-honey-auth';

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
export class AppRoutingModule { }
