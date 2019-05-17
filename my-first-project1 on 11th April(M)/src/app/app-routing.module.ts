import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AddCustomerComponent} from './add-customer/add-customer.component';
import {UpdateCustomerComponent} from './update-customer/update-customer.component';
import { CustomerComponent } from './customer/customer.component'
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CustomHttpInterceptorService } from './custom-http-interceptor.service';
import { ItemComponent } from './item/item.component';
import { AddItemComponent } from './add-item/add-item.component';
import { UpdateItemComponent } from './update-item/update-item.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderInformationComponent } from './order-information/order-information.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import {PracticeComponent} from './practice/practice.component';




const routes : Routes = [
  // { path :'', redirectTo : '/customer', pathMatch :'full'},
   {path : '', redirectTo:'/login', pathMatch :'full'},
  //  {path:'home', component : HomepageComponent, canActivate:[AuthGuard]},
    { path : 'customer', component : CustomerComponent,canActivate:[AuthGuard]   },
   {path : 'add-customer', component : AddCustomerComponent, canActivate:[AuthGuard]  },
  // {path : 'update/:id', component : UpdateCustomerComponent}
   {path : 'update/:id', component : UpdateCustomerComponent, canActivate:[AuthGuard]    },
    {path : 'register', component : RegisterComponent},
    {path : 'login', component : LoginComponent},
    {path : 'item', component : ItemComponent},
    {path : 'add-item', component : AddItemComponent, canActivate:[AuthGuard]},
    {path : 'update-item/:id', component : UpdateItemComponent, canActivate:[AuthGuard]},
    {path : 'add-order', component : AddOrderComponent, canActivate:[AuthGuard]},
    {path :'order-information',component : OrderInformationComponent, canActivate:[AuthGuard]},
    {path : 'edit-order/:id', component : EditOrderComponent, canActivate:[AuthGuard]},
    {path : "practice", component :PracticeComponent }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule,
    NgbModule.forRoot()
    
 
  ],
  exports: [ RouterModule ],
  providers:[
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptorService, multi: true },
  ]

})
export class AppRoutingModule { }
