import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApimanagerService } from '../../utils/apimanager.service';
import { ConstantsService } from '../../utils/constants.service';
import { DbmanagerService } from '../../utils/dbmanager.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-username',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './username.component.html'
})
export class UsernameComponent implements OnInit{
 username:string = '';
 is_Valid = '';
 constructor(private readonly apiManager : ApimanagerService,private readonly router : Router){}
 ngOnInit() {
  
 }
 setUsername(){
  let url = ConstantsService.URl+'username/';
  this.apiManager.doPost(url,{"username":this.username}).subscribe({
   next: (res: any) => {
    if (res['status']) {
     DbmanagerService.setItem(ConstantsService.USER_ID_KEY,res['user_id']);
     this.router.navigate(['layout']);
    }
   }, error: (err) => {
    console.log(err)
   }
  })
 }
 is_valid_username(){
  if(this.username.length < 4 || this.username.length > 8){
   alert('the Username must be between the 4 to 8 letter only.')
  }
  else{
   this.setUsername();
  }
 }
 is_valid(){
  if(this.username.length == 0){
   this.is_Valid = ''
  }else if(this.username.length < 4 || this.username.length > 8){
   this.is_Valid = 'is_not_valid';
  }else{
   this.is_Valid = 'is_valid';
  }
 }
}
