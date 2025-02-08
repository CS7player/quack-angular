import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  constructor() { }
  // static URl  : string = 'http://192.168.0.51:4444/';
  static URl  : string = '';
  static readonly URL_KEY :string = 'url_key';
  static readonly USER_ID_KEY:string = 'user_id_key'; // user Ip_address
  static setUrl(ip : string){
   ConstantsService.URl = `http://${ip}:4444/`;
  }
  static readonly IPV4 = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  static readonly IPV6 = /([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}/;
  
}
