import { Routes } from '@angular/router';

import { HistorypurchaseComponent } from './historypurchase.component';




export const PrivacRoutes: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: HistorypurchaseComponent
        }]
    }
];
