import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';
import { TextMaskModule } from 'angular2-text-mask';

 
// import {SignupRoutes} from "./login.routing";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from "@angular/material";
import { HttpClientModule } from '@angular/common/http';
// import { SweetAlertService } from 'ng2-sweetalert2';
 
import { DataService } from '../data.service';
import { PrivacRoutes } from './price.routing';
import { PriceComponent } from './price.component';
// import { PrivacyComponent } from './privacy.component';



@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PrivacRoutes),
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        HttpClientModule,
        TextMaskModule
            
    ],
    declarations: [PriceComponent],
    providers: [
        // SweetAlertService,
        //DataService
        
    ]
})

export class priceModule {}

