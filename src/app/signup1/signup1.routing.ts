import { Routes } from '@angular/router';
import {Signup1Component} from './signup1.component';

export const Signup1Routes: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: Signup1Component
        }]
    }
];
