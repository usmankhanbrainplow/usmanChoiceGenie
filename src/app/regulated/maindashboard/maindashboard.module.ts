import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MdModule } from '../md/md.module';
import { MaterialModule } from '../../app.module';

import {  vendorRoutes } from './maindashboard.routing';
import { MaindashboardComponent } from './maindashboard.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(vendorRoutes),
        FormsModule,
        // MdModule,
        MaterialModule
    ],
    declarations: [MaindashboardComponent]
})

export class InactiveProductModule {}
