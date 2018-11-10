import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MdModule } from '../md/md.module';
import { MaterialModule } from '../../app.module';

import { InactiveProductsComponent } from './inactive-products.component';
import { InactiveproductsRoutes } from './inactive-products.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(InactiveproductsRoutes),
        FormsModule,
        // MdModule,
        MaterialModule
    ],
    declarations: [InactiveProductsComponent]
})

export class InactiveProductsModule {}
