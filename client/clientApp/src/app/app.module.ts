import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '../store/effects/user.effects';
import { StoreModule } from '@ngrx/store';
import { appReducers } from '../store/reducers/app.reducers';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { WebsocketModule } from '../websocket/websocket.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([UserEffects]),
    WebsocketModule.config({
      url: 'ws://localhost:6759',
    }),
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
