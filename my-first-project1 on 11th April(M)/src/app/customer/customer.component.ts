import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../customer.service';
import { MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Customer } from '../Customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customer : Customer[];
  Selcustomer : Customer;
  constructor(private CustomerService : CustomerService,
 
    private router: Router   
 ) { 
 
  }


  displayedColumns: string[] = ['CustomerId', 'Name', 'Email', 'Phone', 'Address','AlternateNumber','ImageUrl' ,'Actions'];
  // datasource = new MatTableDataSource<Customer>(Customers);
  datasource;
  // selection = new SelectionModel<Customer>(true, []);

  
   @ViewChild(MatPaginator) paginator : MatPaginator;
   @ViewChild(MatSort, {}) sort : MatSort;
   


  

  ngOnInit() 
  {
    this.CustomerService.getCustomers().subscribe(cust => {
      this.datasource = new MatTableDataSource(cust);
      var imageValue = "data:image/jpeg;base64,";
      cust.map(function(custimage){
        if(custimage.ImagePath){
          custimage.ImagePath = imageValue + custimage.ImagePath;
        }
        return custimage;
      });
    
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    }) 
  }
 
  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  deleteCustomer(id : number) : void {
    var result = window.confirm("Do you want to delete ? ");
    if(result){
   
      this.CustomerService.delCustomer(id).subscribe(x => console.log(x));
      window.alert("Delete it !!!!")
      location.reload();
    }
    else{
      return null;
    }
  }

  AddCustomer(){
    this.router.navigate(['/add-customer']);
  }

   navi = '/update';
  Navigation(id : number):void{
       this.CustomerService.getCustomer(id).subscribe();
    this.router.navigate([`${this.navi}/${id}`]);
  }
}



