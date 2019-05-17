import { Injectable } from '@angular/core';
import { Orderdb } from './Orderdb';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderdbservicesService {

  orderdb : Orderdb[];

  apiOrderdbUrl = "http://localhost:51866/api/orderdb";

  constructor(private http : HttpClient,
  ) { }
 
  ServiceGetOrderdb() : Observable<Orderdb[]>{
    return this.http.get<Orderdb[]>(this.apiOrderdbUrl);
  }

  ServiceGetOrder(id : number) : Observable<Orderdb>{
    return this.http.get<Orderdb>(`${this.apiOrderdbUrl}/${id}`);
  }

  ServiceSaveOrderdb(orderdb : Orderdb) : Observable<Orderdb>{
    return this.http.post<Orderdb>(this.apiOrderdbUrl, orderdb);
  }

  ServiceDeleteOrderdb(id : number) : Observable<Orderdb>{
     return this.http.delete<Orderdb>(`${this.apiOrderdbUrl}/${id}`);
  }

  ServiceUpdateOrderdb(id : number, orderdb : Orderdb) : Observable<Orderdb>{
    return this.http.put<Orderdb>(`${this.apiOrderdbUrl}/${id}`, orderdb);
  }


 
}
