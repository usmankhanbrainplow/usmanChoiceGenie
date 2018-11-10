import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { MdModule } from '../md/md.module';
import { MaterialModule } from '../../app.module';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from "@angular/material";
import { HttpClientModule } from '@angular/common/http';
import { SupergetusersRoutes } from './supergetusers.routing';
import { SupergetusersComponent } from './supergetusers.component';
import { MyfilterPipe } from '../../myfilter.pipe';
 
 
 
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(SupergetusersRoutes),
        // MdModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        HttpClientModule,
        // MyfilterPipe,
    ],
    declarations: [
        SupergetusersComponent,
        MyfilterPipe
    ],
    providers: [

    ]
})

export class partnerModule {}
