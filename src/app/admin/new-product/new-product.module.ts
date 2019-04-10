import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../app.module';

import { TextMaskModule } from 'angular2-text-mask';
import { CurrencyMaskModule } from "ng2-currency-mask";
import {NewProductComponent} from "./new-product.component";
import {NewProduct} from './new-product.routing';
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask/src/currency-mask.config';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "left",
  allowNegative: false,
  decimal: ".",
  precision: 2,
  prefix: "¢",
  suffix: "",
  thousands: ""
};
@NgModule({
    imports: [
        CommonModule,TextMaskModule,CurrencyMaskModule,
        RouterModule.forChild(NewProduct),
        FormsModule,
        MaterialModule,ReactiveFormsModule
    ],
    declarations: [
      NewProductComponent,
    ],
    providers: [
      { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ],
    entryComponents: []
})

export class NewProductModule {}
