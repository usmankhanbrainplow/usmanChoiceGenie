import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';
import {LoaderModule} from '../loader/loader.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from "@angular/material";
import { HttpClientModule } from '@angular/common/http';
import { HowRoutes } from './how.routing';
import { HowItWorksComponent } from './how-it-works.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(HowRoutes),
        // MdModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        HttpClientModule,
        LoaderModule
    ],
    declarations: [
        HowItWorksComponent
    ],
    providers: [

    ]
})

export class HowModule {}
