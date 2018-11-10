import { Routes } from '@angular/router';
import { AddblogComponent } from './addblog.component';
 


export const AddblogRoutes: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: AddblogComponent
        }]
    }
];
