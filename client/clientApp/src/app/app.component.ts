import { Component } from '@angular/core';
import { WebsocketService } from '../websocket/services/websocket.service';
import { IMessage } from '../models/message.interface';
import { WebsocketEvents } from '../models/websocket-events';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'clientApp';
  public messages$: Observable<IMessage[]>;
  public updateMessages$: Observable<IMessage[]>;
  constructor(private ws: WebsocketService) {
    this.messages$ = this.ws.on<IMessage[]>(WebsocketEvents.ON.MESSAGES);
    this.updateMessages$ = this.ws.on<IMessage[]>(
      WebsocketEvents.ON.UPDATE_TEXTS
    );
  }

  public sendText(): void {
    this.ws.send(WebsocketEvents.SEND.SEND_TEXT, 'Hello');
  }
}
