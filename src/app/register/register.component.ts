import { Component, OnInit,OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from "../auth/auth.service" 
import { SignUpInfo } from '../auth/signup-info';
import { Subject } from 'rxjs';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  private unsub: Subject<any> = new Subject();
  form: any = {};
  isSignedUp = false;
  isSignUpFailed = false;
  error: any;
  signupInfo: SignUpInfo;

  constructor(private authService: AuthService, private tokenStorage:TokenStorageService) { }

  ngOnInit() {}

  onSubmit() {
    console.log(this.form);

    this.signupInfo = new SignUpInfo(
      this.form.user,
      this.form.password);

    this.authService.signUp(this.signupInfo).pipe(takeUntil(this.unsub)).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveUserId(data.userid)
        this.redirectPage()
      },
      err => {
        console.log(err);
        this.error = err;
        this.isSignUpFailed = true;
      }
    );
  }

  redirectPage() {
    window.location.href="/";
  }


  ngOnDestroy(){
    this.unsub.next();
    this.unsub.complete(); 
  }
}
