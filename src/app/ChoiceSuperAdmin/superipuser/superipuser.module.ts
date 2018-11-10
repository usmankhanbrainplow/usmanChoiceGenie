import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../app.module';
import { SuperIPUser } from './superipuser.routing';
import { SuperipuserComponent } from './superipuser.component';





@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(SuperIPUser),
        FormsModule,
        ReactiveFormsModule,
        // MdModule,
        MaterialModule
    ],
    declarations: [SuperipuserComponent]
})

export class SuperDashboardmainModule {}
