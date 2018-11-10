import { Routes } from '@angular/router';
import { ChoiceandsavingComponent } from './choiceandsaving.component';
export const choiceRoutes: Routes = [
    {
        path: '',
        children: [ {
            path: '',
            component: ChoiceandsavingComponent
        }]
    }
];
