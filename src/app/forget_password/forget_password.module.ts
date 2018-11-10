import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';

import { ForgetpasswordComponent } from './forget_password.component';
import { ForgetpasswordRoutes } from './forget_password.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ForgetpasswordRoutes),
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    declarations: [ForgetpasswordComponent]
})

export class ForgetpasswordModule {}
