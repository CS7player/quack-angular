import { Injectable } from '@angular/core';

@Injectable({
 providedIn: 'root'
})
export class ConstantsService {
 constructor() { }
 static URl: string = '';
 static readonly URL_KEY: string = 'url_key';
 static readonly USER_ID_KEY: string = 'user_id_key'; // user Ip_address
 static setUrl(ip: string) {
  ConstantsService.URl = `http://${ip}:4444/`;
 }
 static readonly IPV4 = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
 static readonly IPV6 = /([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}/;
 static readonly IMG_PATH = 'public'

 static readonly IMAGES_PATH = "images/";
 static readonly SEND_ICON = ConstantsService.IMAGES_PATH + "send.svg";
 static readonly PC_WALL = ConstantsService.IMAGES_PATH + "pc.jpg";
 static readonly MOBILE_WALL = ConstantsService.IMAGES_PATH + "mobile.jpg";
 static readonly WALL01 = ConstantsService.IMAGES_PATH + "wall01.gif";
 static readonly WALL02 = ConstantsService.IMAGES_PATH + "wall02.gif";
}
