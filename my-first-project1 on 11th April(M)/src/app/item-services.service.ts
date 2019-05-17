import { Injectable } from '@angular/core';
import { Item } from './Item';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ItemServicesService {

  item : Item[];

  apiItemUrl = "http://localhost:51866/api/item"

  

  constructor(private http : HttpClient,
    
    ) {

   }

   httpOptions = {
    header : new HttpHeaders({
      'Content-Type': 'application/json', 
    
    })
  }

  
  ServiceItems() : Observable<Item[]>{
    return this.http.get<Item[]>(this.apiItemUrl);
   }
   
   ServiceSaveItem(item : Item) : Observable<Item>{
      return this.http.post<Item>(this.apiItemUrl, item);
   }

   ServiceGetItem(id : number) : Observable<Item>{
     return this.http.get<Item>(`${this.apiItemUrl}/${id}`);
   }

  ServiceDeleteItem(id : number) : Observable<Item>{
    return this.http.delete<Item>(`${this.apiItemUrl}/${id}`);
  }

  ServiceUpdatedItem(id : number, item : Item) : Observable<Item>{
    return this.http.put<Item>(`${this.apiItemUrl}/${id}`, item);
  }

}
