import { Routes } from '@angular/router';
import { SuperipuserComponent } from './superipuser.component';

 

export const SuperIPUser: Routes = [
    {

      path: '',
      children: [ {
        path: '',
        component: SuperipuserComponent
    }]
}
];
