import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';
import { ConsumerDashboardRoutes } from './consumerdashboard.routing';
import { ConsumerdashboardComponent } from './consumerdashboard.component';

import { NotifierModule, NotifierOptions } from 'angular-notifier';

const customNotifierOptions: NotifierOptions = {
    position: {
          horizontal: {
              position: 'right',
              distance: 12
          },
          vertical: {
              position: 'top',
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
      stacking: 100
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
        RouterModule.forChild(ConsumerDashboardRoutes),
        FormsModule,
        ReactiveFormsModule,
        // MdModule,
        MaterialModule,
        NotifierModule.withConfig(customNotifierOptions),
      
    ],
    declarations: [ConsumerdashboardComponent]
})

export class ConsumerDashboardModule {}
