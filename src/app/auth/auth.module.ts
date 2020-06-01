import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxHoneyAuthModule } from '@think4code/ngx-honey-auth';
import { AuthComponent } from './auth.component';
@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    NgxHoneyAuthModule.forRoot(
      {
        appRoute: '',
        authRoute: 'auth',
        authHeaderType: 'Authorization',
        authType: 'Bearer',
        endpoints: {
          login: 'http://localhost:1337/auth/local'
        }
      }
    ),
  ]
})
export class AuthModule { }
