import { Routes } from '@angular/router';
import { ActivateaccountComponent } from './activateaccount.component';

export const Activateaccount: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: ActivateaccountComponent
        }]
    }
];
