import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CustomHttpInterceptorService implements HttpInterceptor {
 

  intercept(request : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>>{
    if(!request.url.includes("token")){
    let authToken = localStorage.getItem('currentUser');
    
    let token = JSON.parse(authToken).access_token;


     const authRequest = request.clone({
       headers : new HttpHeaders({
         'content-Type' : 'application/json',
         'Authorization' :  'Bearer ' + token,
       })
     });
     console.log('Intercept Http Calls', authRequest);

     return next.handle(authRequest);
  
  }
  return next.handle(request);
}

  constructor() { }
}
