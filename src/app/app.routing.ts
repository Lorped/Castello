import { Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
// import { LoginComponent } from './_components/login/login.component';
// import { RegisterComponent } from './_components/register/register.component';

// import { AuthGuard } from './_guards/auth.guard';


export const APP_ROUTES: Routes = [


    { path: '', component: MainComponent },


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
