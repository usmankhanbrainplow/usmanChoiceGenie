import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from "@angular/material";
import { HttpClientModule } from '@angular/common/http';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileRoutes } from './user-profile.routing';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UserProfileRoutes),
        // MdModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        HttpClientModule
    ],
    declarations: [
        UserProfileComponent
    ],
    providers: [

    ]
})

export class UserModule {}
