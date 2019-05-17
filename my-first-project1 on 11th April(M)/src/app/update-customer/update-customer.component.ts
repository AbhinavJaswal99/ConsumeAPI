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
  public imagePath;
  imageURL : any;
  public message : string;
    

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
     this.CustomerService.getCustomer(id).subscribe(cust => {
       this.customer = cust;
      var imageValue = "data:image/jpeg;base64,";
       if(this.customer.ImagePath){
         this.customer.ImagePath = imageValue +  this.customer.ImagePath;
       }  
     });
    }
     

     
  GoBack() : void{
    this.location.back();
  }

  previewImage(files){
    if(files.length === 0)
    return;
    var UploadImage = files[0].type;

    if(UploadImage.match(/image\/*/) == null){
      this.message = "Only match are supported";
      return;
    }

    var ImageReader = new FileReader();
    this.imagePath = files;

    ImageReader.readAsDataURL(files[0]);
    ImageReader.onload = (_event) => {
      var imageValue = "data:image/jpeg;base64,";
      this.customer.ImagePath = ImageReader.result as string;
    
      
    }
     
  
    }

    updateCustomer(id : number){
      this.customer.ImagePath = this.customer.ImagePath.substring(23);
      this.CustomerService.updateCust(id, this.customer).subscribe(x => console.log(x));
      window.alert("Update Done !!!");
     
      this.router.navigate(['/customer']);
     
     
    }
 

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





