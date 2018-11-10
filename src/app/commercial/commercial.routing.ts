import { Routes } from '@angular/router';

import { CommercialComponent } from './commercial.component';

export const CommercialRoutes: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: CommercialComponent
            }
        ]
    }
];
