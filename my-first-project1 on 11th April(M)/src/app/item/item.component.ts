import { Component, OnInit } from '@angular/core';
import { Item } from '../Item';
import { ItemServicesService } from '../item-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  items : Item[];

  constructor(private itemService : ItemServicesService,
    private router: Router 

  ) {
    
   }
   displayedColumns : string[] = ['Id','ItemName','ItemQuantity','ItemPrice','ItemDescription','Actions'];

   datasource;


  ngOnInit() {
    this.getItems();
  }


   getItems() : void{
     this.itemService.ServiceItems().subscribe(ite => this.datasource = ite);
   }
   navi = '/update-item';
   Navigation(id : number) : void{
     this.itemService.ServiceGetItem(id).subscribe();
     this.router.navigate([`${this.navi}/${id}`]);
   }

   deleteItem(id : number): void{
    var result = window.confirm("Do you want to delete ? ");
    if(result){
      this.itemService.ServiceDeleteItem(id).subscribe(x => console.log(x));
      window.alert("Delete it !!!");
      location.reload();
    }
    else{
      return null;
    }
   }
}
