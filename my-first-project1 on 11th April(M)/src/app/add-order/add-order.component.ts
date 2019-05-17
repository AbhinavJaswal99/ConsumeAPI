import { Component, OnInit ,ChangeDetectorRef, inject, Inject } from '@angular/core';
import { Customer } from '../Customer';
import { CustomerService } from '../customer.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Item } from '../Item';
import { ItemServicesService } from '../item-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Orderdb } from '../Orderdb';
import { OrderItem } from '../OrderItem';
import { OrderdbservicesService } from '../orderdbservices.service';
import {SelectionModel} from '@angular/cdk/collections';
import { DialogData } from '../edit-order/edit-order.component';



@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent  implements OnInit  {
  searchValue : number;

  item : Item = new Item();
  
  closeResult: string;
  public customers : Customer[];
 
 
  public selectedOrderItem : OrderItem[] = [];

  public selectedItem : OrderItem[] = [];
 
 
  selectedRowIndex: number = -1;
  

   selectedDataSource;
   totalQuantity : number = 0;
   totalPrice : number = 0;
   cust : Customer;
   textValue: string = '';
   dataSource;
  
   totalIndividPrice : number = 0;
   runningValue : number = 0;
  orderitem : OrderItem = new OrderItem();
  selectedCustomerValue: number;
   orderdb : Orderdb = new Orderdb();
   ChangeValueInDropDown;
   totalValue : any;
   ItemQuantityvalues = '';
   OrderItemDisplayedColumns : string[] = ["ItemName","ItemQuantity","ItemPrice","ItemTotal",'Actions'];
  ItemDisplayedColumns : string[] = ["select",'Id','ItemName', 'ItemQuantity','ItemPrice','ItemDescription'];
  today = new Date();

 
   
  constructor(private customerService : CustomerService,
    private modalService: NgbModal,
    private itemService : ItemServicesService,
    private orderdbservice : OrderdbservicesService,
    private router: Router,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef
     ) { }

  ngOnInit() {
    this.getItems();
    this.getCustName();
    this.selectedDataSource = new MatTableDataSource(this.selectedOrderItem);
  
  }
  

  onBlurMethod(item : Item){
    if(item.ItemQuantity == 0){
      window.alert("cannot be negative");
      item.ItemQuantity = 1;
    }
    this.CountPrice();
  }

  
CountPrice(){
  this.totalPrice = 0;
    this.totalQuantity = 0;
  for(let item of this.selectedOrderItem){
   var intItem = +item.ItemQuantity;
   this.totalQuantity += intItem;
  this.totalPrice += item.ItemPrice * item.ItemQuantity;
  }
}
   
  Removeitem(orderitem : OrderItem):void{ 
     var result = window.confirm("Do you want to delete it?");
     if(result){
          
          const selectedIndex =  this.selectedOrderItem.findIndex(x => x.ItemId === orderitem.ItemId);
          this.selectedOrderItem.splice(selectedIndex, 1);
          this.selectedDataSource._updateChangeSubscription();
          this.CountPrice();
     }
     else{
       return null;
     }
  } 
  // dateModel: any = {start_time: new Date() };


  onSubmitOrder() : void{
    this.Assign();
    this.orderdbservice.ServiceSaveOrderdb(this.orderdb).subscribe(x => console.log(x));
    window.alert("Well done !!!");
    this.router.navigate[('/order-information')];
  }

  Assign(){
    this.orderdb.TotalQuantity = this.totalQuantity;
    this.orderdb.OrderDate = this.today;
    // this.orderdb.OrderDate = this.dateModel;
     this.orderdb.TotalPrice = this.totalPrice;
     this.orderdb.CustomerId = this.selectedCustomerValue;
     this.orderdb.Orderitems = this.selectedOrderItem;
  }

  getItems(): void{
     this.itemService.ServiceItems().subscribe(x => this.dataSource = x);
  }

  getCustName(): void{
     this.customerService.getCustomers().subscribe(x => this.customers = x);
  }

  openDialog() : void{
     const dialogRef = this.dialog.open(AddOrderDialogBoxComponent,{
       width : '600px',
       height :'600px',
       data : {selectedItem : this.selectedOrderItem}
     })
     dialogRef.afterClosed().subscribe(result => {
         console.log("This dialog is closed");
         this.CountPrice();
         this.selectedDataSource._updateChangeSubscription();


        //  this.selectedDataSource = [...result];
        // this.selectedDataSource = [result,...this.selectedOrderItem];    // this line was working during destructuring.

        // this.selectedDataSource = this.selectedOrderItem ;
        //  this.orderdb.Orderitems = [...this.selectedOrderItem,...this.orderdb.Orderitems];
        //  this.selectedDataSource = this.orderdb.Orderitems;
         
     })
  }

increase_quantity(item : Item){
    item.ItemQuantity ++; 
}

decrease_quantity(item : Item){
  if(item.ItemQuantity >= 1){
    item.ItemQuantity --;
    if(item.ItemQuantity ==0){
      window.alert("Item Quantity cannot be zero");
      item.ItemQuantity = 1;
    }
  }
}


}

export interface DialogData {
  selectedItem: OrderItem[];
}



@Component({
  selector: 'app-add-order-dialog-box',
  templateUrl: './add-order-dialog-box.component.html',
  styleUrls: ['./add-order.component.css']
})

export class AddOrderDialogBoxComponent implements OnInit {
  // selectedRowIndex: number = -1;
  ItemDisplayedColumns : string[] = ["select",'Id','ItemName', 'ItemQuantity','ItemPrice','ItemDescription'];
  dataSource;
  selection;

  constructor(
 
    private itemService : ItemServicesService,
     public dialogRef : MatDialogRef<AddOrderDialogBoxComponent>,
     @Inject(MAT_DIALOG_DATA) public data:DialogData

  ){
   
  }

 
  ngOnInit(){
    this.getItems();
    this.selection = new SelectionModel<Item>(true, []);
  }

  getItems(): void{
    this.itemService.ServiceItems().subscribe(x => this.dataSource = x);
 }

//  checkboxLabel(item? : Item): string {
//   return    `${this.selection.isSelected(item) ? 'deselect' : 'select'} row ${item.Id + 1}`; 
// }
onCheckChange(item:Item):any{
  let orderitem = new OrderItem();
  orderitem.Id = 0;
  orderitem.ItemId = item.Id;
  orderitem.ItemName = item.ItemName;
  orderitem.ItemPrice = item.ItemPrice;
  orderitem.ItemQuantity = 1;
  orderitem.ItemTotal = orderitem.ItemPrice * orderitem.ItemQuantity;
  this.data.selectedItem.push(orderitem);
  console.log(this.data.selectedItem);
  event.stopPropagation();
}
}
