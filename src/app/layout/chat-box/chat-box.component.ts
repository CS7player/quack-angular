import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ConstantsService } from '../../utils/constants.service';
import { DbmanagerService } from '../../utils/dbmanager.service';
import { SocketService } from '../../utils/socket.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
 selector: 'app-chat-box',
 standalone: true,
 imports: [FormsModule, CommonModule],
 templateUrl: './chat-box.component.html',
 styleUrls: [],

})
export class ChatBoxComponent implements OnInit {

 @Input() isRefresh = 0;
 receiver_id = DbmanagerService.getItem("selected_user_id");
 chat_data: any = [];
 sender_id = DbmanagerService.getItem("user_id_key");
 send_icon: string = ConstantsService.SEND_ICON;
 subscription: any = "";
 msg: String = "";
 constructor(private readonly socket: SocketService) { }
 ngOnInit(): void {
  this.getChatHistory();
  this.getupdate();
 }
 ngOnChanges(changes: SimpleChanges) {
  if (changes["isRefresh"]) {
   this.receiver_id = DbmanagerService.getItem("selected_user_id");
   const obj = { "receiver_id": this.receiver_id, "sender_id": this.sender_id }
   this.socket.getChatHistory(obj);
   DbmanagerService.setItem("is_refresh", this.isRefresh + "");
   if (this.subscription) {
    this.getChatHistory();
   }
  }
 }

 getChatHistory() {
  this.subscription = this.socket.getChatHistoryData().subscribe((res: any) => {
   this.dataModifier(res['data'] || []);
  })
 }

 dataModifier(data: any) {
  this.chat_data = data.sort((a: any, b: any) => a.time - b.time);
  this.chat_data.map((m:any)=>{
   m['display_time'] = this.convertSecondsToTime(m['time']);
  })
 }

 sendMsg() {
  const data = {
   "sender_id": this.sender_id,
   "receiver_id": this.receiver_id,
   "msg": this.msg,
   "time": this.getTime(),
   "display_time": this.convertSecondsToTime(this.getTime())
  };
  this.socket.sendMsg(data);
  this.chat_data.push(data);
  this.msg = "";
 }

 getTime(): number {
  const date = new Date();
  return (date.getHours() * 60 * 60) + (date.getMinutes() * 60) + date.getSeconds();
 }

 getupdate(){
  this.socket.received_msg.subscribe((res: any) => {
   console.log(res)
   if (res['status']) {
    this.chat_data.push(res['data']);
   }
  })
 }

 convertSecondsToTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  return `${formattedHours}:${formattedMinutes}`;
}

}
