import { Routes } from '@angular/router';
import { Blog1Component } from './blog1.component';


export const Blog1Routes: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: Blog1Component
        }]
    }
];
