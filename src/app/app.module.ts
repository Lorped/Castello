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

import { AppComponent } from './app.component';
import { IntroComponent } from './intro/intro.component';
import { MenuComponent } from './menu/menu.component';
import { ModalComponent } from './modal/modal.component';
import { PersonaggioComponent } from './personaggio/personaggio.component';
import { RegisterComponent } from './register/register.component';
import { RegolamentoComponent } from './regolamento/regolamento.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';




@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    MenuComponent,
    ModalComponent,
    PersonaggioComponent,
    RegisterComponent,
    RegolamentoComponent,
    LoginComponent,
    MainComponent
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
    SchedaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
