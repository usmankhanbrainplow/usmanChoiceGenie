import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';
import {MatDialogModule} from '@angular/material/dialog';
import { CommercialRoutes } from "./commercial.routing";
import {CommercialComponent} from "./commercial.component";

@NgModule({
    imports: [
        MatDialogModule,
        CommonModule,
        RouterModule,
        FormsModule,
        RouterModule.forChild(CommercialRoutes),
        // MdModule,
        MaterialModule,
    ],
    declarations: [
        CommercialComponent
    ],
    entryComponents:[

    ],
})

export class CommercialModule {}
