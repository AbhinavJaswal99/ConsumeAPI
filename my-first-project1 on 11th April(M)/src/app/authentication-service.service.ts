import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Register } from './RegisterModel';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  //  private currentUserSubject : BehaviorSubject<Register>;
  //  public currentUser : Observable<Register>;
   register : Register;
   LoginUrl = "http://localhost:51866/token";
  //  token = localStorage.getItem("userToken");
  //   authToken = `Bearer ${this.token}`;


  constructor(private http: HttpClient) { 
 
  }

 

  login(username : string, password : string) : Observable<any>{
    const payload = new HttpParams()
    .set('username', username)
    .set('password', password) 
    .set('grant_type', 'password')
    
  
  

    //  this.http.post<any>(this.LoginUrl, payload).pipe(map(register => {
    //   if(register && register.token){
    //     localStorage.setItem('currentUser', JSON.stringify(register));
    //     // this.currentUserSubject.next(register);
    //   }
    //   return register;
    // }));

  return  this.http.post<any>(this.LoginUrl, payload);
  }

  logout(){
    localStorage.removeItem('currentUser');
  }
}
