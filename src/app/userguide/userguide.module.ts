import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';



import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from "@angular/material";
import { HttpClientModule } from '@angular/common/http';
import { UserguideComponent } from './userguide.component';
import { UserguideRoutes } from './userguide.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UserguideRoutes),
        // MdModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        HttpClientModule
    ],
    declarations: [
        UserguideComponent,
    ],
    providers: [

    ]
})
export class termsModule{}

