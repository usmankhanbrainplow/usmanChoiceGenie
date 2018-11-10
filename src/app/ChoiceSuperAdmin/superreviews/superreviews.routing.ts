import { Routes } from '@angular/router';

 
import { SuperreviewsComponent } from './superreviews.component';

export const SuperreviewsRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: '',
        component: SuperreviewsComponent
    }]
}
];
