import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgxHoneyAuthService } from '@think4code/ngx-honey-auth';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    pass: new FormControl('', [Validators.required])
  });

  constructor(private service: NgxHoneyAuthService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onSubmit() {

    // author@gmail.com
    // 123456
    this.service.login(
      this.form.value.email,
      this.form.value.pass,
      this.requestDataTransform,
      this.responseDataTransform
    ).subscribe(
      seccess => {},
      error => {
        this.snackBar.open('User and Password incorrect. Please try again.', '', {
          duration: 3000
        });
      }
    );
  }

  requestDataTransform(data) {
    return { identifier: data.username, password: data.password };
  }

  responseDataTransform(data) {
    return { token: data.jwt };
  }

  getErrorMessage() {

    if (this.form.controls.email.hasError('required')) {
      return 'You must enter a value';
    } else if (this.form.controls.email.hasError('email')) {
      return 'Not a valid email';
    }

    if (this.form.controls.pass.hasError('required')) {
      return 'You must enter a value';
    }

  }

}
