import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Customer } from './Customer';
//import {InMemoryDataService} from './In-Memory-Data-Services'

import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
   customer : Customer[] ;
   
   apiURL = "http://localhost:51866/api/products";

   loginURL = "http://localhost:51866/api/Account/register";
  

  constructor( private http : HttpClient ) { }


  httpOptions = {
    header : new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

   getCustomers() : Observable<Customer[]>{
     return this.http.get<Customer[]>(this.apiURL);
   }
   
   getCustomer(id : number) : Observable<Customer>{
     return this.http.get<Customer>(`${this.apiURL}/${id}`);
   }




   saveCustomers(customer : Customer) : Observable<Customer>{
     return this.http.post<Customer>(this.apiURL, customer, httpOptions );
   } 


   delCustomer(id : number) : Observable<Customer>{
    return this.http.delete<Customer>(`${this.apiURL}/${id}`, httpOptions);
  }
  
  updateCust(id : number,customer : Customer) : Observable<Customer>{
    return this.http.put<Customer>(`${this.apiURL}/${id}`,customer, httpOptions);
  }






  // getCustomer() : Observable<Customer[]>{

  //   return of(Customers);
  // }


  // getCustomer() : Observable<Customer[]>{
  //    return this.http.get<Customer[]>(this.apiURL);
  // }


  // getCustomers(id:number) : Observable<Customer>{
  //   let customer=Customers.find(cust => cust.CustomerId === id);

  //   return of( JSON.parse(JSON.stringify(customer)));
  // }
 
   
  // saveCustomers(customer : Customer){
  //   Customers.push(customer);
  // }

  // updateCustomer(customer : Customer){
  //    let index = Customers.findIndex(cust => cust.CustomerId === customer.CustomerId);
  //    Customers[index]=customer;
  //    }


  //    deleteCustomer(id : number){
  //       const i = Customers.findIndex(e => e.CustomerId == id);
  //         Customers.splice(i, 1);
  //      }
  //    }
  // }
}

 
