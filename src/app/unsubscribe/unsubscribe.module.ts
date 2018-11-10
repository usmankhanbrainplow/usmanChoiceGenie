import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';
import { unsubscribeRoutes } from './unsubscribe.routing';
import { UnsubscribeComponent } from './unsubscribe.component';




@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(unsubscribeRoutes),
        FormsModule,
        ReactiveFormsModule,
        // MdModule,
        MaterialModule
    ],
    declarations: [UnsubscribeComponent]
})

export class UnsubscribeModule {}
