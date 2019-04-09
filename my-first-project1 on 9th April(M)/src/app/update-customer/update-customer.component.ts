import { Component, OnInit } from '@angular/core';
import { Customer } from '../Customer';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { Location } from '@angular/common';



@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {
  customer : Customer;
    

  constructor( private route :ActivatedRoute,
    private CustomerService : CustomerService,
    private location : Location,
    private router : Router
    ) { 
   
  }

  ngOnInit() : void{
     this.getCustomer();
  }

  getCustomer() : void{
       const id  = +this.route.snapshot.paramMap.get('id');
     this.CustomerService.getCustomer(id).subscribe(cust => this.customer = cust);

     }
     

     updateCustomer(id : number){
       this.CustomerService.updateCust(id, this.customer).subscribe(x => console.log(x));
       window.alert("Update Done !!!");
       this.location.back();
     }
  

 

  GoBack() : void{
    this.location.back();
  }

   // updateCust(id : number){
  //   this.CustomerService.updateCust(id, this.customer).subscribe(x => console.log(x));
  //   window.alert("Update Done !!!!");
  // }
 
  
  // UpdateData(){
  //   this.CustomerService.updateCustomer(this.customer);
  //   window.alert("Data is updated");
  //   this.router.navigate(['/customer']);
  // }

   // getCustomer() : void{
  //   const id  = +this.route.snapshot.paramMap.get('id');
  //   this.CustomerService.getCustomers(id).subscribe(cust => this.customer = cust);
  // }
}




