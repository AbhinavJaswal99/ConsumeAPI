import { Component, OnInit, ChangeDetectorRef,  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Orderdb } from '../Orderdb';
import { OrderdbservicesService } from '../orderdbservices.service';
import { FormControl } from '@angular/forms';
import { ItemServicesService } from '../item-services.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Item } from '../Item';
import { MatDialog, MatTableDataSource } from '@angular/material';
//import { DialogBoxAddItemsComponent } from '../dialog-box-add-items/dialog-box-add-items.component';
import { OrderItem } from '../OrderItem';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core'; 


@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {

  item : Item = new Item();
   
   orderdb : Orderdb;
   closeResult: string;
   ItemDatasource;
   selectedRowIndex: number = -1;
   disableSelect = new FormControl(false);


   OrderItemDisplayedColumns : string[] = ["ItemName","ItemQuantity","ItemPrice","ItemTotal", "Actions"];
  //  ItemDisplayedColumns : string[] = ["select",'Id','ItemName', 'ItemQuantity','ItemPrice','ItemDescription'];
   SelectedItemDataSource;
   public selectedOrderItem : OrderItem[] = [];
   public orderitem : OrderItem[] = [];
   totalQuantity : number = 0;
   totalPrice : number = 0;
  
  //  public selectedItem :  [];

  constructor(
    private route : ActivatedRoute,
    private orderdbservice : OrderdbservicesService,
    private itemService : ItemServicesService,
    private modalService: NgbModal,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    
  ) { }

  ngOnInit() {
  
    
    // this.getItems();
    
     this.getOrderdb();
  }

  getOrderdb() : void{
    const id  = +this.route.snapshot.paramMap.get('id');
    this.orderdbservice.ServiceGetOrder(id).subscribe(order => {
      this.orderdb = order;
      this.selectedOrderItem = this.orderdb.Orderitems;
       this.totalQuantity = this.orderdb.TotalQuantity;
       this.totalPrice = this.orderdb.TotalPrice;
       this.SelectedItemDataSource = new MatTableDataSource(this.selectedOrderItem);
       this.SelectedItemDataSource._updateChangeSubscription();

      });    
  }

  onBlurMethod(item : Item){
    if(item.ItemQuantity == 0){
      window.alert("cannot be negative");
      
      item.ItemQuantity = 1;
    }
    this.CountPrice();
  }

  Removeitem(orderitem : OrderItem):void{ 
    var result = window.confirm("Do you want to delete it?");
    if(result){
        // this.selectedOrderItem = this.SelectedItemDataSource;
       const selectedIndex = this.selectedOrderItem.findIndex(x => x.ItemId === orderitem.ItemId);
       this.selectedOrderItem.splice(selectedIndex, 1);
        this.SelectedItemDataSource._updateChangeSubscription();
        // this.SelectedItemDataSource = [...this.selectedOrderItem];
            this.CountPrice();     
     
      
    }
    else{
      return null;
    }
 } 

 openDialog() : void{
  const dialogRef = this.dialog.open(DialogBoxAddItemsComponent,{
    width : '600px',
     height : '600px',
    data : {selectedItem : this.selectedOrderItem }
  })
  dialogRef.afterClosed().subscribe(result => {
    console.log("This dialog was closed");
    this.CountPrice();
    this.SelectedItemDataSource._updateChangeSubscription();
    // this.selectedOrderItem = [...this.selectedOrderItem, ...result];
    // 
    // this.SelectedItemDataSource = [...this.SelectedItemDataSource, ...result];
    // this.selectedOrderItem = [this.SelectedItemDataSource,...this.SelectedItemDataSource];
   
     
  
  })
}
  
  




CountPrice(){
  this.totalPrice = 0;
    this.totalQuantity = 0;
  for(let item of this.SelectedItemDataSource){
  var intItem = +item.ItemQuantity;
  this.totalQuantity += intItem;
  this.totalPrice += item.ItemPrice * item.ItemQuantity;
  }
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

  
increase_quantity(item : Item){
  item.ItemQuantity ++; 
}

  UpdateOrder(id : number) : void{
    this.Assign();
    this.orderdbservice.ServiceUpdateOrderdb(id, this.orderdb).subscribe(x => console.log(x));
    window.alert("Updation Done !!!");
  }

  Assign():void{
    this.orderdb.Orderitems = this.selectedOrderItem;
      this.orderdb.TotalPrice = this.totalPrice;
      this.orderdb.TotalQuantity = this.totalQuantity;

  }


  getItems(): void{
    this.itemService.ServiceItems().subscribe(x => this.ItemDatasource = x);
 }
}



export interface DialogData {
  selectedItem: OrderItem[];
}



@Component({
  selector: 'app-dialog-box-add-items',
  templateUrl: './dialog-box-add-items.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class DialogBoxAddItemsComponent implements OnInit {

  selectedRowIndex: number = -1;
  ItemDataSource;
  ItemDisplayedColumns : string[] = ["select",'Id','ItemName', 'ItemQuantity','ItemPrice','ItemDescription'];
  public selectedOrderItem : OrderItem[] = [];
  SelectedItemDataSource ;

  constructor(
    private itemService : ItemServicesService,
     public dialogRef : MatDialogRef<DialogBoxAddItemsComponent>,
     @Inject(MAT_DIALOG_DATA) public data:DialogData
  ) { }

  
  ngOnInit() {
    this.getItems();
     this.SelectedItemDataSource = new MatTableDataSource(this.selectedOrderItem);
  }

  getItems() : void{
   this.itemService.ServiceItems().subscribe(x => this.ItemDataSource = x)
  }

onCheckChange(item:Item):any{
  let orderitem = new OrderItem();
  orderitem.Id = 0;
  orderitem.ItemId = item.Id;
  orderitem.ItemName = item.ItemName;
  orderitem.ItemPrice = item.ItemPrice;
  orderitem.ItemQuantity = 1;
  orderitem.ItemTotal = orderitem.ItemPrice * orderitem.ItemQuantity;
  this.data.selectedItem.push(orderitem);
  console.log(orderitem);
  event.stopPropagation();
}

}