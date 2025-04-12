import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DbmanagerService } from '../../utils/dbmanager.service';
import { Router } from '@angular/router';
import { SocketService } from '../../utils/socket.service';
@Component({
 selector: 'app-header',
 standalone: true,
 imports: [],
 templateUrl: './header.component.html',
 styleUrls: []
})
export class HeaderComponent implements OnChanges {

 private router = inject(Router)
 @Input() username: any = '';
 @Input() isRefresh = 0;
 @Output() eventEmitter = new EventEmitter();
 isShownUserList: boolean = false;
 selected_username: string = '-';
 constructor(private readonly socket: SocketService) { }

 ngOnChanges(changes: SimpleChanges) {
  if (changes["isRefresh"]) {
   let selected_user = DbmanagerService.getItem("selected_username");
   if (selected_user) {
    this.selected_username = selected_user;
   }
  }
 }

 showUserList() {
  this.isShownUserList = !this.isShownUserList;
  this.eventEmitter.emit(this.isShownUserList);
 }

 logout() {
  DbmanagerService.clearLocal();
  this.socket.logOut({ "sender_id": this.username['user_id'] })
  this.router.navigate(['login']);
 }
}
