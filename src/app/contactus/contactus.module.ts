import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from "@angular/material";
import { HttpClientModule } from '@angular/common/http';
import { ContactusComponent } from './contactus.component';
import { contactRoutes } from './contactus.routing';
import { BlackgeeksRecaptchaModule } from 'recaptcha-blackgeeks';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(contactRoutes),
        // MdModule,
        BlackgeeksRecaptchaModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        HttpClientModule
    ],
    declarations: [
        ContactusComponent
    ],
    providers: [

    ]
})

export class contactusModule {}
