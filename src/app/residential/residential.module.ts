import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';
import {MatDialogModule} from '@angular/material/dialog';
import {ResidentialRoutes} from "./residential.routing";
import {DialogOverviewExample, DialogOverviewExampleDialog} from "./residential.component";
import { ResidentialDialog2Component } from './residential-dialog2/residential-dialog2.component';

@NgModule({
    imports: [
        MatDialogModule,
        CommonModule,
        RouterModule,
        FormsModule,
        RouterModule.forChild(ResidentialRoutes),
        // MdModule,
        MaterialModule,
    ],
    declarations: [DialogOverviewExample,DialogOverviewExampleDialog, ResidentialDialog2Component],
    entryComponents:[
        DialogOverviewExampleDialog,ResidentialDialog2Component
    ],
})

export class ResidentialModule {}
