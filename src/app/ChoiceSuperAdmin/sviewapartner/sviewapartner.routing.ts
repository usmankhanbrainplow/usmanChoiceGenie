import { Routes } from '@angular/router';
import { SviewapartnerComponent } from './sviewapartner.component';
 


export const BecomepartnerRoutes: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: SviewapartnerComponent
        }]
    }
];
