import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SocketService } from '../utils/socket.service';
import { ApimanagerService } from '../utils/apimanager.service';
import { ConstantsService } from '../utils/constants.service';
import { UsernameComponent } from "./username/username.component";
import { DbmanagerService } from '../utils/dbmanager.service';
@Component({
 selector: 'app-login',
 standalone: true,
 imports: [FormsModule, UsernameComponent],
 templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

 ip_address: string = '';
 is_url_created: boolean = false;
 constructor(private socket: SocketService, private apiManager: ApimanagerService) { }
 ngOnInit() {
  this.checkURL();
 }
 checkURL() {
  let url = DbmanagerService.getItem(ConstantsService.URL_KEY);
  if (url) {
   this.is_url_created = true;
  }
 }
 async createConnection() {
  ConstantsService.setUrl(this.ip_address);
  await this.socket.socketConnect(() => this.checkURL());
 }
}
