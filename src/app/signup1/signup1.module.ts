import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';
import { BlackgeeksRecaptchaModule } from 'recaptcha-blackgeeks';
import {Signup1Component} from "./signup1.component";
import {Signup1Routes} from "./signup1.routing";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from "@angular/material";
import { HttpClientModule } from '@angular/common/http';
import { TextMaskModule } from 'angular2-text-mask';
import { RecapchaModule } from '../recapcha/recapcha.module';
import { InternationalPhoneModule } from 'ng4-intl-phone';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(Signup1Routes),
        // BlackgeeksRecaptchaModule,
        // MdModule,
        RecapchaModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        HttpClientModule,TextMaskModule,
        InternationalPhoneModule
    ],
    declarations: [
        Signup1Component
    ],
    providers: [

    ]
})

export class Signup1Module {}
