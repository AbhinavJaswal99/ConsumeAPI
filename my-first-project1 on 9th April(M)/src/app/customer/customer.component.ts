import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from '../Customer';
import { CustomerService } from '../customer.service';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import {SelectionModel,  DataSource} from '@angular/cdk/collections';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
    customers : Customer[] ;
  
     apiURL = "http://localhost:51866/api/products";
  constructor(private CustomerService : CustomerService,
    private route :ActivatedRoute,
    private http : HttpClient,
    private router: Router   
 ) { 
    //  this.customers=[];
  }

  // datasource = Customers;'
  displayedColumns: string[] = ['CustomerId', 'Name', 'Email', 'Phone', 'Address','AlternateNumber','Actions'];
  // datasource = new MatTableDataSource<Customer>(Customers);
  datasource;
  selection = new SelectionModel<Customer>(true, []);
  //  @ViewChild(MatPaginator, {}) paginator : MatPaginator;
  //  @ViewChild(MatSort, {}) sort : MatSort;
   


  

  ngOnInit() {
   
     this.getCust();
    //  this.datasource.paginator = this.paginator;
    //  this.datasource.sort = this.sort;
  }
 
  
 
  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  

  getCust(): void{
     this.CustomerService.getCustomers().subscribe(cust => this.datasource = cust);
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




  handleError(error){
      let errorMessage = "";
      if(error.error instanceof ErrorEvent){
        errorMessage = error.error.message;
      }else{
        errorMessage = 'Error Code : ${error.status}\nMessage: ${error.message}';
      }
      window.alert(errorMessage);
      return throwError(errorMessage);
  };

   navi = '/update';
  Navigation(id : number):void{
       this.CustomerService.getCustomer(id).subscribe();
    this.router.navigate([`${this.navi}/${id}`]);
  }
  


  // isAllSelected() {
  //   console.log("isAllSelected")
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.datasource.data.length;
  //   return numSelected === numRows;
  // }
  

 

  // masterToggle() {
  //   console.log("masterToggle")
  //   this.isAllSelected() ?
  //       this.selection.clear() :
  //       this.datasource.data.forEach(row => this.selection.select(row));
  // }

  //  checkboxLabel(row?: Customer) : string{
  //   console.log("checkboxLabel")
  //    if( !row){
  //      return  `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  //    }
  //    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.CustomerId + 1}`;  
  //  }



  // getCustomers() : void{
  //   this.CustomerService.getCustomer().subscribe( cust=> {
  //     this.customers=cust;
  //   });
  // }
  
  // applyFilter(filterValue : string){
  //   this.datasource.filter = filterValue.trim().toLowerCase();
  // }
 


  // deleteCustomer(id : number) : void{
  //    var result = window.confirm("Do you want to delete?");
  //     if(result){
  //       this.CustomerService.deleteCustomer(id);
  //     }
  //     else{
  //       return null;
  //     }
  //   };

    
  }



