import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AdminLayoutComponent} from './layouts/admin/admin-layout.component';
import {AuthLayoutComponent} from './layouts/auth/auth-layout.component';
import {AboutComponent} from "./about/about.component";
import {CustomerLayoutComponent} from "./layouts/customer/customer-layout.component";
import {NormalLayoutComponent} from "./layouts/normal/normal-layout.component";
import {StepperOverviewExample} from "./signup/stepper-overview-example";
import { SuperadminComponent } from './layouts/superadmin/superadmin.component';
import { AuthguardService } from './_guards/authguard.service';
import { ConsumeradminComponent } from './layouts/consumeradmin/consumeradmin.component';
import { Authgaurd2Service } from './_guards/authgaurd2.service';
import { Authgaurd3Service } from './_guards/authgaurd3.service';
import { Authgaurd4Service } from './_guards/authgaurd4.service';

import { ProductComponent } from './Deregulated/product/product.component';
import {ProductsComponent} from './regulated/products/products.component'
export const AppRoutes: Routes = [
   
    {path: "", component: HomeComponent},
    // {
    //     path: 'products/:zipCode',
    //     component:ProductsComponent
    // },
 

    {
        path: '',
        component: CustomerLayoutComponent,
        children: [
          {
              path: 'products/:zipCode',
              loadChildren: './regulated/products/products.module#ProductsModule'
          },
         
          {
            path: 'product/:zipCode',
            loadChildren: './Deregulated/product/product.module#ProductModule'
        },

        ]
    },

    {
        path: '',
        component: NormalLayoutComponent,
        children: [
            {
                path: 'guid',
                loadChildren: './guid/guid.module#GuidModule'
            },
            {
                path: 'guids',
                loadChildren: './guids/guids.module#GuidsModule'
            },
          {
              path: 'commercial',
              loadChildren: './commercial/commercial.module#CommercialModule'
          },
          {path: "activateaccount/:query1",
          loadChildren: './activateaccount/activateaccount.module#ActivateAccountModule'},
          {path: "unsubscribe/:query1",
          loadChildren: './unsubscribe/unsubscribe.module#UnsubscribeModule'},
          {
            path: 'privacy',
            loadChildren: './privacy/privacy.module#PrivacyModule'
        },
        {
            path: 'Review/:id',
            loadChildren: './getreview/getreview.module#GetreviewModule'
        },
          {
            path: 'Become-a-partner',
            loadChildren: './becomeapartner/becomeapartner.module#BecomeapartnerModule'
        },
        {
            path: 'Faqs',
            loadChildren: './faqs/faqs.module#FaqsModule'
        },
        {
            path: 'pricing',
            loadChildren: './price/price.module#priceModule'
        },
        {
            path: 'enrollment',
            loadChildren: './webenrollment/webenrollment.module#PrivacyModule'
        },
        {
            path: 'blog',
            loadChildren: './Blogchoicegenie/blog/blog.module#BlogModule'
        },
        // {
        //     path: 'blogss',
        //     loadChildren: './blogss/blogss.module#BecomeapartnerModule'
        // },
       
    
    
        {
            path: 'Why-Choice-Genie',
            loadChildren: './why-chocie-genie/whychoicegenie.module#WhyModule'
        },
        {
            path: 'Choice-and-Saving',
            loadChildren: './choiceandsaving/choiceandsaving.module#ChoiceandsavingModule'
        },
          {
              path: 'residential',
              loadChildren: './residential/residential.module#ResidentialModule'
          },
         
          {
            path: 'usersignup',
            loadChildren: './usersignup/usersignup.module#userSignupModule'
        },
        {
            path: 'signup',
            loadChildren: './signup/signup.module#SignupModule'
        },
          {
              path: 'signup/:id',
              loadChildren: './signup/signup.module#SignupModule'
          },            {
              path: 'signup/:id/:product',
              loadChildren: './signup/signup.module#SignupModule'
          },
        //   {
        //     path: 'register',
        //     loadChildren: './signup1/signup1.module#Signup1Module'
        // },
        //   {
        //     path: "new-product",
        //     loadChildren: './admin/new-product/new-product.module#NewProductModule'
        //   },
           {
            path: 'adminlogin',canActivate: [Authgaurd4Service],
            loadChildren: './pages/superlogin/superlogin.module#LoginModule'
          },
          {
            path: 'login',canActivate: [Authgaurd4Service],
            loadChildren: './pages/login/login.module#LoginModule'
          },
           {
            path: 'userlogin',canActivate: [Authgaurd4Service],
            loadChildren: './pages/userlogin/userlogin.module#LoginModule'
          },
          {
            path: 'register',
            loadChildren: './signup1/signup1.module#Signup1Module'
        },
          
          {
            path: 'Terms-of-use-and-Privacy',
            loadChildren: './terms/terms.module#termsModule'
          },
          {
            path: 'User-guide',
            loadChildren: './userguide/userguide.module#termsModule'
          },
          {
            path: 'features-comparison',
            loadChildren: './features-comparison/features.module#FeatureModule'
        },
        // {
        //     path: 'how-it-works',
        //     loadChildren: './how-it-works/how.module#HowModule'
        // },
        {
            path: 'how-it-works',
            loadChildren: './overview/overview.module#OverViewModule'
        },
          {
            path: 'contactus',
            loadChildren: './contactus/contactus.module#contactusModule'
        },
        {
            path: 'forget_password/:qurey',
            loadChildren: './forget_password/forget_password.module#ForgetpasswordModule'
        },
        // {
        //     path: 'ChangePassword',
        //     loadChildren: './changepassword/changepassword.module#ChangePasswordModule'
        // },
        ]
    },
     
    {path: "what-is-ChoiceGenie", component: AboutComponent},
    // {path: "contact", component: ContactusComponent},
    {path: "stepper", component: StepperOverviewExample},
    // {
    //     path: 'dashboard',
    //     redirectTo: 'dashboard'
    // },
    {
        path: '',
        component: ConsumeradminComponent,
        children: [
            {
                path: 'consumerdashboard',canActivate: [AuthguardService],
                loadChildren: './consumerdashboard/consumerdashboard.module#ConsumerDashboardModule'
            },
            {
                path: 'userprofile',canActivate: [AuthguardService],
                loadChildren: './user-profile/user-profile.module#UserModule'
            },
            {
                path: 'ChangePassword',canActivate: [AuthguardService],
                loadChildren: './changepassword/changepassword.module#ChangePasswordModule'
            },
            {
                path: 'purchase-history',canActivate: [AuthguardService],
                loadChildren: './historypurchase/historypurchase.module#purchaseModule'
            },
            // {
            //     path: 'superviewcontact',
            //     loadChildren: './superviewcontact/superviewcontact.module#superviewcontactModule'
            // },//superviewbecomeModuleng superpartnerModule
            // {
            //     path: 'sviewapartner',
            //     loadChildren: './sviewapartner/sviewapartner.module#partnerModule'
            // }
        ]
    },
    {
        path: '',
        component: SuperadminComponent,
        children: [
            {
                path: 'superdashboard',canActivate: [Authgaurd3Service],
                loadChildren: './ChoiceSuperAdmin/superdashboard/superdashboard.module#SuperDashboardModule'
            },
            {
                path: 'admin/reviews',canActivate: [Authgaurd3Service],
                loadChildren: './ChoiceSuperAdmin/superreviews/superreviews.module#SuperreviewsModule'
            },
            {
                path: 'admin/subscribers',canActivate: [Authgaurd3Service],
                loadChildren: './ChoiceSuperAdmin/supersubscriber/supersubscriber.module#SupersubscriberModule'
            },
            {
                path: 'superadmin/blog',canActivate: [Authgaurd3Service],
                loadChildren: './Blogchoicegenie/adminblog/blog3.module#Blog3Module'
            },//addblogModule
            {
                path: 'addnewblog',canActivate: [Authgaurd3Service],
                loadChildren: './Blogchoicegenie/addblog/addblog.module#addblogModule'
            },
            {
                path: 'supermaindashboard',canActivate: [Authgaurd3Service],
                loadChildren: './ChoiceSuperAdmin/superdashboardmain/superdashboardmain.module#SuperDashboardmainModule'
            },
            {
                path: 'superviewcontact',canActivate: [Authgaurd3Service],
                loadChildren: './ChoiceSuperAdmin/superviewcontact/superviewcontact.module#superviewcontactModule'
            },//superviewbecomeModuleng superpartnerModule
            {
                path: 'sviewapartner',canActivate: [Authgaurd3Service],
                loadChildren: './ChoiceSuperAdmin/sviewapartner/sviewapartner.module#partnerModule'
            },
            {
                path: 'supergetuser',canActivate: [Authgaurd3Service],
                loadChildren: './ChoiceSuperAdmin/supergetusers/supergetusers.module#partnerModule'
            },
            {
                path: 'superipuser',canActivate: [Authgaurd3Service],
                loadChildren: './ChoiceSuperAdmin/superipuser/superipuser.module#SuperDashboardmainModule'
            }
        ]
    },          
    {
        path: '',
        component: AdminLayoutComponent,
      //  canActivate: [AuthguardService], 
        children: [
            {
                path: 'dashboard/:username',canActivate: [AuthguardService],
                loadChildren: './regulated/dashboard/dashboard.module#DashboardModule',
               // canActivate: [AuthguardService]
            },
            {
                path: 'dashboards/:username',canActivate: [AuthguardService],
                loadChildren: './Deregulated/dashboards/dashboards.module#DashboardsModule',
               // canActivate: [AuthguardService]
            },
            {
                path: "new-product", canActivate: [AuthguardService],
                loadChildren: './admin/new-product/new-product.module#NewProductModule'
            },
            {
                path: "new-products", canActivate: [AuthguardService],
                loadChildren: './Deregulated/new-products/new-products.module#NewProductsModule'
            },
            {
                path: "inactive-product", canActivate: [AuthguardService],
                loadChildren: './regulated/inactive-product/inactive-product.module#InactiveProductModule'
            },
            {
                path: "inactive-products", canActivate: [AuthguardService],
                loadChildren: './Deregulated/inactive-products/inactive-products.module#InactiveProductsModule'
            },
            {
                path: 'company-profile', canActivate: [AuthguardService],
                loadChildren: './com-profile/com-profile.module#ComProfileModule'
            },
            {
                path: 'ChangePassword1', canActivate: [AuthguardService],
                loadChildren: './changepassword/changepassword.module#ChangePasswordModule'
            },
            {
                path: '',
                loadChildren: './userpage/user.module#UserModule'
            },
        ]
    }, 
    
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
          {
            path: 'pages',
            loadChildren: './pages/pages.module#PagesModule'
          },
          {
            path: 'residential',
            loadChildren: './residential/residential.module#ResidentialModule'
          },
          {
            path: ':heading',
            loadChildren: './Blogchoicegenie/viewblog/blog1.module#Blog1Module'
            // loadChildren: './pages/login/login.module#LoginModule'
        },
        ]
    }
    
];
