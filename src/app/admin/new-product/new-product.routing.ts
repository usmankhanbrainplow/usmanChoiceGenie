import { Routes } from '@angular/router';
import { NewProductComponent } from './new-product.component';

export const NewProduct: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: NewProductComponent
        }]
    }
];
