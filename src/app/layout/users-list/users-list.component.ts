import { Component, EventEmitter, Input, OnInit, output, Output } from '@angular/core';
import { DbmanagerService } from '../../utils/dbmanager.service';
import { CommonModule } from '@angular/common';
import { SocketService } from '../../utils/socket.service';
@Component({
 selector: 'app-users-list',
 standalone: true,
 imports: [CommonModule],
 templateUrl: './users-list.component.html'
})
export class UsersListComponent implements OnInit {

 @Input() users_list = [];
 @Output() eventEmitter = new EventEmitter();
 @Output() closeEmitter = new EventEmitter();
 selected_user:any = "";
 constructor(private readonly socket: SocketService) { }
 ngOnInit(): void {
  let user_id = DbmanagerService.getItem("user_id_key");
  this.selected_user = DbmanagerService.getItem("selected_user_id");
  this.users_list = this.users_list.filter((m: any) => m.user_id != user_id);
  this.socket.getReceivedMsg().subscribe((res : any)=>{
   if(res['status']){
    this.users_list.map((m:any)=>{
     if(m['user_id'] == res['data']['sender_id']){
      m['user_name'] = m['user_name'] + "  *";
     }
    })
   }
  })
 }

 selectUser(item: any) {
  DbmanagerService.setItem('selected_user_id',item['user_id']);
  let isRefresh = DbmanagerService.getItem("is_refresh");
  if(isRefresh){
   this.eventEmitter.emit(isRefresh+1);
  }
  this.closeEmitter.emit(false);
 }

}
