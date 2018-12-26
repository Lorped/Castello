import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { APP_ROUTES } from './app.routing' ;

import { Status, Personaggio } from './globals';
import { ModalService } from './services/index';
import { SignupService } from './services/index';
import { AuthenticationService } from './services/index';
import { SchedaService } from './services/index';
import { OggettiService } from './services/index';
import { PersonaggioService } from './services/index';

import { AppComponent } from './app.component';
import { IntroComponent } from './intro/intro.component';
import { MenuComponent } from './menu/menu.component';
import { ModalComponent } from './modal/modal.component';
import { RegisterComponent } from './register/register.component';
import { RegolamentoComponent } from './regolamento/regolamento.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { NewsComponent } from './news/news.component';
import { LoginmasterComponent } from './loginmaster/loginmaster.component';
import { MasterComponent } from './master/master.component';
import { StatComponent } from './stat/stat.component';
import { OggettilistComponent } from './oggettilist/oggettilist.component';
import { OggettochangeComponent } from './oggettochange/oggettochange.component';
import { PersonaggilistComponent } from './personaggilist/personaggilist.component';
import { ListscanComponent } from './listscan/listscan.component';
import { PersonaggioComponent } from './personaggio/personaggio.component';




@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    MenuComponent,
    ModalComponent,
    RegisterComponent,
    RegolamentoComponent,
    LoginComponent,
    MainComponent,
    NewsComponent,
    LoginmasterComponent,
    MasterComponent,
    StatComponent,
    OggettilistComponent,
    OggettochangeComponent,
    PersonaggilistComponent,
    ListscanComponent,
    PersonaggioComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES, {useHash: true})
  ],
  providers: [
    Status,
    Personaggio,
    ModalService,
    SignupService,
    AuthenticationService,
    SchedaService,
    OggettiService,
    PersonaggioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
