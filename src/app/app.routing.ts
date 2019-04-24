import { Routes } from '@angular/router';

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


// import { AuthGuard } from './_guards/auth.guard';


export const APP_ROUTES: Routes = [


    { path: '', component: IntroComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'loginmaster', component: LoginmasterComponent },
    { path: 'main', component: MainComponent },
    { path: 'master', component: MasterComponent },
    { path: 'stat', component: StatComponent },
    { path: 'oggettilist', component: OggettilistComponent },
    { path: 'oggetto/:id', component: OggettochangeComponent },
    { path: 'personaggilist', component: PersonaggilistComponent },
    { path: 'listscan', component: ListscanComponent },
    { path: 'magielist', component: MagielistComponent },
    { path: 'personaggio/:id', component: PersonaggioComponent },


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
