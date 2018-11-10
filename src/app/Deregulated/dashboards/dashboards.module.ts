import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MdModule } from '../md/md.module';
import { MaterialModule } from '../../app.module';

import { DashboardsComponent } from './dashboards.component';
import { DashboardsRoutes } from './dashboards.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(DashboardsRoutes),
        FormsModule,
        // MdModule,
        MaterialModule
    ],
    declarations: [DashboardsComponent]
})

export class DashboardsModule {}
