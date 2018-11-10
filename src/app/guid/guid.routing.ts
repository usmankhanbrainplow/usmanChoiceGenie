import { Routes } from '@angular/router';
import {GuidComponent} from './guid.component';

export const GuidRoutes: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: GuidComponent
        }]
    } 
];
