import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProfileService } from './com-profile/profile.service';
import { DeleteBlogService } from './Blogchoicegenie/adminblog/delete-blog.service';
import { EditBlogService } from './Blogchoicegenie/adminblog/edit-blog.service';
import { AngularcliStarRatingModule } from 'angularcli-star-rating'
import { LoaderModule } from './loader/loader.module';
import { SlickModule } from 'ngx-slick';


import {
  
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';
import { SuperadminComponent } from './layouts/superadmin/superadmin.component';
import { SupersiderbarComponent } from './supersiderbar/supersiderbar.component';
import { AppComponent } from './app.component';
import { SimpleGlobal } from 'ng2-simple-global';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { CustomerLayoutComponent } from './layouts/customer/customer-layout.component';
import { NormalLayoutComponent } from './layouts/normal/normal-layout.component';
import { AppRoutes } from './app.routing';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';
import { AboutComponent } from './about/about.component';
import { HomeService } from './home/home.service';
import { BrowserModule, BrowserTransferStateModule } from "@angular/platform-browser";
import { DataService } from './data.service';
import { Authgaurd2Service } from './_guards/authgaurd2.service';
import { Authgaurd3Service } from './_guards/authgaurd3.service';
import { Authgaurd4Service } from './_guards/authgaurd4.service';

import { LoginService } from './pages/login/login.service';
import { ResidentialService } from './residential/residential-dialog2/residential.service';
import { PagerService } from './pager.service';
import { CompanyService } from './company.service';
import { StepperOverviewExample } from './signup/stepper-overview-example';
import { UserLoginService } from './pages/userlogin/userlogin.service';
import { SuperLoginService } from './pages/superlogin/superlogin.service';
import { DeleteService } from './regulated/dashboard/delete.service';
import { EditService } from './regulated/dashboard/edit.service';
import { RandomService } from './random.service';
import { ActiveService } from './active.service';
import { EditreviewService } from './ChoiceSuperAdmin/superreviews/editreview.service';
import { DeletereviewService } from './ChoiceSuperAdmin/superreviews/deletereview.service';
import { ChangepasswordService } from './changepassword.service';
import { DeletecontactService } from './ChoiceSuperAdmin/superviewcontact/deletecontact.service';
import { DeleteviewapartnerService } from './ChoiceSuperAdmin/sviewapartner/deleteviewapartner.service';
import { SuperupdateService } from './ChoiceSuperAdmin/superdashboard/superupdate.service';
import { DeletesuperdashboardService } from './ChoiceSuperAdmin/superdashboard/deletesuperdashboard.service';
import { DataloginService } from './pages/login/datalogin.service';
import { AuthguardService } from './_guards/authguard.service';
import { ConsumersidebarComponent } from './consumersidebar/consumersidebar.component';
import { ConsumeradminComponent } from './layouts/consumeradmin/consumeradmin.component';
import { UserNavbarModule } from './shared/usernavbar/usernavbar.module';
import { UpdateService } from './user-profile/update.service';
import { UpdatepartnerService } from './ChoiceSuperAdmin/sviewapartner/updatepartner.service';
import { HeaderService } from './header/header.service';
import { UnsubscribeService } from './unsubscribe/unsubscribe.service';
import { DeletegetuserService } from './ChoiceSuperAdmin/supergetusers/deletegetuser.service';
import { UpdategetuserService } from './ChoiceSuperAdmin/supergetusers/updategetuser.service';

import {ProductsComponent} from './regulated/products/products.component'

import { ExcelService } from './excel.service';
// import {NotificationsService} from 'angular4-notify';
import { NotifierService } from 'angular-notifier';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { MyfilterPipe } from './myfilter.pipe';
import { UserguideComponent } from './userguide/userguide.component';
import { PriceComponent } from './price/price.component';
import { WebenrollmentComponent } from './webenrollment/webenrollment.component';
import { PricingService } from './price/pricing.service';
import { TextMaskModule } from 'angular2-text-mask';
import { HistorypurchaseComponent } from './historypurchase/historypurchase.component';
import { HistorypurchaseService } from './historypurchase/historypurchase.service';
const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'left',
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
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    FormsModule,
    MatFormFieldModule
  ],
  declarations: [],

})
export class MaterialModule { }

@NgModule({
  imports: [
    SlickModule.forRoot(),
    BrowserModule.withServerTransition({ appId: 'PlugExp' }),
    BrowserTransferStateModule,
    NotifierModule.withConfig(customNotifierOptions),
    CommonModule,
    BrowserAnimationsModule,
    AngularcliStarRatingModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forRoot(AppRoutes),
    HttpModule,
    HttpClientModule,
    MaterialModule,
    MatSelectModule,
    MatNativeDateModule,
    SidebarModule,
    NavbarModule,
    UserNavbarModule,
    FooterModule,
    // Ng2CarouselamosModule,
    FooterModule,
    // CarouselModule.forRoot(),
    BrowserModule,
    LoaderModule,
    // MyfilterPipe,
    //IonicModule.forRoot(AppRoutes),
    //  HttpClientModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    CustomerLayoutComponent,
    NormalLayoutComponent,
    AuthLayoutComponent,
    HomeComponent,
    SuperadminComponent,
    // HomeComponent,
    HeaderComponent,
    UserSidebarComponent,
    SupersiderbarComponent,
    AboutComponent,
    ConsumersidebarComponent,
    ConsumeradminComponent,
    // ChangePasswordComponent,
    StepperOverviewExample,
    
    // UsersdashboardComponent
    // ProductsComponent
    // MyfilterPipe,




  ],
  providers: [
    // CookieService
    Authgaurd4Service,
    PricingService,
    NotifierService,
    ExcelService,
    HomeService,
    HeaderService,
    CompanyService,
    UnsubscribeService,
    SimpleGlobal,
    DataService,
    LoginService,
    PagerService,
    UserLoginService,
    SuperLoginService,
    ResidentialService,
    DeleteBlogService,
    EditService,
    Authgaurd2Service,
    DeleteService,
    ProfileService,
    DeletereviewService,
    EditreviewService,
    ActiveService,
    ChangepasswordService,
    DeletecontactService,
    DeleteviewapartnerService,
    SuperupdateService,
    DeletesuperdashboardService,
    DataloginService,
    AuthguardService,
    Authgaurd3Service,
    UpdateService,
    EditBlogService,
    UpdatepartnerService,
    RandomService,
    DeletegetuserService,
    UpdategetuserService,
    HistorypurchaseService
    // MyfilterPipe,
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
