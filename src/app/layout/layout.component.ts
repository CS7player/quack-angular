import { Component, OnInit } from '@angular/core';
import { DbmanagerService } from '../utils/dbmanager.service';
import { ConstantsService } from '../utils/constants.service';
import { Router } from '@angular/router';
import { ApimanagerService } from '../utils/apimanager.service';
import { HeaderComponent } from "./header/header.component";
import { UsersListComponent } from "./users-list/users-list.component";
import { SocketService } from '../utils/socket.service';
import { ChatBoxComponent } from "./chat-box/chat-box.component";
import { slideLeftInOut } from '../utils/animation';
import { OutsideClickService } from '../utils/outsideclick.service';
@Component({
 selector: 'app-layout',
 standalone: true,
 imports: [HeaderComponent, UsersListComponent, ChatBoxComponent],
 templateUrl: './layout.component.html',
 animations: [slideLeftInOut],
})
export class LayoutComponent implements OnInit {

 username: string = 'username';
 users_list: any = [];
 isShownUserList: boolean = false;
 receiver_id: string = '';
 isRefresh = 0;
 user_id: any = DbmanagerService.getItem(ConstantsService.USER_ID_KEY);
 constructor(private readonly router: Router, private readonly apiManager: ApimanagerService, private readonly socket: SocketService, private readonly osc: OutsideClickService) { }
 ngOnInit() {
  this.get_user_id();
  this.get_users();
  this.osc.clickOutsideEmitter.subscribe((res) => {
   this.isShownUserList = false;
  })
 }
 get_user_id() {
  let url = DbmanagerService.getItem(ConstantsService.URL_KEY);
  if (this.user_id && url) {
   ConstantsService.URl = url;
   this.user_id = this.user_id;
   this.socket.joinHub({});
  }
  else {
   this.router.navigate(['login']);
  }
 }
 get_users() {
  this.socket.user_list.subscribe(data => {
   this.get_username(data);
   this.users_list = data.filter((m: any) => m.user_id != this.user_id);
  })
 }

 get_username(data : any) {
  let user = data.find((user: any) => user['user_id'] == this.user_id);
  if (user) {
   this.username = user;
  }
 }
 //testing for mergeing chandra51201


}
