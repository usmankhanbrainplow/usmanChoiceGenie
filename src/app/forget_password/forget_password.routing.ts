import { Routes } from '@angular/router';


import { ForgetpasswordComponent } from './forget_password.component';

export const ForgetpasswordRoutes: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: ForgetpasswordComponent
        }]
    }
];
