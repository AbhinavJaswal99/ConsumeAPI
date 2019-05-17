import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemServicesService } from '../item-services.service';
import { Item } from '../Item';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent implements OnInit {

  items : Item;

  constructor(
    private route :ActivatedRoute,
    private itemService : ItemServicesService,
    private location : Location
  ) { }

  ngOnInit() {
    this.getItem();
  }

  getItem() : void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.itemService.ServiceGetItem(id).subscribe(x => this.items = x);
  }

  GoBack() : void{
   this.location.back();
  }

  UpdatedData(id : number) {
    this.itemService.ServiceUpdatedItem(id, this.items).subscribe(x => console.log(x));
    window.alert("Data is updated");
    this.location.back();
  }

}
