import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MdModule } from '../md/md.module';
import { MaterialModule } from '../../app.module';

import { InactiveProductComponent } from './inactive-product.component';
import { InactiveproductRoutes } from './inactive-product.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(InactiveproductRoutes),
        FormsModule,
        // MdModule,
        MaterialModule
    ],
    declarations: [InactiveProductComponent]
})

export class InactiveProductModule {}
