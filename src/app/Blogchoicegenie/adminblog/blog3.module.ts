import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { MdModule } from '../md/md.module';
import { MaterialModule } from '../../app.module';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from "@angular/material";
import { HttpClientModule } from '@angular/common/http';
import { Blog3Routes } from './blog3.routing';
import { Blog3Component } from './blog3.component';
import { CKEditorModule } from 'ng2-ckeditor';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(Blog3Routes),
        // MdModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        HttpClientModule,CKEditorModule
    ],
    declarations: [
        Blog3Component
    ],
    providers: [

    ]
})

export class Blog3Module {}
