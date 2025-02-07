import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SocketService } from '../../utils/socket.service';
import { ApimanagerService } from '../../utils/apimanager.service';
import { ConstantsService } from '../../utils/constants.service';
import { DbmanagerService } from '../../utils/dbmanager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-username',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './username.component.html'
})
export class UsernameComponent implements OnInit{
 username:string = '';
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
}
