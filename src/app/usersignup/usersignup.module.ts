import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';

import { BlackgeeksRecaptchaModule } from 'recaptcha-blackgeeks';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from "@angular/material";
import { HttpClientModule } from '@angular/common/http';
import { UserSignupRoutes } from './usersignup.routing';
import { UsersignupComponent } from './usersignup.component';
import { TextMaskModule } from 'angular2-text-mask';
import { RecapchaModule } from '../recapcha/recapcha.module';
import { InternationalPhoneModule } from 'ng4-intl-phone';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UserSignupRoutes),
        // MdModule,
        RecapchaModule,
        // BlackgeeksRecaptchaModule,
        TextMaskModule,
        MaterialModule,
        FormsModule,
        
        ReactiveFormsModule,
        MatDatepickerModule,
        HttpClientModule,
        InternationalPhoneModule
    ],
    declarations: [
        UsersignupComponent
    ],
    providers: [

    ]
})

export class userSignupModule {}
