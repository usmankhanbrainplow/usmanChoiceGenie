import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../app.module';
import { PagerService } from '../../pager.service';
import { HttpClientModule } from '@angular/common/http'
import {ProductComponent} from "./product.component";
// import {ExtendedTableComponent} from "../tables/extendedtable/extendedtable.component";
// import {RegularTableComponent} from "../tables/regulartable/regulartable.component";
import {ProductRoutes} from './product.routing';
//import {  plandetailDialog} from './products.component';
import { AngularcliStarRatingModule } from 'angularcli-star-rating'
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { SlickModule } from 'ngx-slick';

import { HomeService } from '../../home/home.service';
import { SimpleGlobal } from 'ng2-simple-global';
import { LoaderModule } from '../../loader/loader.module';
// import { Pipe, PipeTransform } from "@angular/core";
// import { HttpClientModule } from '@angular/common/http'
const customNotifierOptions: NotifierOptions = {
    position: {
          horizontal: {
              position: 'left',
              distance: 12
          },
          vertical: {
              position: 'bottom',
              distance: 12,
              gap: 10
          }
      },
    theme: 'material',
    behaviour: {
      autoHide: 5000,
      onClick: 'hide',
      onMouseover: 'pauseAutoHide',
      showDismissButton: true,
      stacking: 4
    },
    animations: {
      enabled: true,
      show: {
        preset: 'slide',
        speed: 300,
        easing: 'ease'
      },
      hide: {
        preset: 'fade',
        speed: 300,
        easing: 'ease',
        offset: 50
      },
      shift: {
        speed: 300,
        easing: 'ease'
      },
      overlap: 150
    }
  };
@NgModule({
    imports: [
        CommonModule,
        SlickModule.forRoot(),
        RouterModule.forChild(ProductRoutes),
        FormsModule,
        AngularcliStarRatingModule,
        NotifierModule.withConfig(customNotifierOptions),
        LoaderModule,
      
        // MdModule,
        MaterialModule,
      HttpClientModule
    ],
    declarations: [
        ProductComponent,
        // ExtendedTableComponent,
        // RegularTableComponent,
      
        //PrettyPlanDetails
    ],
    providers: [
        PagerService,
        SimpleGlobal,
        HomeService
    ],
    entryComponents: []
 
})

export class ProductModule {}
