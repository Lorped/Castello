import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { APP_ROUTES } from './app.routing' ;

import { Status, Personaggio } from './globals';
import { SignupService } from './services/index';
import { AuthenticationService } from './services/index';
import { SchedaService } from './services/index';
import { OggettiService } from './services/index';
import { PersonaggioService } from './services/index';

import { AppComponent } from './app.component';
import { IntroComponent } from './intro/intro.component';


import { RegisterComponent } from './register/register.component';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

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
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon'; 
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import {MatNativeDateModule} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio'; 
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 

import { AngularFireModule} from '@angular/fire/compat';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';

import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    RegisterComponent,
    LoginComponent,
    MainComponent,
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
    MatToolbarModule,
    HttpClientModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSlideToggleModule,
    RouterModule.forRoot(APP_ROUTES, {useHash: true}),
    ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: !isDevMode(),
        // Register the ServiceWorker as soon as the application is stable
        // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
      }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireMessagingModule
    
  ],
  providers: [
    Status,
    Personaggio,
    SignupService,
    AuthenticationService,
    SchedaService,
    OggettiService,
    PersonaggioService,
    provideAnimationsAsync(),
    {provide: MAT_DATE_LOCALE, useValue: 'it'},
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {strict: true}},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
