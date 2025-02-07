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
 constructor() { }
 socketConnect(callback: any) {
  if (!this.socket || !this.socket?.connected) {
   this.socket = io(ConstantsService.URl);

   this.socket.on('connected', async (data) => {
    console.log('Socket connected:', data);
    if (data['status']) {
     DbmanagerService.setItem(ConstantsService.URL_KEY, ConstantsService.URl);
     callback();
    }
   });
  }
 }
}
