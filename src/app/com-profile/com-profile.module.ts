import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';
import {MatDialogModule} from '@angular/material/dialog';
import { ComProfileRoutes} from './com-profile.routing';
import { ComProfileComponent } from './com-profile.component';
 

@NgModule({
    imports: [
        MatDialogModule,
        CommonModule,
        RouterModule,
        FormsModule,
        RouterModule.forChild(ComProfileRoutes),
        // MdModule,
        MaterialModule,
    ],
    declarations: [
        ComProfileComponent
    ],
    entryComponents:[

    ],
})

export class ComProfileModule {}
