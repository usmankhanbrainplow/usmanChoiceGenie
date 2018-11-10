import { Routes } from '@angular/router';
import { UserguideComponent } from './userguide.component';
 

export const UserguideRoutes: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: UserguideComponent
        }]
    }
];
