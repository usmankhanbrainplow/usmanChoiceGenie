import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { MdModule } from '../md/md.module';
import { MaterialModule } from '../../app.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from "@angular/material";
import { HttpClientModule } from '@angular/common/http';
import {  maindashboardsroute } from './maindashboards.routing';
import { MaindashboardsComponent } from './maindashboards.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(maindashboardsroute),
        // MdModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        HttpClientModule
    ],
    declarations: [
        MaindashboardsComponent
    ],
    providers: [

    ]
})

export class vendorsModule {}
