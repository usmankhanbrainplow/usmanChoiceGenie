import { Routes } from '@angular/router';
import { WhyChocieGenieComponent } from './why-chocie-genie.component';



export const WhyRoutes: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: WhyChocieGenieComponent
        }]
    }
];
