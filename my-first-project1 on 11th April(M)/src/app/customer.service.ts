import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Customer } from './Customer';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Register } from './RegisterModel';



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

   register : Register[];
   
   apiURL = "http://localhost:51866/api/products";

   RegisterURL = "http://localhost:51866/api/Account/register";

   LoginUrl = "http://localhost:51866/token";
  
  constructor( private http : HttpClient , 
  
   ) { 
   
   }


  httpOptions = {
    header : new HttpHeaders({
      'Content-Type': 'application/json', 
    })
  }

  

  userAuthentication(userName: string, password: string){
     

      const payload = new HttpParams()
  .set('username', userName)
  .set('password', password) 
  .set('grant_type', 'password');
      return this.http.post(this.LoginUrl, payload);
  }





   registerCustomer(register : Register) : Observable<Register>{
     return this.http.post<Register>(this.RegisterURL, register, httpOptions);
   }




   getCustomers() : Observable<Customer[]>{
    return this.http.get<Customer[]>(this.apiURL);

  
   }
   
   getCustomer(id : number) : Observable<Customer>{
    return this.http.get<Customer>(`${this.apiURL}/${id}`);
        //  return this.http.get<Customer>(`${this.apiURL}/${id}`, {headers : new HttpHeaders().set('Authorization', this.authToken)});
   }




   saveCustomers(customer : Customer) : Observable<Customer>{
    return this.http.post<Customer>(this.apiURL, customer);
    //  return this.http.post<Customer>(this.apiURL, customer,  {headers : new HttpHeaders().set('Authorization', this.authToken)} );
   } 


   delCustomer(id : number) : Observable<Customer>{
    return this.http.delete<Customer>(`${this.apiURL}/${id}`);
    //return this.http.delete<Customer>(`${this.apiURL}/${id}`, {headers : new HttpHeaders().set('Authorization', this.authToken)});
  }
  
  updateCust(id : number,customer : Customer) : Observable<Customer>{
    console.log(">>>>>>>>>>>>>>>>",customer);
    return this.http.put<Customer>(`${this.apiURL}/${id}`,customer);
    //return this.http.put<Customer>(`${this.apiURL}/${id}`,customer, {headers : new HttpHeaders().set('Authorization', this.authToken)});
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

 
