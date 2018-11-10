import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { MdModule } from '../md/md.module';
import { MaterialModule } from '../../app.module';


// import {SignupRoutes} from "./login.routing";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from "@angular/material";
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../../data.service';
import { SuperLoginRoutes } from './superlogin.routing';
import { SuperloginComponent } from './superlogin.component';
import { BlackgeeksRecaptchaModule } from 'recaptcha-blackgeeks';
import { RecaptchaModule } from 'ng-recaptcha';




@NgModule({
    imports: [
        CommonModule,
        BlackgeeksRecaptchaModule,
        RecaptchaModule.forRoot(),
        RouterModule.forChild(SuperLoginRoutes),
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        HttpClientModule,
            
    ],
    declarations: [SuperloginComponent],
    providers: [
        // SweetAlertService,
        DataService
    ]
})

export class LoginModule {}

