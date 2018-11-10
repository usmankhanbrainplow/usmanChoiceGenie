import { Routes } from '@angular/router';
import { UserloginComponent } from './userlogin.component';

export const LoginRoutes: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: UserloginComponent
        }]
    }
];
