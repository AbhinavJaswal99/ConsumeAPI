import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ItemServicesService } from '../item-services.service';
import { Item } from '../Item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  item : Item = new Item();

  constructor(
    private loacation : Location,
    private itemService : ItemServicesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  Goback() : void{
    this.loacation.back();
  }

  SaveItem(): void{
    this.itemService.ServiceSaveItem(this.item).subscribe(z => console.log(z));
    window.alert("Item is saved!!! Congratulations");
    this.router.navigate(['/item']);
  }


  

}
