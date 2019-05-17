import { Component, OnInit } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Register } from '../RegisterModel';
import { CustomerService } from '../customer.service';
import {AuthenticationServiceService} from '../authentication-service.service';
import { Router ,CanActivate , ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute} from '@angular/router';
import { first } from 'rxjs/operators';

 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  returnUrl: string;
  error = '';

 
  
 
   register : Register = new Register(); 

  constructor(
     private customerService : CustomerService,
     private authenticationService : AuthenticationServiceService,
   private router : Router,
   private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
 
  OnSubmit(){
   
    this.authenticationService.login(this.register.Email, this.register.Password).subscribe(register=>{
      if(register ){
        localStorage.setItem('currentUser', JSON.stringify(register));
        this.customerService.getCustomers();
        this.router.navigate(['/customer']);
        
      }
    })
     
      // this.router.navigate(['/customer']);


  }
  



  NavToRegister(): void{
     this.router.navigate(['/register']);
  }

  // LoginForm() : void{
  //      this.customerService.LoginCustomer(this.register).subscribe(); 
  // }

  // LoginForm(userName, password){
  //   this.customerService.userAuthentication(userName, password).subscribe((data : any) => {
  //     localStorage.setItem('userToken', data.access_token);
  //     this.router.navigate[('/customer')];
  //   })
  // }
  //  LoginForm(userName, password){
  //      this.authenticationService.login(userName, password).subscribe();
  //  }
}
