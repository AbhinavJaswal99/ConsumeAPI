import { BrowserModule } from '@angular/platform-browser';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { InMemoryDataService }  from './In-Memory-Data-Services';
import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { AppRoutingModule } from './app-routing.module';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule,MatPaginatorModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSortModule, MatCheckboxModule, MatIconModule} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const modules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule
];



@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    AddCustomerComponent,
    UpdateCustomerComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    MatFormFieldModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    HttpClientModule,
    MatIconModule,
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // ),
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
     [...modules],
    
  ],
  exports : [...modules]
  ,
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
