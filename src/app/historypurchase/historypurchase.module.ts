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
import { PrivacRoutes } from './historypurchase.routing';
import { TextMaskModule } from 'angular2-text-mask';

import { HistorypurchaseComponent } from './historypurchase.component';



@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PrivacRoutes),
        MaterialModule,
        FormsModule,
        TextMaskModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        HttpClientModule,
            
    ],
    declarations: [HistorypurchaseComponent],
    providers: [
        // SweetAlertService,
        // DataService
    ]
})

export class purchaseModule {}

