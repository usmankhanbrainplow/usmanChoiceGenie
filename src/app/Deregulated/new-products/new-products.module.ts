import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../app.module';


import {NewProductsComponent} from "./new-products.component";
import {NewProducts} from './new-products.routing';
import { TextMaskModule } from 'angular2-text-mask';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { LoaderModule } from '../../loader/loader.module';
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(NewProducts),
        FormsModule,CurrencyMaskModule,
        MaterialModule,ReactiveFormsModule,TextMaskModule,
        LoaderModule
    ],
    declarations: [
      NewProductsComponent,
    ],
    entryComponents: []
})

export class NewProductsModule {}
