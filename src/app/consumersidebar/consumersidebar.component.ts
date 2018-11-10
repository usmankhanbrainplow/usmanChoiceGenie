import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { Config } from "../Config";
import { Subscription } from 'rxjs/Subscription';
import { CompanyService } from "../company.service";
import { MatDialog, MatDialogRef } from "@angular/material";

import { Headers, Http, Response } from '@angular/http';
import { HomeService } from "../home/home.service";
import { PagerService } from '../pager.service';
import { ResponseContentType } from '@angular/http/src/enums';
import { Console } from '@angular/core/src/console';
// import {Config} from "../Config";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { ActivatedRoute, Router } from '@angular/router';
import { SimpleGlobal } from 'ng2-simple-global';
// import { ValueUnwrapper } from '@angular/core/src/change_detection/change_detection_util';
//import { Http } from '@angular/http/src/http';
import { PageEvent } from '@angular/material';
import { DeleteService } from '../regulated/dashboard/delete.service';
import { DataService } from '../data.service';
import { EditService } from '../regulated/dashboard/edit.service';
import { Location } from '@angular/common';


// import { Component, OnInit } from '@angular/core';
// import { Component, OnInit } from '@angular/core';
// import {Http, Headers, Response} from '@angular/http';
// import { PricingService} from './pricing.service';
import swal from 'sweetalert2';
// import { Router} from '@angular/router';
import { TextMaskModule } from 'angular2-text-mask';
// import {DatePipe} from '@angular/common';

import {FormBuilder, FormGroup} from '@angular/forms';
import { HistorypurchaseService } from '../historypurchase/historypurchase.service';
// import { HistorypurchaseService } from './historypurchase.service';
declare const $: any;

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [{
        path: '/consumerdashboard',
        title: 'UserDashboard',
        type: 'link',
        icontype: 'dashboard'
    },
    
];


@Component({
  selector: 'app-consumersidebar',
  templateUrl: './consumersidebar.component.html',
  styleUrls: ['./consumersidebar.component.scss']
})
export class ConsumersidebarComponent implements OnInit {
  public menuItems: any[];
  constructor(private route: ActivatedRoute,  private newService: DeleteService,private serve:EditService,
      private location: Location, private router: Router, private http: Http, private pagerService: PagerService,private _nav:Router,private formBuilder: FormBuilder ,private _serv: HistorypurchaseService,private https: Http,
       private homeService: HomeService, private sg: SimpleGlobal, private obj: HomeService, private dialog: MatDialog, private dataa: DataService, private companyService: CompanyService) {
  }
//   constructor(private _nav:Router,private formBuilder: FormBuilder ,private _serv: HistorypurchaseService,private https: Http){

  backClicked() {
      this.location.back();
  }
  pageSizeOptions;
  private allItems: any[];
  pager: any = {};
  home: any = {};
  id: number;
  page: any[];
  pagedItems: any[];
  private sub: Subscription;
  private zip: any;
  prod_loaded = false;
  prods_loaded = false;
  localVar;
  public products: any;
  rating;
  closeResult: string;
  public user;
  public username;
  private Sub: Subscription;
  record;
  nofound : boolean = false;
  module;
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
 
  logout(){
    localStorage.clear();
    this.router.navigate(['/']);
  }

  mainFunction(){
    this._serv.purchaseHistory().subscribe(
        data => {
            // this.record = data.json();
            // this.records= data[0];
            this.record= data[0].package_type;
            localStorage.setItem('package_type',this.record)
            localStorage.getItem('package_type');
            console.log('Hello there dasds'+localStorage.getItem('package_type'));

        },
        error => {
            // alert(error.status)
            if(error.status = 404){
                this.nofound = true;
            }
            console.log(error)
        })
}
  ngOnInit() {
     this.mainFunction();
     
          this.user = localStorage.getItem('username')
       
      this.menuItems = ROUTES.filter(menuItem => menuItem);
      
                  console.log(this.menuItems);
  }
 
}
