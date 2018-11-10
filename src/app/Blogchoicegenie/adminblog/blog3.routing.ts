import { Routes } from '@angular/router';
import { Blog3Component } from './blog3.component';


export const Blog3Routes: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: Blog3Component
        }]
    }
];
