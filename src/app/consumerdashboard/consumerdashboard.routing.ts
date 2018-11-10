import { Routes } from '@angular/router';
import { ConsumerdashboardComponent } from './consumerdashboard.component';

export const ConsumerDashboardRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: '',
        component: ConsumerdashboardComponent
    }]
}
];
