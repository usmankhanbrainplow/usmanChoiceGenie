import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from "@angular/material";
import { HttpClientModule } from '@angular/common/http';
import { changepasswordRoutes } from './changepassword.routing';
import { ChangepasswordComponent } from './changepassword.component';
 

@NgModule({
    imports: [
        // MatDialogModule,
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(changepasswordRoutes),
        // MdModule,
        MaterialModule,
    ],
    declarations: [
        ChangepasswordComponent
    ],
    entryComponents:[

    ],
})

export class ChangePasswordModule {}
