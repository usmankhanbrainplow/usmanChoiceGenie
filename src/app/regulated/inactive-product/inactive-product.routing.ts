import { Routes } from '@angular/router';


import { InactiveProductComponent } from './inactive-product.component';

export const InactiveproductRoutes: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: InactiveProductComponent
        }]
    }
];
