import { Routes } from '@angular/router';
import { OverviewComponent } from './overview.component';




export const OverViewRoutes: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: OverviewComponent
        }]
    }
];
