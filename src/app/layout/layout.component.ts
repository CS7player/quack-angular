import { Component, OnInit } from '@angular/core';
import { DbmanagerService } from '../utils/dbmanager.service';
import { ConstantsService } from '../utils/constants.service';
import { Router } from '@angular/router';
import { ApimanagerService } from '../utils/apimanager.service';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [],
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit{

 user_id:string = '';
 constructor(private readonly router : Router,private readonly apiManager : ApimanagerService){}
 ngOnInit() {
  this.get_user_id();
 }
 get_user_id(){
  let user_id = DbmanagerService.getItem(ConstantsService.USER_ID_KEY);
  if(user_id){
   this.user_id = user_id;
   this.get_users();
  }
  else{
   this.router.navigate(['login']);
  }
 }
 get_users(){
  let url = ConstantsService.URl+'message/all_users/'
  this.apiManager.doGet(url).subscribe({
   next: (res: any) => {
    if (res['status']) {
     console.log(res['data']);
    }
   }, error: (err) => {
    console.log(err)
   }
  })
 }

}
