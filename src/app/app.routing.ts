import { Routes } from '@angular/router';

import { IntroComponent } from './intro/intro.component';
import { RegisterComponent } from './register/register.component';
// import { LoginComponent } from './_components/login/login.component';
// import { AuthGuard } from './_guards/auth.guard';


export const APP_ROUTES: Routes = [


    { path: '', component: IntroComponent },
    { path: 'register', component: RegisterComponent },


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
