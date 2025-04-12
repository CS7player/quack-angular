import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
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
export class HeaderComponent {
 private router = inject(Router)
 @Input() username : any = '';
 @Output() eventEmitter = new EventEmitter();
 isShownUserList: boolean = false;
 constructor(private readonly socket: SocketService) { }
 showUserList() {
  this.isShownUserList = !this.isShownUserList;
  this.eventEmitter.emit(this.isShownUserList);
 }

 logout() {
  DbmanagerService.clearLocal();
  this.socket.logOut({"sender_id":this.username['user_id']})
  this.router.navigate(['login']);
 }
}
