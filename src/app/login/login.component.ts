import { Component, OnInit,OnDestroy } from '@angular/core';
import { AuthService } from "../auth/auth.service" 
import { TokenStorageService } from '../auth/token-storage.service';
import { AuthLoginInfo } from '../auth/login-info';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private unsub: Subject<any> = new Subject();
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

    this.authService.attemptAuth(this.loginInfo).pipe(takeUntil(this.unsub)).subscribe(
      data => {
        console.log(data.userid)
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveUserId(data.userid)

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.redirectPage();
      },
      err=> {
        console.log(err);
        this.error = err;
        this.isLoginFailed = true;
      });
    }

  redirectPage() {
    window.location.href="/";
  }


  ngOnDestroy(){
    this.unsub.next();
    this.unsub.complete(); 
  }
}
