import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { MdModule } from '../md/md.module';
import { MaterialModule } from '../../app.module';
import {LoaderModule} from '../../loader/loader.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from "@angular/material";
import { HttpClientModule } from '@angular/common/http';
import { BlogRoutes } from './blog.routing';
import { BlogComponent } from './blog.component';
 
 

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(BlogRoutes),
        // MdModule,
        MaterialModule,
        FormsModule,
        LoaderModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        HttpClientModule
    ],
    declarations: [
        BlogComponent,
   
      
    ],
    providers: [

    ]
})

export class BlogModule {}
