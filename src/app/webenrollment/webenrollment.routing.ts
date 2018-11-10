import { Routes } from '@angular/router';
// import { PrivacyComponent } from './privacy.component';
// import { PriceComponent } from './price.component';
import { WebenrollmentComponent } from './webenrollment.component';




export const PrivacRoutes: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: WebenrollmentComponent
        }]
    }
];
