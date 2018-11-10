import { Component, OnInit, AfterViewInit, Inject,OnDestroy} from '@angular/core';
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

// import {Config} from "../Config";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { jsonpCallbackContext } from '@angular/common/http/src/module';
// import { ValueUnwrapper } from '@angular/core/src/change_detection/change_detection_util';
//import { Http } from '@angular/http/src/http';
import { PageEvent } from '@angular/material';
// import { SSL_OP_NO_TICKET } from 'constants';
import {ExcelService} from '../../excel.service';
import swal from 'sweetalert2';
import { error } from 'util';
import { HttpService } from '../../serv/http-service';
declare const $: any;
@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit,OnDestroy {
    pageSizeOptions;
    private sub: Subscription;
    private zip: any;
    prod_loaded = false;
    prods_loaded = false;
    localVar;
    public products: any;
    rating;
    closeResult: string;
    stars;
    record: any = [];
    name;
    index;
    renewablerate;
    renewable;
    com;
    item;
    min_price_500;
    max_price_500;
    min_price_1000;
    max_price_1000;
    min_price_2000;
    max_price_2000;
    constructor(private excelService:ExcelService,private http: Http,private https: HttpService, private pagerService: PagerService, private homeService: HomeService, private route: ActivatedRoute, public sg: SimpleGlobal, private obj: HomeService, private router: Router, private dialog: MatDialog, private data: DataService) {

    }

    exportAsXLSX(){
        this.excelService.exportAsExcelFile( this.deproduct, 'ChoiceGenie Vendor Detail');
     }
    private allItems: any[];
    pager: any = {};
    home: any = {};
    private id: any[];
    page: any[];
    pagedItems: any[];
    public zip_code;
    public username;
    public customer;
    i;
    city;
    country;
    nottime;
    price;
    min;
    max;
    months1;
    months2;
    months3;
    months4;
    months5;
    months6;
    months7;
    planmin;
    fixed;
    vari;
    RFP;
    market;
    prepaid;
    notprepaid;
    time;
    energy;
    className;
    sort;
    checked4;
    checked9;
    checked8;
    checked10;
    checkedpre;
    checked12;
    checked11;
    checked14;
    checked15;
    checked16;
    checkedtime;
    pricerate;
    checked7;
    checked13;
    checkedall;
    comtitle = '';
    servicearea = "";
    cancelation = "";
    val;
    user;
    rev: any = [];
    rate = '';
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
    price_500_kwh = '';
    price_2000_kwh = '';
    items;
    comp = '';
    state;
    zipcodeexist;
    deproduct;
    noresult;
    Items;
    myID;
    status:any=true;
    slideConfig = {
      "slidesToShow": 4,
      "slidesToScroll": 4,
      autoplay:'true',
      prevArrow: '<button class="leftRs slick-arrow leftArrow btn-slider btn-slider-left" style="display: block;"><i class="fa fa-chevron-left"></i></button>',
      nextArrow: '<button class="rightRs slick-arrow leftArrow btn-slider btn-slider-right" style="display: block;"><i class="fa fa-chevron-right"></i></button>',
      responsive: [
        {
          breakpoint: 778,
          settings: {
            arrows: true,
            // centerMode: true,
            slidesToShow: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: true,
            // centerMode: true,
            slidesToShow: 1
          }
        }
      ]
    };
    ngOnInit() {
        this.myID = document.getElementById("myID");
        this.item= "20";
        var myScrollFunc = function() {
          var y = window.scrollY;
          if (y >= 800) {
            this.myID.className = "bottomMenu show"
          }
        else {
            this.myID.className = "bottomMenu hide"
          }
        };

        window.addEventListener("scroll", myScrollFunc);

      this.name=localStorage.getItem('name');
        this.username = localStorage.getItem('username');
        this.zip_code = localStorage.getItem('zip');
        this.customer = localStorage.getItem('username')
        this.months1 = localStorage.getItem('months1')
        this.months2 = localStorage.getItem('months2')
        this.months3 = localStorage.getItem('months3')

        this.months5 = localStorage.getItem('months5')
        this.months6 = localStorage.getItem('months6')

        const Results = {};
        this.val = "methodName($event[0])"
this.featuredplan();
        this.profile()
        this.companytitle()
this.zipwithcity();
        this.data.currentProducts.subscribe(products => this.sg['products'] = products)
        this.data.currentProducts

        this.sub = this.route.params.subscribe(params => {
            this.zip = +params['zipCode'];
            this.setPage(1);


        });


    }

    ngOnDestroy() {
        localStorage.removeItem('months1');
        localStorage.removeItem('months2');
        localStorage.removeItem('months3');
        localStorage.removeItem('months4');
        localStorage.removeItem('months5');
        localStorage.removeItem('months6');
        localStorage.removeItem('months7');
        localStorage.removeItem('name');
      }
  w3_open() {
    document.getElementById("mySidebar").style.display = "block";
  }
 w3_close() {
    document.getElementById("mySidebar").style.display = "none";
  }
    pop_close() {
        // document.getElementById("myID").style.display = "none";
        this.status=false;
      }
      print(){
        window.print();
    }
    
    featuredplan() {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json')
        this.https.get(Config.api + 'topproducts_deregulated/', { headers: headers })

            .subscribe(Res => {

                this.sg['plan'] = Res.json()['Results'];
                // this.data.changeProducts(this.sg['plan']);
                this.Items = this.sg['plan'];


            });
    }
    zipwithcity() {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json')
        this.http.get(Config.api + 'zipcodewith_country_city/'+ this.zip_code, { headers: headers })

            .subscribe(Res => {
                this.city= Res.json();
                console.log(this.city);

                // this.city = Res.json()[0].city;
                // this.country = Res.json()[0].country;
                // this.data.changeProducts(this.sg['plan']);
                this.Items = this.sg['plan'];


            });
    }
    // zipwithcity() {

    //     let headers = new Headers();
    //     headers.append('Content-Type', 'application/json')
    //     this.http.get(Config.api + 'zipcodewith_country_city/'+ this.zip_code, { headers: headers })

    //         .subscribe(Res => {

    //             this.city = Res.json()[0].city;
    //             this.country = Res.json()[0].country;
    //             // this.data.changeProducts(this.sg['plan']);
    //             this.Items = this.sg['plan'];


    //         });
    // }
    submit(id, title) {
        console.log(title.trim())
        this.router.navigate(['/Review/' + id]);
        localStorage.setItem('company', title);
    }

    btnratingClick(id, title, profileurl, profile_logo, servicearea) {
        this.id = id;
        this.comtitle = title;
        this.profileurl = profileurl;
        this.profile_logo = profile_logo;
        this.servicearea = servicearea;
        console.log('id : ' + this.id, this.title);
    }

    btnderagulateClick(id, title, sign_up, phone, terms_of_service, fact_sheet, cancelation_fee, price_rate, plan_information, rating_logo, profile_logo, profileurl) {
        this.catagoryId = id;
         console.log(this.plan_information)
        this.comtitle = title;
        this.sign_up = sign_up;
        this.phone = phone;
        this.terms_of_service = terms_of_service;
        this.fact_sheet = fact_sheet;
        this.cancelation = cancelation_fee;
        this.price_rate = price_rate
        this.plan_information = plan_information;
        this.rating_logo = rating_logo;

        this.profile_logo = profile_logo;
        this.profileurl = profileurl;
        console.log(id, title, sign_up, phone, terms_of_service, fact_sheet, cancelation_fee, plan_information, rating_logo, profile_logo, profileurl)
        console.log('id : ' + this.catagoryId);
    }
    checked_login() {
        if (localStorage.getItem('username')) {
            let local = localStorage.getItem('username');
            return true;
        }

        else {
            return false;
        }
    }
    profile() {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.get(Config.api + 'user_profile/' + this.customer + '/', { headers: headers })

            .subscribe(Res => {
                this.data = Res.json();
                console.log(this.data);
                this.user=this.username;
                // this.user = this.data['user'].id
            });

    }

    get(rating) {
        this.rate = rating;
    }
    reviews(rate, comt, id) {
        if (localStorage.getItem('username')) {
            console.log(id)
            console.log(this.username)
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            this.http.post(Config.api + 'reviews/' + this.comtitle , JSON.stringify({

                "rate": this.rate,
                "company_name": this.comtitle,
                "comment": comt,
                "user": this.username,
                "servicearea": this.servicearea,
                // "profile": this.profile_logo
            }

            ), { headers: headers })

                .subscribe(Res => {
                    console.log(Res)
                    swal({
                        type: 'success',
                        title: 'Rewiew Added Successfully',
                        showConfirmButton: false,
                        timer: 1500

                    })

                })

        }
        else {
            swal(
                'Invalid',
                'User must login First!',
                'error'
            )
            this.router.navigate(['/userlogin/']);
        }
    }
    companytitle() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.https.get(Config.api + 'deregulated_companies/', { headers: headers })

            .subscribe(Res => {

                this.title = Res.json();

                this.title = this.title;
                console.log(this.title)
            });

    }
    btnEditClick(id, title, sign_up, phone, terms_of_service, fact_sheet, cancelation_fee, price_rate, plan_information, rating_logo, profile_logo, profileurl) {
        this.catagoryId = id;

        console.log(this.plan_information)
        this.title = title;
        this.sign_up = sign_up;
        this.phone = phone;
        this.terms_of_service = terms_of_service;
        this.fact_sheet = fact_sheet;
        this.cancelation_fee = cancelation_fee;
        this.price_rate = price_rate
        this.plan_information = plan_information;
        this.rating_logo = rating_logo;

        this.profile_logo = profile_logo;
        this.profileurl = profileurl;

        console.log(id, title, sign_up, phone, terms_of_service, fact_sheet, cancelation_fee, plan_information, rating_logo, profile_logo, profileurl)
        console.log('id : ' + this.catagoryId);
    }

    checked(event, val, i) {
        if (event.target.checked == true) {
            console.log(event.target.checked)
            this.record.push(val)
        }
        else if (event.target.checked == false) {
            console.log(event.target.checked)
            this.record.pop(val)
        }
        console.log(this.record)
    }
    Comapreproduct(page: number) {

        console.log(this.record.toString())
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post(Config.api + 'deregulated_compareproducts/', JSON.stringify({

            "productid": this.record.toString()
        }
        ), { headers: headers })
            .subscribe(Res => {
                console.log(Res)

                this.deproduct = Res.json()['Results'];
                this.pager = this.pagerService.getPager(Res.json()['Total Result'], page, 10);

            });
    }
    hits(event) {
        if (event.target.checked == true) {

            let headers = new HttpHeaders();
            headers.append('Content-Type', 'text/html');

            this.http.get(Config.api + 'postcounts_deregulated/' + this.record.toString() + '/')
                .subscribe(data => {
                    console.log(data);

                });
        }
    }

    Checkzipcode() {
        this.zipwithcity();
        delete this.months1;
        delete this.months2;
        delete this.months3;
        delete this.months4;
        delete this.months5;
        delete this.months6;
        delete this.months7;
        delete this.name;
        localStorage.removeItem('months1');
        localStorage.removeItem('months2');
        localStorage.removeItem('months3');
        localStorage.removeItem('months4');
        localStorage.removeItem('months5');
        localStorage.removeItem('months6');
        localStorage.removeItem('months7');
        localStorage.removeItem('name');
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.get(Config.api + 'zipcodecheck/' + this.zip_code, { headers: headers })
            .subscribe(data => {
                console.log(data);
                this.state = data.json()['state'];
                console.log(this.state);
                localStorage.setItem('state', this.state);
                this.zipcodeexist = data.json()['message']
                if (this.zipcodeexist == "InValid Zipcode") {
                    swal({
                        text: "InValid Zipcode",
                        title: "Choice Genie",
                        type: "error",
                        showConfirmButton: false,
                        timer: 1200,
                        confirmButtonText: "OK",

                    })
                }
                else if (this.state == "deregulatedstate") {
                    this.router.navigate(['/product/' + this.zip_code]);
                    localStorage.setItem('zip', this.zip_code);
                }
                else if (this.state == "notderegulatedstate") {
                    this.router.navigate(['/products/' + this.zip_code]);
                    localStorage.setItem('zip', this.zip_code);
                }

            });
    }

//////////////////Genaric Filters////////////////////////
    checked1(event, i) {
        if (event.target.checked == true) {
            console.log(event.target.checked)
            this.months1 = "36 Months";
            this.setPage(1);
        }
        else if (event.target.checked == false) {
            console.log(event.target.checked)
            delete this.months1;
            this.setPage(1);
        }
        console.log(this.months1)
    }
checkprice(min, max) {
        if (min && max) {
            this.min = min;
            this.max = max;

            this.setPage(1);
        }
        else {
            localStorage.removeItem('min');
            localStorage.removeItem('max');

            delete this.min;
            delete this.max;

            this.setPage(1);
        }

        console.log()
    }
    checked2(event, i) {
        if (event.target.checked == true) {
            console.log(event.target.checked)
            this.months2 = "24 Months";
            this.setPage(1);
        }
        else if (event.target.checked == false) {
            console.log(event.target.checked)
            delete this.months2;
            this.setPage(1);
        }
        console.log(this.months2)
    }
    checked3(event, i) {
        if (event.target.checked == true) {
            console.log(event.target.checked)
            this.months3 = "18 Months";
            this.setPage(1);
        }
        else if (event.target.checked == false) {
            console.log(event.target.checked)
            delete this.months3;
            this.setPage(1);
        }
        console.log(this.months3)
    }

    checked5(event, i) {
        if (event.target.checked == true) {
            console.log(event.target.checked)
            this.months5 = "12 Months";
            this.setPage(1);
        }
        else if (event.target.checked == false) {
            console.log(event.target.checked)
            delete this.months5;
            this.setPage(1);
        }
        console.log(this.months5)
    }
    checked6(event, i) {
        if (event.target.checked == true) {
            console.log(event.target.checked)
            this.months6 = "6 Months";
            this.setPage(1);
        }
        else if (event.target.checked == false) {
            console.log(event.target.checked)
            delete this.months6;
            this.setPage(1);
        }
        console.log(this.months6)
    }
    checked18(event, i, item) {
        if (item) {
            console.log(item);
            this.item = item;
            this.setPage(1);
        }
        else {
            console.log()
            this.item = "20";

            console.log(this.item)
        }
    }
    checked20(event, i) {
        this.sort = "true";
        this.setPage(1);
    }
    checked21(event, i) {
        this.sort = "true";
        this.setPage(1);
    }
    checked22(event, i) {
        this.sort = "true";
        this.setPage(1);
    }
    checked17(event, i, name) {
        if (name) {
            console.log(name);
            this.name = name;
            console.log(this.name)
            this.setPage(1);
        }
        else {
            console.log()
            delete this.name;
        }
        console.log(this.name)
    }
    move(name){

        this.name=name;

         this.setPage(1);
       }
    setPage(page: number) {
        if (this.months1 == null) {
            delete this.months1;
        }
        if (this.months2 == null) {
            delete this.months2;
        }
        if (this.months3 == null) {
            delete this.months3;
        }
        if (this.months4 == null) {
            delete this.months4;
        }
        if (this.months5 == null) {
            delete this.months5;
        }
        if (this.months6 == null) {
            delete this.months6;
        }
        if (this.months7 == null) {
            delete this.months7;
        } if (this.name == null) {
            delete this.name;
        }
        //alert( this.noresult);
        const Results = {}
        if (this.months1 == "36 Months" || this.months2 == "24 Months" || this.months3 == "18 Months" || this.months5 == "12 Months" || this.months6 == "6 Months" || this.sort || this.name || this.item || this.min || this.max) {
      this.obj.deregulatedfilter(page, this.zip_code, this.months1, this.months2, this.months3, this.months5, this.months6, this.item, this.sort, this.name,this.min,this.max).subscribe(response => {

                this.deproduct = response['Results'];
                this.noresult = response['Total Result'];
               this.RFP = response['Total Result'];
                console.log(this.RFP,'usman');

                this.prod_loaded = true;
                this.pager = this.pagerService.getPager(response['Total Result'], page, this.item);

            });
        }
        else {
            this.obj.searchProducts1(this.zip_code, page).subscribe(response => {
                this.deproduct = response['Results'];
                this.noresult = response['Total Result'];

                this.pager = this.pagerService.getPager(response['Total Result'], page, 10);

            });

        }
    }
}
