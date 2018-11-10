import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../app.module';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from "@angular/material";
import { HttpClientModule } from '@angular/common/http';
import { BecomepartnerRoutes } from './sviewapartner.routing';
import { SviewapartnerComponent } from './sviewapartner.component';
 
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(BecomepartnerRoutes),
        // MdModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        HttpClientModule
    ],
    declarations: [
        SviewapartnerComponent
    ],
    providers: [

    ]
})

export class partnerModule {}
