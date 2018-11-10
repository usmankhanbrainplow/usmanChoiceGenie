import { Routes } from '@angular/router';
import { SuperloginComponent } from './superlogin.component';
 

export const SuperLoginRoutes: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: SuperloginComponent
        }]
    }
];
