import { Routes } from '@angular/router';
import { NewProductsComponent } from './new-products.component';

export const NewProducts: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: NewProductsComponent
        }]
    }
];
