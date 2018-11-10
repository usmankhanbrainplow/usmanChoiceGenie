import { Routes } from '@angular/router';
import { FaqsComponent } from './faqs.component';


export const FaqRoutes: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: FaqsComponent
        }]
    }
];
