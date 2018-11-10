import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsernavbarComponent } from './usernavbar.component';


@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ UsernavbarComponent ],
    exports: [ UsernavbarComponent ]
})

export class UserNavbarModule {}
