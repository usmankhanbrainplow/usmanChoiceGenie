import { Routes } from '@angular/router';
import { MaindashboardsComponent } from './maindashboards.component';


export const maindashboardsroute: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: MaindashboardsComponent
        }]
    }
];
