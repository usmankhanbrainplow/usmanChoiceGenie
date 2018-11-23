import { Routes } from '@angular/router';


// import { InactiveProductComponent } from './inactive-product.component';
import { MaindashboardComponent } from './maindashboard.component';

export const vendorRoutes: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: MaindashboardComponent
        }]
    }
];
