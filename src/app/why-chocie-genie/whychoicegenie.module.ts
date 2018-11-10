import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from "@angular/material";
import { HttpClientModule } from '@angular/common/http';
import { WhyRoutes } from './whychoicegenie.routing';
import { WhyChocieGenieComponent } from './why-chocie-genie.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(WhyRoutes),
        // MdModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        HttpClientModule
    ],
    declarations: [
        WhyChocieGenieComponent
    ],
    providers: [

    ]
})

export class WhyModule {}
