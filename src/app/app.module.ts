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
import { MagielistComponent } from './magielist/magielist.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button'; 
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';

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
    PersonaggioComponent,
    MagielistComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
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
    PersonaggioService,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
