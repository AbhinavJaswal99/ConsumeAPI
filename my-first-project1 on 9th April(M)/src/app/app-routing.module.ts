import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AddCustomerComponent} from './add-customer/add-customer.component';
import {UpdateCustomerComponent} from './update-customer/update-customer.component';
import { CustomerComponent } from './customer/customer.component'
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';



const routes : Routes = [
  { path :'', redirectTo : '/customer', pathMatch :'full'},
    { path : 'customer', component : CustomerComponent},
   {path : 'add-customer', component : AddCustomerComponent},
  // {path : 'update/:id', component : UpdateCustomerComponent}
   {path : 'update/:id', component : UpdateCustomerComponent},
    {path : 'register', component : RegisterComponent}
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    
 
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
