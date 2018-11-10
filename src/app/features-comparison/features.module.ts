import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../app.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from "@angular/material";
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../data.service';
import { FeaturesRoutes } from './features.routing';
import { FeaturesComparisonComponent } from './features-comparison.component';
 

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(FeaturesRoutes),
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        HttpClientModule,
            
    ],
    declarations: [FeaturesComparisonComponent],
    providers: [
        DataService
    ]
})

export class FeatureModule {}

