import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer.component';

// import { MdModule } from '../md/md.module';
import { MaterialModule } from '../../app.module';
import { BlackgeeksRecaptchaModule } from 'recaptcha-blackgeeks';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from "@angular/material";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [ RouterModule, CommonModule, FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        HttpClientModule ],
    declarations: [ FooterComponent ],
    exports: [ FooterComponent ]
})

export class FooterModule {}
