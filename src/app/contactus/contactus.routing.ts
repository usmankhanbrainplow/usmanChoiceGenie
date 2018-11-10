import { Routes } from '@angular/router';

import { ContactusComponent } from './contactus.component';

export const contactRoutes: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: ContactusComponent
        }]
    }
];
