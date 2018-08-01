import { Routes } from '@angular/router';

import { IntroComponent } from './intro/intro.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

// import { AuthGuard } from './_guards/auth.guard';


export const APP_ROUTES: Routes = [


    { path: '', component: IntroComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'main', component: MainComponent },



    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
