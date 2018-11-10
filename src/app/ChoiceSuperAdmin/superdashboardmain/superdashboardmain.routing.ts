import { Routes } from '@angular/router';

 
import { SuperdashboardmainComponent } from './superdashboardmain.component';

export const SuperDashboardmainRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: '',
        component: SuperdashboardmainComponent
    }]
}
];
