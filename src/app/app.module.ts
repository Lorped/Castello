import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { APP_ROUTES } from './app.routing' ;

import { Status } from './globals';
import { ModalService } from './services/index';

import { AppComponent } from './app.component';
import { IntroComponent } from './intro/intro.component';
import { MenuComponent } from './menu/menu.component';
import { ModalComponent } from './modal/modal.component';
import { PersonaggioComponent } from './personaggio/personaggio.component';
import { RegisterComponent } from './register/register.component';
import { RegolamentoComponent } from './regolamento/regolamento.component';




@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    MenuComponent,
    ModalComponent,
    PersonaggioComponent,
    RegisterComponent,
    RegolamentoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES, {useHash: true})
  ],
  providers: [
    Status,
    ModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
