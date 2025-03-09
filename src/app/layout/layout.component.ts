import { Component, OnInit } from '@angular/core';
import { DbmanagerService } from '../utils/dbmanager.service';
import { ConstantsService } from '../utils/constants.service';
import { Router } from '@angular/router';
import { ApimanagerService } from '../utils/apimanager.service';
import { HeaderComponent } from "./header/header.component";
import { UsersListComponent } from "./users-list/users-list.component";
import { SocketService } from '../utils/socket.service';
import { ChatBoxComponent } from "./chat-box/chat-box.component";
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, UsersListComponent, ChatBoxComponent],
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit{

 user_id:string = '';
 username:string = 'chandra';
 users_list : any = [];
 constructor(private readonly router : Router,private readonly apiManager : ApimanagerService,private readonly socket: SocketService){}
 ngOnInit() {
  this.get_user_id();
  this.get_users();
 }
 get_user_id(){
  let user_id = DbmanagerService.getItem(ConstantsService.USER_ID_KEY);
  let url = DbmanagerService.getItem(ConstantsService.URL_KEY);
  if(user_id && url){
   ConstantsService.URl = url;
   this.user_id = user_id;
   this.socket.joinHub({});
  }
  else{
   this.router.navigate(['login']);
  }
 }
 get_users(){
  this.socket.user_list.subscribe( data => {
   this.users_list = data;
   this.get_username();
  })
 }

 get_username(){
  let user = this.users_list.find((user : any) => user['user_id'] == this.user_id );
  if(user){
   this.username = user['user_name'];
  }
 }
 //testing for mergeing chandra51201
}
