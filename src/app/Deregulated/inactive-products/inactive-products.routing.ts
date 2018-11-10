import { Routes } from '@angular/router';


import { InactiveProductsComponent } from './inactive-products.component';

export const InactiveproductsRoutes: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: InactiveProductsComponent
        }]
    }
];
