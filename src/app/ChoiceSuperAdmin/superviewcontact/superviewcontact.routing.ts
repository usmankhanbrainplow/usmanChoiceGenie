import { Routes } from '@angular/router';
import { SuperviewcontactComponent } from './superviewcontact.component';




export const ContactRoutes: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: SuperviewcontactComponent
        }]
    }
];
