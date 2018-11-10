import { Routes } from '@angular/router';

import { HowItWorksComponent } from './how-it-works.component';

export const HowRoutes: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: HowItWorksComponent
        }]
    }
];
