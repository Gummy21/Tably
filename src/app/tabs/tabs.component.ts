import { Component, OnInit, OnDestroy } from '@angular/core';
import {TabsService} from "../services/tabs.service"
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TokenStorageService } from '../auth/token-storage.service'

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, OnDestroy {
  private unsub: Subject<any> = new Subject();
  tabs: any;
  userId:any;
  error:any;
  tab: any;
  name: any;
  //add auth service + get user id
  constructor(private tabsService: TabsService, private tokenStorage: TokenStorageService ) { }

ngOnInit(){
    this.userId = this.tokenStorage.getUsername()['User_id'];
    
    this.tabsService.getTabs(this.userId).pipe(takeUntil(this.unsub)).subscribe(data => {
      this.tabs = data
      console.log(data)
    },err => {
      this.error = err
    });
  }



    removeTab(id){
      this.tabsService.deleteTab(id,this.userId).pipe(takeUntil(this.unsub)).subscribe(response =>{
        console.log(response)
        // redirect?/remove from tabs with id?
      }), err =>{
        this.error = err
        console.log(err)
      }
    }

    updateTab(){
      this.tabsService.updateTab(this.userId,this.tab,this.name).pipe(takeUntil(this.unsub)).subscribe(response =>{
        console.log(response)
        // redirect? / update tabs with id?
      })
    }

  ngOnDestroy() {
    this.unsub.next();
    this.unsub.complete(); 
  }

}
