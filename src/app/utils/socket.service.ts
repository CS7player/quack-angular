import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { ConstantsService } from './constants.service';
import { BehaviorSubject } from 'rxjs';
import { DbmanagerService } from './dbmanager.service';
@Injectable({
 providedIn: 'root'
})
export class SocketService {
 private socket: Socket | null = null;
 private isConnected: boolean = false;
 constructor() { }

 socketConnect(callback: any) {
  if (!this.socket || !this.socket?.connected) {
   this.socket = io(ConstantsService.URl,{ transports: ['websocket'],reconnection: false});

   this.socket.on('connected', async (data) => {
    if (data['status']) {
     DbmanagerService.setItem(ConstantsService.URL_KEY, ConstantsService.URl);
     this.isConnected = true;
     callback();
    }
   });

   this.socket.on('connect_error', (error) => {
    callback();
    alert('Failed to connect to the server. Please check the IP address and try again.');
    this.handleConnectionError();
   });


   this.socket.on('test',(res)=>{

   })
  }
 }

 private handleConnectionError() {
  this.isConnected = false;
  if (this.socket) {
    this.socket.disconnect();
  }
}

 sendNotification(){
  
 }

}
