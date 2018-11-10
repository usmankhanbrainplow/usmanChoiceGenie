import { Routes } from '@angular/router';
import { UsersignupComponent } from './usersignup.component';



export const UserSignupRoutes: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: UsersignupComponent
        }]
    }
];
