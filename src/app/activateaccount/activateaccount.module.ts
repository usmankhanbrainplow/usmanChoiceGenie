import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';


import {ActivateaccountComponent} from "./activateaccount.component";
import {Activateaccount} from './activateaccount.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(Activateaccount),
        FormsModule,
        MaterialModule
    ],
    declarations: [
        ActivateaccountComponent,
    ],
    entryComponents: []
})

export class ActivateAccountModule {}
