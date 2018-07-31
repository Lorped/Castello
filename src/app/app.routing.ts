import { Routes } from '@angular/router';

import { IntroComponent } from './intro/intro.component';
// import { LoginComponent } from './_components/login/login.component';
// import { RegisterComponent } from './_components/register/register.component';

// import { AuthGuard } from './_guards/auth.guard';


export const APP_ROUTES: Routes = [


    { path: '', component: IntroComponent },


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
