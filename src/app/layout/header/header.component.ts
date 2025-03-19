import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { DbmanagerService } from '../../utils/dbmanager.service';
import { Router } from '@angular/router';
@Component({
 selector: 'app-header',
 standalone: true,
 imports: [],
 templateUrl: './header.component.html',
 styleUrls: []
})
export class HeaderComponent {
 private router = inject(Router)
 @Input() username = '';
 @Output() eventEmitter = new EventEmitter();
 isShownUserList: boolean = false;
 showUserList() {
  this.isShownUserList = true
  this.eventEmitter.emit(this.isShownUserList);
 }

 logout() {
  DbmanagerService.clearLocal();
  this.router.navigate(['login']);
 }
}
