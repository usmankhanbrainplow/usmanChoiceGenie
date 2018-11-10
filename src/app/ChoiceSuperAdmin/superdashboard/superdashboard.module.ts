import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MdModule } from '../md/md.module';
import { MaterialModule } from '../../app.module';


import { SuperDashboardRoutes } from './superdashboard.routing';
import { SuperdashboardComponent } from './superdashboard.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(SuperDashboardRoutes),
        FormsModule,
        ReactiveFormsModule,
        // MdModule,
        MaterialModule
    ],
    declarations: [SuperdashboardComponent]
})

export class SuperDashboardModule {}
