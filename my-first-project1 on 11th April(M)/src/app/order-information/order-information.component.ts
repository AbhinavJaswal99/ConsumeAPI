import { Component, OnInit } from '@angular/core';
import { OrderdbservicesService } from '../orderdbservices.service';
import { __assign } from 'tslib';
import { Orderdb } from '../Orderdb';

import { Router } from '@angular/router';
import { OrderItem } from '../OrderItem';

@Component({
  selector: 'app-order-information',
  templateUrl: './order-information.component.html',
  styleUrls: ['./order-information.component.css']
})
export class OrderInformationComponent implements OnInit {
  

  constructor(
    private Orderdbservices : OrderdbservicesService,
    private router : Router
  ) {
   
   }
   
   orderitem1 : OrderItem[];
   orderdb : Orderdb[] ;
  // orderdb : Orderdb;
 
  
  datasource; 

  ngOnInit() {
     this.getOrderItemInf();
  }
  displayedColumns: string[] = ['OrderId','CustomerName','OrderDate', 'TotalQuantity' ,'TotalPrice','Actions'];


  // ,'CustomerName'
  getOrderItemInf() : void{
    this.Orderdbservices.ServiceGetOrderdb().subscribe((response) => {
      this.orderdb = response ;
      this.Assign();
    })
  }
  
  Assign() : void{
    this.datasource = this.orderdb.map(item => {
      return {
        orderId : item.Id,
        customername : item.CustomerName,
        // customername : item.Customer.CustomerName,
        totalquantity : item.TotalQuantity,
        orderdate : item.OrderDate,
        totalPrice : item.TotalPrice,
      
      }
      
    });

  }

  AddOrder(){
    this.router.navigate(['/add-order']);
  }

  navi = '/edit-order';
  
  Navigation(id : number){
    this.Orderdbservices.ServiceGetOrder(id).subscribe();
    this.router.navigate([`${this.navi}/${id}`]);

  }


 
}
