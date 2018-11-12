import { Routes } from '@angular/router';
// import { PrivacyComponent } from './privacy.component';
// import { PriceComponent } from './price.component';
import { WebenrollmentComponent, PlanSearchComponent } from './webenrollment.component';
import { EnrollmentSuccessPageComponent } from './enrollment-success-page.component';





export const PrivacRoutes: Routes = [
    {
        path: '',
        children: [{
            path: '',
            component: WebenrollmentComponent
        }]
    },
];
