import { Routes } from '@angular/router';
 
import { SupergetusersComponent } from './supergetusers.component';
 


export const SupergetusersRoutes: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: SupergetusersComponent
        }]
    }
];
