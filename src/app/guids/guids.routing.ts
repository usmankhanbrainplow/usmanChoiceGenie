import { Routes } from '@angular/router';
import {GuidsComponent} from './guids.component';

export const GuidsRoutes: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: GuidsComponent
        }]
    } 
];
