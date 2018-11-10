import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from "@angular/material";
import { HttpClientModule } from '@angular/common/http';
import { choiceRoutes } from './choiceandsaving.routing';
import { ChoiceandsavingComponent } from './choiceandsaving.component';
 
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(choiceRoutes),
        // MdModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        HttpClientModule
    ],
    declarations: [
        ChoiceandsavingComponent
    ],
    providers: [

    ]
})

export class ChoiceandsavingModule {}
