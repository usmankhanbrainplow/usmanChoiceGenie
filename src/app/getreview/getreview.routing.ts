import { Routes } from '@angular/router';

import { GetreviewComponent } from './getreview.component';

export const GetreviewRoutes: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: GetreviewComponent
        }]
    }
];
