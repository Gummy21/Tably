import { Component, OnInit} from '@angular/core';
import { TokenStorageService } from './auth/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Tably';
  user_details: Object = {}
  loggedIn = false;
  constructor( private tokenStorage:TokenStorageService) { }

  ngOnInit(){
    if (this.tokenStorage.getUsername()['Username'] != null || this.tokenStorage.getUsername()['User_id'] != null ){
      this.user_details = this.tokenStorage.getUsername();
      console.log(this.user_details)
      this.loggedIn = true;
    }
  }

  logOut(){
    this.tokenStorage.signOut()
    window.location.reload();
  }

}