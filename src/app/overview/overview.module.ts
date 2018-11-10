import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';

 
// import {SignupRoutes} from "./login.routing";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from "@angular/material";
import { HttpClientModule } from '@angular/common/http';
// import { SweetAlertService } from 'ng2-sweetalert2';
 
import { DataService } from '../data.service';
import { OverViewRoutes } from './overview.routing';
import { OverviewComponent } from './overview.component';



@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(OverViewRoutes),
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        HttpClientModule,
            
    ],
    declarations: [OverviewComponent],
    providers: [
        // SweetAlertService,
        DataService
    ]
})

export class OverViewModule {}

