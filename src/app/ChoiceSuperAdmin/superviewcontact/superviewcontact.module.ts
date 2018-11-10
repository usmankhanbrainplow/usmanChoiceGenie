import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { MdModule } from '../md/md.module';
import { MaterialModule } from '../../app.module';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from "@angular/material";
import { HttpClientModule } from '@angular/common/http';
import { ContactRoutes } from './superviewcontact.routing';
import { SuperviewcontactComponent } from './superviewcontact.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ContactRoutes),
        // MdModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        HttpClientModule
    ],
    declarations: [
        SuperviewcontactComponent,
        // MyfilterPipe
    ],
    providers: [

    ]
})

export class superviewcontactModule {}
