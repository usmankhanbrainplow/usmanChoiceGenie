import { Routes } from '@angular/router';
import{TermsComponent} from './terms.component';

export const termsRoutes: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: TermsComponent
        }]
    }
];
