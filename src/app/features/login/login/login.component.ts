import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUserLogin } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/core/services/auth.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { NotificationService } from "../../../core/services/notification.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  aSub!: Subscription;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor ( private auth: AuthService,
                private tokenStorage: TokenStorageService,
                private router: Router,
                private route: ActivatedRoute,
                private notification: NotificationService) { }

  path = '/home'

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(4)])
    })

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }

    this.route.queryParams.subscribe(( params: Params) => {
      if (params['accessDenied']) {
        this.notification.warn('You can\'t get this page. Login at first');
      }
    })
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  onSubmit() {
    this.form.disable()

    const loginData: IUserLogin = {
      username: this.form.value.username.trim(),
      password: this.form.value.password.trim()
    }

    this.aSub = this.auth.login(loginData).subscribe(
      data => {
        this.router.navigate(['/home']);

        this.tokenStorage.saveToken(data);

        const role = JSON.parse(atob(data.accessToken.split('.')[1])).role;
        sessionStorage.setItem('role', role);

        this.auth.startRefreshTokenTimer();
        this.isLoginFailed = false;
        this.isLoggedIn = true;
      },
      err => {
        this.errorMessage = err;
        this.notification.error(this.errorMessage);
        this.isLoginFailed = true;
        this.form.enable()
      }
    );
  }
}
