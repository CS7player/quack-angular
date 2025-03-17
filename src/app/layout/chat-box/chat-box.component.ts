import { Component } from '@angular/core';
import { ConstantsService } from '../../utils/constants.service';

@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [],
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.css',

})
export class ChatBoxComponent {

 send_icon : string = ConstantsService.SEND_ICON;
}
