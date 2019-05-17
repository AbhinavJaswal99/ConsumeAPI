import { Component, OnInit } from '@angular/core';
import { hasLifecycleHook } from '@angular/compiler/src/lifecycle_reflector';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent  {
  //  public imagePath;
  //   public imgURL : any;
  //  public message : string
  myModel: any;
  values:number ;
  
 
  constructor() {
    this.myModel = '123';
   }

  ngOnInit() {
    
  }
  onBlurMethod(){
    if(this.myModel == 0){
      window.alert("cannt be negative");
      this.myModel = 1;
    }
    
   }

 



}
