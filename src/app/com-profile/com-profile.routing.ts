import { Routes } from '@angular/router';
import { ComProfileComponent } from './com-profile.component';

export const ComProfileRoutes: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: ComProfileComponent
            }
        ]
    }
];
