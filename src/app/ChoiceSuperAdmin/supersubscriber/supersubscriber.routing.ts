import { Routes } from '@angular/router';

 
import { SupersubscriberComponent } from './supersubscriber.component';

export const SupersubscriberRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: '',
        component: SupersubscriberComponent
    }]
}
];
