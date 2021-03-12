import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from "../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TabsService {
  apiUrl = environment.apiUrl
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  getTabs(userId){
    console.log(userId)
    return this.http.get(`${this.apiUrl}tabs?userId=${userId}`)
  }

  createTab(userId, tab, name){
    const data = {tab,name};
    console.log(data)
    return this.http.post(`${this.apiUrl}tabs?userid=${userId}`,data , httpOptions)
  }

  updateTab(userId, tab, name){
    const newData = {tab,name};
    return this.http.put(`${this.apiUrl}tabs?userid=${userId}`,newData, httpOptions )
  }

  deleteTab(id,userId){
    return this.http.delete(`${this.apiUrl}tabs?userid=${userId}`,id)
  }

 

}
