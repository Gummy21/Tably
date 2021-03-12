import { Component,OnInit,OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TabsService } from '../services/tabs.service'
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  private unsub: Subject<any> = new Subject();
  form:any = {};
  userId:number;


  constructor( private tabsService: TabsService,private tokenStorage:TokenStorageService) { }

  ngOnInit() {
    this.userId = this.tokenStorage.getUsername()['User_id']
  }



  createTab(){
   
    this.tabsService.createTab(this.userId, this.form.tab, this.form.name).pipe(takeUntil(this.unsub)).subscribe(
      data =>{
        console.log(data)
    })
  }




  OnDestroy(){
    this.unsub.next()
    this.unsub.complete();
  }

}
