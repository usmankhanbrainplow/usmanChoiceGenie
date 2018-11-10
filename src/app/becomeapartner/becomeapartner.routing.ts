import { Routes } from '@angular/router';
import { BecomeapartnerComponent } from './becomeapartner.component';


export const BecomepartnerRoutes: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: BecomeapartnerComponent
        }]
    }
];
