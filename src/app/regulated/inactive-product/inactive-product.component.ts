import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { Config } from "../../Config";
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from "@angular/router";
import { HomeService } from "../../home/home.service";
import { ErrorStateMatcher, MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material";
import { NgForm, FormControl, Validators, FormGroupDirective } from "@angular/forms";
import { SimpleGlobal } from 'ng2-simple-global';
import { DataService } from '../../data.service';
import * as _ from 'underscore';
import { PagerService } from '../../pager.service';
import { Pipe, PipeTransform } from "@angular/core";
// import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Headers, Http, Response } from '@angular/http';
import { EditService } from '../dashboard/edit.service';

// import {Config} from "../Config";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { jsonpCallbackContext } from '@angular/common/http/src/module';
// import { parent } from "../dashboard.class";
import { PageEvent } from '@angular/material';
// import { SSL_OP_NO_TICKET } from 'constants';
import * as moment from 'moment';

import swal from 'sweetalert2';
@Component({
    selector: 'app-inactive-product',
    templateUrl: './inactive-product.component.html',
    styleUrls: ['./inactive-product.component.scss']
})
export class InactiveProductComponent implements OnInit {
    pageSizeOptions;
    today = Date.now();

    private sub: Subscription;
    private zip: any;
    prod_loaded = false;
    prods_loaded = false;
    localVar;
    public products: any;
    rating;
    closeResult: string;
    stars;
    //    setPage;
    constructor(private serve: EditService, private http: Http, private pagerService: PagerService, private homeService: HomeService, private route: ActivatedRoute, public sg: SimpleGlobal, private obj: HomeService, private router: Router, private dialog: MatDialog, private data: DataService) {

    }
    private allItems: any[];
    pager: any = {};
    home: any = {};
    private id: any[];
    page: any[];
    // paged items
    pagedItems: any[];
    public zip_code;
    public username;
    public customer;
    name;
    publishdate;
    Inactivedate;
    rate = '';
    val;
    user;
    status = true;
    catagoryId = '';
    title = '';
    cancelation_fee = '';
    fact_sheet = '';
    phone = '';
    plan_information = '';
    price_rate = '';
    profile_logo = '';
    profileurl = '';
    rating_logo = '';
    sign_up = '';
    terms_of_service = '';
    price_1000_kwh = '';
    price_500_kwh = '';
    price_2000_kwh = '';
    ngOnInit() {
        this.title = localStorage.getItem('title')
        console.log(this.title, 'gggggggggggggggg')
        this.username = localStorage.getItem('username');
        this.zip_code = localStorage.getItem('zip');
        this.data.currentProducts.subscribe(products => this.sg['products'] = products)
        this.data.currentProducts
        this.setPage(this.title, 1)
        console.log(this.title, 1)
    }
    
    btnactiveClick(id, val1, val2, val3, val4, val5, val6, val12, val13, val7, val8, val9, val10, val11) {
        this.catagoryId = id;
        console.log(this.plan_information)
        this.title = val1;
        this.sign_up = val2;
        this.phone = val3;
        this.terms_of_service = val4;
        this.plan_information = val8;
        this.fact_sheet = val5;
        this.cancelation_fee = val6;
        this.price_1000_kwh = val7;
        this.price_500_kwh = val12;
        this.status = true;
        this.price_2000_kwh = val13;

        this.rating_logo = val9;
        this.profile_logo = val10;
        this.profileurl = val11;

        console.log(id, val1, val2, val3, val4, val5, val6, val12, val13, val7, val8, val9, val10, val11)
        console.log('id : ' + this.catagoryId);
    }

    //Event Binding of PopUp Delete Modal

    activeClick(date,updatedtitle, updatedsign_up, updatedphone, updatedterms_of_service, updatedfact_sheet, updatedcancelation_fee, updatedprice500kwh, updatedprice1000kwh, updatedprice2000kwh, updatedplan_information, updatedrating_logo, updatedprofile_logo, updatedprofileurl, upactive) {
        console.log('edit' + date,updatedtitle, updatedsign_up, updatedphone, updatedterms_of_service, updatedfact_sheet, updatedcancelation_fee, updatedprice500kwh, updatedprice1000kwh, updatedprice2000kwh, updatedplan_information, updatedrating_logo, updatedprofile_logo, updatedprofileurl, upactive);
        console.log("TS OBJECT", updatedtitle, updatedsign_up, updatedphone, updatedterms_of_service, updatedfact_sheet, updatedcancelation_fee, updatedprice500kwh, updatedprice1000kwh, updatedprice2000kwh, updatedplan_information, updatedrating_logo, updatedprofile_logo, updatedprofileurl, upactive);
        //Calling Delete Service
        this.serve.activeTodoList(date,this.catagoryId, updatedtitle, updatedsign_up, updatedphone, updatedterms_of_service, updatedfact_sheet, updatedcancelation_fee, updatedprice500kwh, updatedprice1000kwh, updatedprice2000kwh, updatedplan_information, updatedrating_logo, updatedprofile_logo, updatedprofileurl, true).subscribe(data => {
            console.log(data);
            swal({
                type: 'success',
                title: 'Successfully updated',
                showConfirmButton: false,
                timer: 1500
            })
            this.setPage(this.title, 1)

        }, error => {
        });
        //  window.location.reload();

    }
    noresult;
    search(page:number) {
        this.title = localStorage.getItem('title');
        let headers = new Headers();
        // headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + localStorage.getItem('token'));
        console.log('pofile', localStorage.getItem('token'));
        this.http.post(Config.api + 'search_by_vendor/' + this.title +'?page='+page, JSON.stringify({
          "productinactive":moment(this.Inactivedate).format('YYYY/MM/DD'),
          "propublish":moment(this.publishdate).format('YYYY/MM/DD'),
          "utility": this.name
        }), { headers: headers }).subscribe(Res => {
          console.log(Res);
    
          this.sg['products'] = Res.json()['Results'];  
          this.noresult = Res.json()['Total Result'];
          for (let prod of this.sg['products']) {
              prod["plan_information"] = prod["plan_information"].split(',,', 3000);
              prod["price_rate"] = prod["price_rate"].split('..', 3000);

          }
          this.allItems = this.sg['products'];
          this.pager = this.pagerService.getPager(Res.json()['Total Result'], page, 10);
      });
      }
   
    get(rating) {
        this.rate = rating;
    }
   
    //Event Binding of Delete Buttons
    btnEditClick(id, title, sign_up, phone, terms_of_service, fact_sheet, cancelation_fee, price_1000_kwh, price_500_kwh, price_2000_kwh, plan_information, rating_logo, profile_logo, profileurl) {
        this.catagoryId = id;

        console.log(this.plan_information)
        this.title = title;
        this.sign_up = sign_up;
        this.phone = phone;
        this.terms_of_service = terms_of_service;
        this.fact_sheet = fact_sheet;
        this.cancelation_fee = cancelation_fee;
        this.price_1000_kwh = price_1000_kwh;
        this.plan_information = plan_information;
        this.rating_logo = rating_logo;

        this.profile_logo = profile_logo;
        this.profileurl = profileurl;
        this.price_500_kwh = price_500_kwh;
        this.price_2000_kwh = price_2000_kwh;
        console.log(id, title, sign_up, phone, terms_of_service, fact_sheet, cancelation_fee, price_1000_kwh, price_500_kwh, price_2000_kwh, plan_information, rating_logo, profile_logo, profileurl)
        console.log('id : ' + this.catagoryId);
    }

    setPage(title, page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        const Results = {}
        this.title = localStorage.getItem('title');
        this.obj.inactiveproduct(title, page).subscribe(response => {
            this.sg['products'] = response.json()['Results'];
            this.noresult = response.json()['Total Result'];
            console.log(this.noresult)
            for (let prod of this.sg['products']) {
              
                prod["plan_information"] = prod["plan_information"].split(',', 3000);
                prod["price_rate"] = prod["price_rate"].split('..', 3000);

            }

            this.data.changeProducts(this.sg['products']);
            this.prod_loaded = true;
            this.prods_loaded = true;
            this.allItems = this.sg['products'];
           
            this.pager = this.pagerService.getPager(response.json()['Total Result'], page, 10);

        }


        );

    }
}
