import { Component, OnDestroy } from '@angular/core';
import { WebsocketService } from '../websocket/services/websocket.service';
import { IMessage } from '../models/message.interface';
import { WebsocketEvents } from '../models/websocket-events';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'clientApp';
  public messages$: Observable<IMessage[]>;
  public updateMessages$: Observable<IMessage[]>;
  private destroySubscription$: Subject<boolean> = new Subject<boolean>();
  constructor(private ws: WebsocketService) {
    this.messages$ = this.ws
      .on<IMessage[]>(WebsocketEvents.ON.MESSAGES)
      .pipe(takeUntil(this.destroySubscription$));

    this.updateMessages$ = this.ws
      .on<IMessage[]>(WebsocketEvents.ON.UPDATE_TEXTS)
      .pipe(takeUntil(this.destroySubscription$));
  }

  public sendText(): void {
    this.ws.send(WebsocketEvents.SEND.SEND_TEXT, 'Hello');
  }

  ngOnDestroy(): void {
    this.destroySubscription$.next(false);
    this.destroySubscription$.complete();
  }
}
