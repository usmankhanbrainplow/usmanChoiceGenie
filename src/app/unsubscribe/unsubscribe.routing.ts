import { Routes } from '@angular/router';

 
import { UnsubscribeComponent } from './unsubscribe.component';

export const unsubscribeRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: '',
        component: UnsubscribeComponent
    }]
}
];
