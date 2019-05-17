import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CustomerService } from '../customer.service';
import { Customer } from '../Customer';
import { Router } from '@angular/router';
import { ReadVarExpr } from '@angular/compiler';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  public imagePath;
  imageURL : any;
  public message : string;
  customer : Customer = new Customer();
  
  constructor(
     private loacation : Location,
     private CustomerService : CustomerService,
     private router: Router
  ) { 
    
  }

  ngOnInit() {
    
  }


  previewImage(files){
    if(files.length === 0)
    return;
    var UploadImage = files[0].type;
   
    if( UploadImage.match(/image\/*/) == null){
      this.message= "Only match are supported";
      return;
    }

    var ImageReader = new FileReader();
    this.imagePath = files;
  
    ImageReader.readAsDataURL(files[0]);
    ImageReader.onload = (_event) => {
      this.imageURL = ImageReader.result;
      
      console.log(this.imageURL);
    }
     this.customer.ImagePath = ImageReader.result as string;
     this.customer.ImagePath =    this.customer.ImagePath.substring(23);
  }
 
  GoBack() : void{
    this.loacation.back();
  }

  onSubmit(){
    this.CustomerService.saveCustomers(this.customer).subscribe(x => console.log(x));
    window.alert("Well Done !!!");
    this.router.navigate(['/customer']);
  }


}
