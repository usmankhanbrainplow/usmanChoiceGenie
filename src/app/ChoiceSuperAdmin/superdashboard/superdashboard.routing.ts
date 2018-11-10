import { Routes } from '@angular/router';

import { SuperdashboardComponent } from './superdashboard.component';

export const SuperDashboardRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: '',
        component: SuperdashboardComponent
    }]
}
];
