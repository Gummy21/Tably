import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from "../../environments/environment"


@Injectable({
  providedIn: 'root'
})
export class TabsService {
  apiUrl = environment.apiUrl
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  getTabs(userId){
    return this.http.get(`${this.apiUrl}tabs?userid=${userId}`)
  }

  createTab(userId, tab, name){
    const data = {tab,name};
    userId = 1
    return this.http.post(`${this.apiUrl}tabs?userid=${userId}`,data)
  }

  updateTab(userId, tab, name){
    const newData = {tab,name};
    return this.http.put(`${this.apiUrl}tabs?userid=${userId}`,newData)
  }

  deleteTab(id,userId){
    return this.http.delete(`${this.apiUrl}tabs?userid=${userId}`,id)
  }

 

}
