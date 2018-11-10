import { Routes } from '@angular/router';
import { ChangepasswordComponent } from './changepassword.component';
export const changepasswordRoutes: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: ChangepasswordComponent
            }
        ]
    }
];
