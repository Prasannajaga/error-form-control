import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { FormControlDirectiveComponent } from './form-control-directive/form-control-directive.component';
import { ErrorControlModule } from 'error-control';

@NgModule({
  declarations: [
    AppComponent,
    FormControlDirectiveComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule ,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ErrorControlModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
