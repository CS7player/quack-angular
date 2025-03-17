import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

 @Input() username = '';
 @Output() eventEmitter = new EventEmitter();
 isShownUserList: boolean = false;
 showUserList(){
  this.isShownUserList = !this.isShownUserList
  this.eventEmitter.emit(this.isShownUserList);
 }
}
