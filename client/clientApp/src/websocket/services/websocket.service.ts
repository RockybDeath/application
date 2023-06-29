import { Injectable, OnDestroy, Inject } from '@angular/core';
import {
  Observable,
  SubscriptionLike,
  Subject,
  Observer,
  interval,
  of,
} from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { WebSocketSubject, WebSocketSubjectConfig } from 'rxjs/webSocket';

import { share, distinctUntilChanged, takeWhile } from 'rxjs/operators';

import { IWebsocketService } from '../models/websocket-service.interface';
import { IWsMessage } from '../models/websocket-message.interface';
import { WebSocketConfig } from '../models/websocket-config';
import { Config } from '../config/websocket-config';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService implements IWebsocketService, OnDestroy {
  private config?: WebSocketSubjectConfig<IWsMessage<any>>;

  private websocketSub: SubscriptionLike;
  private statusSub: SubscriptionLike;
  private reconnectSub?: SubscriptionLike;

  private reconnection$?: Observable<number>;
  private websocket$?: WebSocketSubject<IWsMessage<any>>;

  private connection$?: Observer<boolean>;
  private wsMessages$: Subject<IWsMessage<any>>;

  private reconnectInterval?: number;
  private reconnectAttempts?: number;
  private isConnected?: boolean;

  public status: Observable<boolean>;

  constructor(@Inject(Config) private wsConfig: WebSocketConfig) {
    this.wsMessages$ = new Subject<IWsMessage<any>>();

    this.websocketSub = this.wsMessages$.subscribe(null, (error: ErrorEvent) =>
      console.error('WebSocket error!', error)
    );

    this.setInitial();
    this.makeOptions();

    this.status = new Observable<boolean>((observer) => {
      this.connection$ = observer;
    }).pipe(share(), distinctUntilChanged());

    this.statusSub = this.status.subscribe((isConnected) => {
      this.isConnected = isConnected;
      if (!this.reconnection$ && !isConnected) {
        this.reconnect();
      }
    });

    this.connect();
  }

  private setInitial(): void {
    this.reconnectInterval = this.wsConfig.reconnectInterval || 5000;
    this.reconnectAttempts = this.wsConfig.reconnectAttempts || 10;
  }

  private makeOptions(): void {
    this.config = {
      url: this.wsConfig.url,
      closeObserver: {
        next: () => {
          this.destroySubscriptions();
        },
      },
      openObserver: {
        next: () => {
          this.connection$!.next(true);
        },
      },
    };
  }

  private destroySubscriptions(): void {
    this.websocket$?.next({} as IWsMessage<any>);
    this.websocket$?.complete();
    this.connection$!.next(false);
    this.connection$!.complete();
    this.wsMessages$.next({} as IWsMessage<any>);
    this.wsMessages$.complete();
    this.reconnectSub!.unsubscribe();
  }

  ngOnDestroy(): void {
    this.websocketSub.unsubscribe();
    this.statusSub.unsubscribe();
    this.destroySubscriptions();
  }

  private connect(): void {
    this.websocket$ = new WebSocketSubject(this.config!);

    this.websocket$.subscribe(
      (message) => this.wsMessages$.next(message),
      () => {
        if (!this.websocket$) {
          this.reconnect();
        }
      }
    );
  }

  private reconnect(): void {
    this.reconnection$ = interval(this.reconnectInterval).pipe(
      takeWhile(
        (v, index) => index < this.reconnectAttempts! && !this.websocket$
      )
    );

    this.reconnectSub = this.reconnection$.subscribe(
      () => this.connect(),
      null,
      () => {
        if (!this.websocket$) {
          this.wsMessages$.complete();
          this.connection$!.complete();
        }
      }
    );
  }

  public on<T>(event: string): Observable<T> {
    return this.wsMessages$.pipe(
      filter((message: IWsMessage<T>) => message.event === event),
      map((message: IWsMessage<T>) => message.data)
    );
  }

  public send(event: string, data: any = {}): void {
    if (event && this.isConnected) {
      this.websocket$!.next({ event, data } as IWsMessage<any>);
    } else {
      console.error('Send error!');
    }
  }
}
