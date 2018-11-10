import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';
import { PagerService } from '../pager.service';
import { HttpClientModule } from '@angular/common/http'
import { GuidComponent } from './guid.component';
// import {ExtendedTableComponent} from "../tables/extendedtable/extendedtable.component";
// import {RegularTableComponent} from "../tables/regulartable/regulartable.component";
import {GuidRoutes} from './guid.routing';
//import {  plandetailDialog} from './products.component';
import { AngularcliStarRatingModule } from 'angularcli-star-rating'


import { SimpleGlobal } from 'ng2-simple-global';
// import { Pipe, PipeTransform } from "@angular/core";
// import { HttpClientModule } from '@angular/common/http'
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(GuidRoutes),
        FormsModule,
        AngularcliStarRatingModule,ReactiveFormsModule,
        // MdModule,
        MaterialModule,
      HttpClientModule
    ],
    declarations: [
        GuidComponent,
        // ExtendedTableComponent,
        // RegularTableComponent,
      
        //PrettyPlanDetails
    ],
    providers: [
        PagerService,
        SimpleGlobal,
      
    ],
    entryComponents: []
 
})

export class GuidModule {}
