import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MdModule } from '../md/md.module';
import { MaterialModule } from '../../app.module';
import { SupersubscriberRoutes } from './supersubscriber.routing';
import { SupersubscriberComponent } from './supersubscriber.component';




@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(SupersubscriberRoutes),
        FormsModule,
        ReactiveFormsModule,
        // MdModule,
        MaterialModule
    ],
    declarations: [SupersubscriberComponent]
})

export class SupersubscriberModule {}
