import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthenticationServiceService } from './authentication-service.service';
import { Register } from './RegisterModel';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  register : Register = new Register();
 
   constructor
   (
      private router : Router,
      // private authenticationService : AuthenticationServiceService
   ){ }
  

   canActivate(route , state : ActivatedRouteSnapshot ){
    let usertok = localStorage.getItem('currentUser')

    if(usertok){
      return true;
    }
   
    this.router.navigate(['/login'], { queryParams : {returnUrl : state.url}});
    return false;
  }    
}

