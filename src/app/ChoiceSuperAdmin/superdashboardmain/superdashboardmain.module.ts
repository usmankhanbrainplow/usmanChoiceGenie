import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../app.module';
import { SuperDashboardmainRoutes } from './superdashboardmain.routing';
import { SuperdashboardmainComponent } from './superdashboardmain.component';




@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(SuperDashboardmainRoutes),
        FormsModule,
        ReactiveFormsModule,
        // MdModule,
        MaterialModule
    ],
    declarations: [SuperdashboardmainComponent]
})

export class SuperDashboardmainModule {}
