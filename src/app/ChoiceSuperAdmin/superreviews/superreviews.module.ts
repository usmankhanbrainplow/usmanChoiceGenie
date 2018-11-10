import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MdModule } from '../md/md.module';
import { MaterialModule } from '../../app.module';
import { SuperreviewsRoutes } from './superreviews.routing';
import { SuperreviewsComponent } from './superreviews.component';

import { NeutronRatingModule } from 'neutron-star-rating';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(SuperreviewsRoutes),
        FormsModule,
        ReactiveFormsModule,
        NeutronRatingModule,
        // MdModule,
        MaterialModule,
     
    ],
    declarations: [SuperreviewsComponent]
})

export class SuperreviewsModule {}
