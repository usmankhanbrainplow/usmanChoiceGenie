
import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { Config } from "../Config";
import { Subscription } from 'rxjs/Subscription';
import { CompanyService } from "../company.service";
import { ErrorStateMatcher, MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material";
import { NgForm, FormControl, Validators, FormGroupDirective } from "@angular/forms";
import { Pipe, PipeTransform } from "@angular/core";
// import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
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
        path: '/dashboard',
        title: 'Dashboard',
        type: 'link',
        icontype: 'dashboard'
    },
    
];
@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    routerLink: any;
    constructor(private route: ActivatedRoute, private https: HttpClient, private newService: DeleteService,private serve:EditService,
        private location: Location, private router: Router, private http: Http, private pagerService: PagerService, private homeService: HomeService, public sg: SimpleGlobal, private obj: HomeService, private dialog: MatDialog, private dataa: DataService, private companyService: CompanyService) {

    }
    private authentication=localStorage.getItem('token');

    backClicked() {
        this.location.back();
    }
    pageSizeOptions;
    private allItems: any[];
    pager: any = {};
    home: any = {};
    id: number;
    page: any[];
    public username :any;
    // paged items
    pagedItems: any[];
    private sub: Subscription;
    private zip: any;
    prod_loaded = false;
    prods_loaded = false;
    localVar;
    public products: any;
    rating;
    closeResult: string;
  
    
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
      pro() {
        if(localStorage.getItem('role') == "Not Deregulatedstate Vendor"){
          this.router.navigate(['/new-product']);}
          else if(localStorage.getItem('role') == "Deregulatedstate Vendor"){
              this.router.navigate(['/new-products']);
          }
      }
      moving() {
        if(localStorage.getItem('role') == "Not Deregulatedstate Vendor"){
          this.router.navigate(['/dashboard/' + this.username]);}
          else if(localStorage.getItem('role') == "Deregulatedstate Vendor"){
              this.router.navigate(['/dashboards/' + this.username]);
          }
      }
      profilelink(){
          this.router.navigate(['/company-profile']);
      }
      move(){
        if(localStorage.getItem('role') == "Not Deregulatedstate Vendor"){
            this.router.navigate(['/inactive-product']);}
            else if(localStorage.getItem('role') == "Deregulatedstate Vendor"){
                this.router.navigate(['/inactive-products']);
            }
      }
    fetchProducts() {
       
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        // headers.append('Authorization', 'JWT ' +  this.authentication.toString());
        headers.append('Authorization', 'JWT ' + localStorage.getItem('token'));
        this.username = localStorage.getItem('username')
        
        this.http.get(Config.api +'check_role/'+ this.username.trim() +'/' ,{ headers: headers })
        .subscribe(Res => {
        this.sg['products'] = Res.json()['Results'];
        
        });
        
        } 
    private Sub: Subscription;
    public massage;
    // pro(){
    //     this.router.navigate(['/userprofile/']);
    //     // this.router.navigate(['/company-profile/']);
    //   }
    public user;
    ngOnInit() {
        this.massage = localStorage.getItem('role')
       
        this.user = localStorage.getItem('username')
        this.username = localStorage.getItem('username')
        console.log(this.username)
       this. fetchProducts()
    }
}
