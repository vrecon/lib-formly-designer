import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxFormlyDesignerModule } from 'ngx-formly-designer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxFormlyDesignerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
