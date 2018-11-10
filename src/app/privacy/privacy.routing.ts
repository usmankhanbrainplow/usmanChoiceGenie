import { Routes } from '@angular/router';
import { PrivacyComponent } from './privacy.component';




export const PrivacRoutes: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: PrivacyComponent
        }]
    }
];
