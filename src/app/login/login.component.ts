import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SocketService } from '../utils/socket.service';
import { ConstantsService } from '../utils/constants.service';
import { UsernameComponent } from './username/username.component';
import { DbmanagerService } from '../utils/dbmanager.service';
@Component({
 selector: 'app-login',
 standalone: true,
 imports: [FormsModule, UsernameComponent],
 templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
 ip_address: string = '';
 is_url_created: boolean = false;
 is_valid: boolean = true;
 is_loader: boolean = false;
 constructor(private readonly socket: SocketService) { }
 ngOnInit() {
  this.checkURL();
  DbmanagerService.setItem('is_refresh', 0 + "");
 }
 checkURL() {
  this.is_loader = false;
  let url = DbmanagerService.getItem(ConstantsService.URL_KEY);
  console.log(url)
  if (url) {
   this.is_url_created = true;
   ConstantsService.URl = url;
  }
 }
 
 createConnection() {
  this.is_loader = true;
  ConstantsService.setUrl(this.ip_address);
  this.socket.socketConnect(() => this.checkURL());
 }

 validateIP() {
  if (
   ConstantsService.IPV4.test(this.ip_address) ||
   ConstantsService.IPV6.test(this.ip_address)
  ) {
   this.is_valid = false;
  } else {
   this.is_valid = true;
  }
 }
}
