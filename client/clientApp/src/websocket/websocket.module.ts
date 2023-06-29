import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsocketService } from './services/websocket.service';
import { WebSocketConfig } from './models/websocket-config';
import { Config } from './config/websocket-config';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [WebsocketService],
})
export class WebsocketModule {
  public static config(wsConfig: WebSocketConfig): ModuleWithProviders<any> {
    return {
      ngModule: WebsocketModule,
      providers: [{ provide: Config, useValue: wsConfig }],
    };
  }
}
