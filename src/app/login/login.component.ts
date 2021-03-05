import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth/auth.service" 
import { TokenStorageService } from '../auth/token-storage.service';
import { AuthLoginInfo } from '../auth/login-info';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  error: any;
  private loginInfo: AuthLoginInfo;

  constructor(private authService: AuthService, private tokenStorage:TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }
  onSubmit() {
    

    this.loginInfo = new AuthLoginInfo(
      this.form.user,
      this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveUserId(data.userId)

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      err=> {
        console.log(err);
        this.error = err;
        this.isLoginFailed = true;
      });
    }

  reloadPage() {
    window.location.reload();
  }

}
