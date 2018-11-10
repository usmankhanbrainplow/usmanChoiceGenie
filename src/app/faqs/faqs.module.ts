import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from "@angular/material";
import { HttpClientModule } from '@angular/common/http';
import { FaqsComponent } from './faqs.component';
import { FaqRoutes } from './faqs.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(FaqRoutes),
        // MdModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        HttpClientModule
    ],
    declarations: [
        FaqsComponent
    ],
    providers: [

    ]
})

export class FaqsModule {}
