import { Routes } from '@angular/router';
// import { PrivacyComponent } from './privacy.component';
import { PriceComponent } from './price.component';




export const PrivacRoutes: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: PriceComponent
        }]
    }
];
