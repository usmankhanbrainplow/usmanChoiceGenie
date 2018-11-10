import { Routes } from '@angular/router';
import { FeaturesComparisonComponent } from './features-comparison.component';





export const FeaturesRoutes: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: FeaturesComparisonComponent
        }]
    }
];
