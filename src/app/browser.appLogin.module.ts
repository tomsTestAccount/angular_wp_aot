/* tslint:disable max-line-length */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { AppComponent } from './app.component';
import { AppLoginComponent } from './appLogin.component';
import { AppLoginModule } from './appLogin.module';
import { BrowserTransferStateModule } from '../modules/transfer-state/browser-transfer-state.module';

@NgModule({
  bootstrap: [AppLoginComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({
      appId: 'my-app-id'
    }),
    BrowserTransferStateModule,
	AppLoginModule
  ]
})
export class BrowserAppLoginModule { }
