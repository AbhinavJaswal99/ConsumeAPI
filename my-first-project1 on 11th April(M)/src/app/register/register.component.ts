import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Register } from '../RegisterModel';
import { CustomerService } from '../customer.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from './must-match.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
   registerForm : FormGroup;
   submitted = false;
   register : Register = new Register();
  

  constructor(
    private formBuilder : FormBuilder,
    private loacation : Location,
    private customerService : CustomerService,
    private router : Router
  ) { }

  ngOnInit() {
     this.registerForm = this.formBuilder.group({
       Email : ['',  Validators.compose([Validators.required, Validators.email])],
       password : ['', Validators.compose([Validators.required , Validators.minLength(6)])],
       confirmPassword : ['',  Validators.required]
     }, {
       validator : MustMatch('password', 'confirmPassword')
     });
  }

  get f() { return  this.registerForm.controls ; }

  NavToLogin() : void{
    this.router.navigate(['/login']);
  }

  RegisterModel() : void{
    
   
  }

  onSubmit(): void{
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
  }
  else{
    this.customerService.registerCustomer(this.register).subscribe();
    window.alert("Registration Done !!!");
  } 

  }

}
