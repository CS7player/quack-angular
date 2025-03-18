import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { ConstantsService } from './constants.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { DbmanagerService } from './dbmanager.service';
@Injectable({
 providedIn: 'root',
})
export class SocketService {
 private socket: Socket | null = null;
 private user_list_data = new BehaviorSubject<any>([]);
 private chat_history_data = new Subject();
 private received_msg  = new Subject();
 user_list = this.user_list_data.asObservable();
 constructor() {
  this.reconnetion();
 }

 socketConnect(callback: any) {
  if (!this.socket || !this.socket?.connected) {
   this.socket = io(ConstantsService.URl, {
    transports: ['websocket'],
    reconnection: false,
   });

   this.socket.on('connected', async (data) => {
    if (data['status']) {
     DbmanagerService.setItem(
      ConstantsService.URL_KEY,
      ConstantsService.URl
     );
     callback();
    }
   });

   this.socket.on("get_msg", async (data) => {
    this.chat_history_data.next(data)
   })

   this.socket.on("all_msg", async (data) => {
    this.chat_history_data.next(data)
   })
   
   this.socket.on("receive_msg", async (data) => {
    this.chat_history_data.next(data)
   })

   this.socket.on('connect_error', (error) => {
    callback();
    alert(
     'Failed to connect to the server. Please check the IP address and try again.'
    );
    this.handleConnectionError();
   });

   this.socket.on('get_user_list', (res) => {
    if (res['status']) {
     this.upDateUserList(res['data']);
    }
   });
  }
 }

 private handleConnectionError() {
  if (this.socket) {
   this.socket.disconnect();
  }
 }

 private reconnetion() {
  let url = DbmanagerService.getItem(ConstantsService.URL_KEY);
  if (url) {
   ConstantsService.URl = url;
   this.socketConnect(() => { });
  }
 }

 joinHub(userData: any) {
  if (this.socket) {
   this.socket.emit('join_hub', userData);
  } else {
   console.error('Socket not connected. Please connect first.');
  }
 }
 
 getChatHistory(obj: any) {
  if (this.socket) {
   this.socket.emit('get_msg', obj);
  } else {
   console.error('Socket not connected. Please connect first.');
  }
 }

 sendMsg(obj: any) {
  if (this.socket) {
   this.socket.emit('send_msg', obj);
  } else {
   console.error('Socket not connected. Please connect first.');
  }
 }

 upDateUserList(data: any) {
  this.user_list_data.next(data);
 }

 getChatHistoryData() {
  return this.chat_history_data.asObservable();
 }

 getReceivedMsg(){
  return this.received_msg.asObservable();
 }
}
