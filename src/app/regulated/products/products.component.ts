// IMPORTANT: this is a plugin which requires jQuery for initialisation and data manipulation
import { Component, OnInit, AfterViewInit, Inject, OnDestroy } from '@angular/core';
import { Config } from "../../Config";
import { Subscription } from 'rxjs/Subscription';
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
import { ActivatedRoute, Router, RouterModule } from "@angular/router";

// import {Config} from "../Config";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { jsonpCallbackContext } from '@angular/common/http/src/module';
// import { ValueUnwrapper } from '@angular/core/src/change_detection/change_detection_util';
//import { Http } from '@angular/http/src/http';
import { PageEvent } from '@angular/material';
// import { SSL_OP_NO_TICKET } from 'constants';

import swal from 'sweetalert2';
import { error } from 'util';
import { delay } from 'rxjs/operator/delay';
import { HttpService } from '../../serv/http-service';
import { ExcelService } from '../../excel.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';



declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare const $: any;

// declare var $;

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }


}

@Component({
    selector: 'app-data-table-cmp',
    templateUrl: 'products.component.html',
    styleUrls: ['products.component.css'],
    // providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]

})

export class ProductsComponent implements OnInit, AfterViewInit, OnDestroy {
    [x: string]: any;
    today = Date.now();
    value1 = "500";
    date;
    deragulate;
    energy;
    i;
    name;
    pager: any = {};
    pageSizeOptions;
    public dataTable: DataTable;
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
    market;
    zipcodeexist;
    keyPress;

    //    setPage;
    constructor(private excelService: ExcelService, private http: Http, private pagerService: PagerService, private homeService: HomeService, private route: ActivatedRoute, public sg: SimpleGlobal, private obj: HomeService, public router: Router, private dialog: MatDialog, private data: DataService, private https: HttpService) {

    }
    ngOnDestroy() {
        localStorage.removeItem('min');
        localStorage.removeItem('max');
        localStorage.removeItem('price');
        // localStorage.removeItem('names');
        localStorage.removeItem('market');
        localStorage.removeItem('fixed');
        localStorage.removeItem('vari');
        localStorage.removeItem('months1');
        localStorage.removeItem('months2');
        localStorage.removeItem('months3');
        localStorage.removeItem('months4');
        localStorage.removeItem('months5');
        localStorage.removeItem('months6');
        localStorage.removeItem('months7');
        localStorage.removeItem('name');
    }
    slideConfig = {
        "slidesToShow": 5,
        "slidesToScroll": 1,
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
    // array of all items to be paged
    // pager object
    private allItems: any[];
    city;
    country;
    home: any = {};
    private id: any[];
    page: any[];
    // paged items
    pagedItems: any[];
    public zip_code;
    public username;
    public customer;
    rev: any = [];
    user;
    val;
    state;
    comtitle;
    rate = '';
    title = '';
    catagoryId = '';
    cancelation = '';
    fact_sheet = '';
    phone = '';
    plan_information = '';
    price_rate = '';
    profile_logo = '';
    profileurl = '';
    rating_logo = '';
    sign_up = '';
    className;
    terms_of_service = '';
    price_1000_kwh = '';
    price_500_kwh = '';
    price_2000_kwh = '';
    servicearea = "";
    items;
    Items: any = [];
    comp = '';

    months1;
    months2;
    months3;
    months4;
    months5;
    months7;
    months6;
    fixed ="Fixed Rate";
    vari;
    index;
    prepaidall = "both";
    notprepaid;
    prepaid;
    planmin = "NULL";
    pkgsub = false;
    showallplanPB;
    allplan;
    showallplan: any[];
    time;
    timeall = "both";
    nottime;
    renewablerate;
    renewable;
    com;
    item;
    price ;
    min;
    max;
    min_price_500;
    max_price_500;
    min_price_1000;
    max_price_1000;
    min_price_2000;
    max_price_2000;
    sort;
    product;
    noresult;
    zipdet;
    modal: any = [];
    myID;
    close;
    status: any = true;
    slider;
    model: any = {};

    ngOnInit() {

        this.item = "20";
        this.myID = document.getElementById("myID");
        // this.checked8(event, i);
        
        var myScrollFunc = function () {
            var y = window.scrollY;
            if (y >= 500) {
                this.myID.className = "bottomMenu show"
            }
            else {
                this.myID.className = "bottomMenu hide"
            }
        };

        window.addEventListener("scroll", myScrollFunc);
        $('.slick-date').slick({
            slidesToShow: 2,
            variableWidth: true,
            responsive: [
                {
                    breakpoint: 400,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });


        const mainSearch = $('.main-search');
        const formSearch = $('.form-search');

        $('.search-bg').click(function () {
            $(mainSearch).addClass('active');
            $('body').addClass('noScroll');
            $(formSearch).addClass('flipInX');

            setTimeout(function () {
                $('.form-search .mat-input-element').focus();
            }, 370);

        });

        $('#closeSearch').click(function () {
            $(mainSearch).removeClass('active');
            $('body').removeClass('noScroll');
            $(formSearch).removeClass('flipInX');
        });
        // $("#number").on("click", function () {
        //     if ($(".number:checked")) {
        //         $('#btn').prop('disabled', false);
        //     }
        //     else {
        //         $('#btn').prop('disabled', true);
        //     }
        // });
        window.onscroll=function(){scrollFunction()};function scrollFunction()
        {if(document.body.scrollTop>20||document.documentElement.scrollTop>20)
            {document.getElementById("myBtn").style.display="block";}else
            {document.getElementById("myBtn").style.display="none";}}
            function topFunction(){$('html, body').animate({scrollTop:0},800);}
            var clicks=0;function changeColorFav(id){++clicks;if(clicks%2)
                {id.style.color='red';}else{id.style.color='gray';}}

        $(document).ready(function(){
            // $("#mySelect").change(function(){
            //     alert($(this).val());
            // });
          // new WOW().init();
        });
        
        
        console.log(this.today = Date.now())
        this.state = localStorage.getItem('state')
        this.name = localStorage.getItem('name')
        this.price = localStorage.getItem('price')
        this.fixed = localStorage.getItem('fixed')
        this.vari = localStorage.getItem('vari')
        this.market = localStorage.getItem('market')
        this.min = localStorage.getItem('min')
        this.max = localStorage.getItem('max')
        this.months1 = localStorage.getItem('months1')
        this.months2 = localStorage.getItem('months2')
        this.months3 = localStorage.getItem('months3')
        this.months4 = localStorage.getItem('months4')
        this.months5 = localStorage.getItem('months5')
        this.months6 = localStorage.getItem('months6')
        this.months7 = localStorage.getItem('months7')
        console.log(this.state)
        this.username = localStorage.getItem('username');
        this.zip_code = localStorage.getItem('zip');
        this.customer = localStorage.getItem('custum')
        console.log(localStorage.getItem('zip'), 'kkkkkkkkkk')
        const Results = {};
        this.val = "methodName($event[0])"
        this.companytitle();
        this.zipwithcity();


        // this.featuredplan();

    }

    exportAsXLSX() {
        this.excelService.exportAsExcelFile(this.product, 'ChoiceGenie Vendor Detail');
    }
    print(){
        window.print();
    }
    printComponent(cmpName) {
        let printContents = document.getElementById(cmpName).innerHTML;
        let originalContents = document.body.innerHTML;
   
        document.body.innerHTML = printContents;
   
        window.print();
   
        document.body.innerHTML = originalContents;
   }
    w3_open() {
        document.getElementById("mySidebar").style.display = "block";
    }
    w3_close() {
        document.getElementById("mySidebar").style.display = "none";
    }
    pop_close() {


        this.status = false;

    }

    

    btnDeleteClick(id, title, profileurl, profile_logo, servicearea) {
        if (localStorage.getItem('username')) {
            let local = localStorage.getItem('username');
        this.id = id;
        this.comtitle = title.trim();
        this.profileurl = profileurl;
        this.profile_logo = profile_logo;
        this.servicearea = servicearea;
        console.log(this.servicearea);
        // alert(this.servicearea)
        console.log('id : ' + this.id, this.title);
        return true;
        }
        else {
            swal(
                'User must login First!',
                '',
                'error',
              )
              let url = 'userlogin';
              this.router.navigate([url]);
               
            // swal(
            //     'Invalid',
            //     'User must login First!',
            //     'error',
            // )
            // this.router.navigate(['/userlogin/']);
            // return false;
            
        }
    }

    checked_login() {
        if (localStorage.getItem('username')) {
            let local = localStorage.getItem('username');
            return true;
        }
        else {
            // swal(
            //     'Invalid',
            //     'User must login First!',
            //     'error'
            // )
            // this.router.navigate(['/userlogin']);
            return false;
            
        }
    }
    usman;
    zipwithcity() {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json')
        this.http.get(Config.api + 'zipcodewith_country_city/' + this.zip_code, { headers: headers })

            .subscribe(Res => {
                this.city = Res.json();

                // this.usman=Res.json()[0].zipcode;
                console.log(this.city);

                // this.city = Res.json()[0].city;
                // this.country = Res.json()[0].country;
                // this.data.changeProducts(this.sg['plan']);
                this.Items = this.sg['plan'];


            });
    }
    profile() {
        let headers = new Headers();
        // headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + localStorage.getItem('token'));
        console.log("userupdate", localStorage.getItem('token'));
        this.http.get(Config.api + 'user_profile/' + this.username + '/', { headers: headers })

            .subscribe(Res => {
                this.data = Res.json();
                console.log(this.data);
                // this.user = this.data['Name'];
                this.user = this.username;
                // this.user=localStorage.getItem('username');
                console.log(this.user)
            });
    }



    submit(id, title) {
        console.log(title.trim())
        this.router.navigate(['/Review/' + id]);
        //userprofile
        localStorage.setItem('company', title.trim());
    }

    get(rating) {
        this.rate = rating;

    }
    reviews(rate, comt, id) {


        console.log(this.servicearea)

        console.log(this.title);
        if (localStorage.getItem('username')) {
            console.log(localStorage.getItem('username'))
            console.log(id)
            // console.log(localStorage.getItem('Name'))
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
            this.http.post(Config.api + 'reviews/' + this.comtitle, JSON.stringify({
                // {
                "company_name": this.comtitle,
                "servicearea": this.servicearea,
                "rate": this.rate,
                "comment": comt,
                "user": this.username,
                // "user": localStorage.getItem('username') 
                // }

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
            this.router.navigate(['/userlogin']);
        }
    }

    //Event Binding of Delete Buttons

    btnEditClick(id, title, sign_up, phone, terms_of_service, fact_sheet, cancelation_fee, price_1000_kwh, price_500_kwh, price_2000_kwh, plan_information, rating_logo, profile_logo, profileurl, specialterms) {
        this.catagoryId = id;

        console.log(this.plan_information)
        this.comtitle = title;
        this.sign_up = sign_up;
        this.phone = phone;
        this.terms_of_service = terms_of_service;
        this.fact_sheet = fact_sheet;
        this.cancelation = cancelation_fee;
        this.price_1000_kwh = price_1000_kwh;
        this.plan_information = plan_information;
        this.rating_logo = rating_logo;
        this.specialterms = specialterms;

        this.profile_logo = profile_logo;
        this.profileurl = profileurl;
        this.price_500_kwh = price_500_kwh;
        this.price_2000_kwh = price_2000_kwh;
        console.log(id, title, sign_up, phone, terms_of_service, fact_sheet, cancelation_fee, price_1000_kwh, price_500_kwh, price_2000_kwh, plan_information, rating_logo, profile_logo, profileurl, specialterms)
        console.log('id : ' + this.catagoryId);
    }

    featuredplan() {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json')
        this.http.get(Config.api + 'topproducts/', { headers: headers })

            .subscribe(Res => {

                this.sg['plan'] = Res.json()['Results'];

                this.Items = this.sg['plan'];
                for (let prod of this.sg['plan']) {
                    console.log(prod["plan_information"])
                    console.log(prod["price_rate"])
                    prod["plan_information"] = prod["plan_information"].split(',,', 3000);
                    prod["price_rate"] = prod["price_rate"].split('..', 3000);
                }

            });
    }



    hits(event) {
        if (event.target.checked == true) {
            let headers = new HttpHeaders();
            headers.append('Content-Type', 'text/html');
            this.http.get(Config.api + 'postcounts/' + this.record.toString() + '/')
                .subscribe(data => {
                    console.log(data);
                });
        }
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
        this.http.post(Config.api + 'comparisonproducts/', JSON.stringify({
            "productid": this.record.toString()
        }
        ), { headers: headers })
            .subscribe(response => {
                console.log(response)
                this.product = response.json()['Results'];
                for (let prod of this.product) {
                    prod["plan_information"] = prod["plan_information"].split(',,', 3000);
                    prod["price_rate"] = prod["price_rate"].split('..', 3000);
                }
                this.pager = this.pagerService.getPager(response.json()['Total Result'], page, 10);
            }, error => {
            })
    }



    ngAfterViewInit() {
        this.profile();
        this.featuredplan();

        this.data.currentProducts.subscribe(products => this.sg['products'] = products)
        this.data.currentProducts
        this.sub = this.route.params.subscribe(params => {
            this.zip = +params['zipCode'];
            this.setPage(1);
        });

        // $('#datatables').DataTable({
        //     'pagingType': 'full_numbers',
        //     'lengthMenu': [[10, 25, 50, -1], [10, 25, 50, 'All']],
        //     responsive: true,
        //     language: {
        //         search: '_INPUT_',
        //         searchPlaceholder: 'Search records',
        //     }
        // });

        // const table = $('#datatables').DataTable();

        // // Edit record
        // table.on('click', '.edit', function () {
        //     const $tr = $(this).closest('tr');

        //     const data = table.row($tr).data();
        //     alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.');
        // });

        // // Delete a record
        // table.on('click', '.remove', function (e: any) {
        //     const $tr = $(this).closest('tr');
        //     table.row($tr).remove().draw();
        //     e.preventDefault();
        // });

        // // Like record
        // table.on('click', '.like', function () {
        //     alert('You clicked on Like button');
        // });
    }
    companytitle() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.https.get(Config.api + 'companytitle/', { headers: headers })

            .subscribe(Res => {

                this.title = Res.json();

                this.title = this.title;
                console.log(this.title)
            });

    }
    logo5;
    logo4;
    logo3;
    logo2;
    logo1;
    star5(event, i) {
        if (event.target.checked == true) {
            this.logo5 = "StarRating5.png";
            this.setPage(1);
        }
        else if (event.target.checked == false) {
            console.log(event.target.checked)
            delete this.logo5;
            this.setPage(1);
        }
        console.log(this.logo5)
    }
    star4(event, i) {
        if (event.target.checked == true) {
            this.logo4 = "StarRating4.png";
            this.setPage(1);
        }
        else if (event.target.checked == false) {
            console.log(event.target.checked)
            delete this.logo4;
            this.setPage(1);
        }
        console.log(this.logo4)
    }
    star3(event, i) {
        if (event.target.checked == true) {
            this.logo3 = "StarRating3.png";
            this.setPage(1);
        }
        else if (event.target.checked == false) {
            console.log(event.target.checked)
            delete this.logo3;
            this.setPage(1);
        }
        console.log(this.logo3)
    }
    star2(event, i) {
        if (event.target.checked == true) {
            this.logo2 = "StarRating2.png";
            this.setPage(1);
        }
        else if (event.target.checked == false) {
            console.log(event.target.checked)
            delete this.logo2;
            this.setPage(1);
        }
        console.log(this.logo2)
    }
    star1(event, i) {
        if (event.target.checked == true) {
            this.logo1 = "StarRating1.png";
            this.setPage(1);
        }
        else if (event.target.checked == false) {
            console.log(event.target.checked)
            delete this.logo1;
            this.setPage(1);
        }
        console.log(this.logo1)
    }
    checked1(event, i) {
        if (event.target.checked == true) {
            console.log(event.target.checked)
            this.months1 = "36 Months";
            this.setPage(1);
        }
        else if (event.target.checked == false) {
            console.log(event.target.checked)
            delete this.months1;
            localStorage.removeItem('months1');
            this.setPage(1);
        }
        console.log(this.months1)
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
            localStorage.removeItem('months2');

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
            localStorage.removeItem('months3');
            this.setPage(1);
        }
        console.log(this.months3)
    }
    checked4(event, i) {
        if (event.target.checked == true) {
            console.log(event.target.checked)
            this.months4 = "14 Months";
            this.setPage(1);
        }
        else if (event.target.checked == false) {
            console.log(event.target.checked)
            delete this.months4;
            localStorage.removeItem('months4');
            this.setPage(1);
        }
        console.log(this.months4)
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
            localStorage.removeItem('months5');
            this.setPage(1);
        }
        console.log(this.months5)
    }
    checked6(event, i) {
        if (event.target.checked == true) {
            console.log(event.target.checked)
            //  alert(this.months6)
            this.months6 = "6 Months";
            this.setPage(1);
        }
        else if (event.target.checked == false) {
            console.log(event.target.checked)
            delete this.months6;
            localStorage.removeItem('months6');
            this.setPage(1);
        }
        console.log(this.months6)
    }
    checked7(event, i) {
        if (event.target.checked == true) {
            console.log(event.target.checked)
            this.months7 = "5 Months";
            this.setPage(1);
        }
        else if (event.target.checked == false) {
            console.log(event.target.checked)
            delete this.months7;
            localStorage.removeItem('months7');
            this.setPage(1);
        }
        console.log(this.months7)
    }
    checked8(event, i) {
        if (event.target.checked == true) {
            console.log(event.target.checked)
            this.fixed = "Fixed Rate";
            this.setPage(1);
            // alert(this.fixed)
            console.log(this.fixed,"fixed rate");
        }
        else if (event.target.checked == false) {
            console.log(event.target.checked)
            delete this.fixed;
            localStorage.removeItem('fixed');
            this.setPage(1);
        }
        console.log(this.fixed)
    }
    checked9(event, i) {
        if (event.target.checked == true) {
            console.log(event.target.checked)
            this.vari = "Variable (Changing Rate)";
            this.setPage(1);
        }
        else if (event.target.checked == false) {
            console.log(event.target.checked)
            delete this.vari;
            localStorage.removeItem('vari');
            this.setPage(1);
        }
        console.log(this.vari)
    }
    checked10(event, i) {
        if (event.target.checked == true) {
            console.log(event.target.checked, this.market)
            this.market = "Indexed (Market Rate)";
            this.setPage(1);
        }
        else if (event.target.checked == false) {
            console.log(event.target.checked)
            delete this.market;
            localStorage.removeItem('market');
            this.setPage(1);
        }
        console.log(this.market)
    }

    checked11(event,i) {
        // delete this.prepaid ;
        delete this.prepaidall ;
        if (event.target.checked == true) {
            console.log(event.target.checked)
            this.notprepaid = "noprepaid";
            delete this.prepaid ;
            
           
            this.setPage(1);

            console.log(this.notprepaid);
        }

        console.log(this.notprepaid)
    }
    checked12(event, i) {
        delete this.prepaidall;
        if (event.target.checked == true) {
            console.log(event.target.checked ==true);     
            this.prepaid = "Prepaid";
            // alert(this.prepaid);
            delete this.notprepaid;
            // delete this.prepaidall;
            this.setPage(1);
        }

        console.log(this.prepaid)
    }
    checkedpre(event, i) {
        if (event.target.checked == true) {
            console.log(event.target.checked);
            this.prepaidall = "both";
            delete this.notprepaid ;
            delete this.prepaid ;
            this.setPage(1);
        }

        console.log(this.prepaidall)
    }

    checked13(event, i) {
        // delete this.showallplanPB;;
        if (event.target.checked == true) {
            console.log(event.target.checked);
            this.planmin = "NULL";
            delete this.showallplanPB;
            this.setPage(1);

        }

        console.log(this.planmin)
    }

    checkedall(event, i) {
        delete this.planmin;
        if (event.target.checked == true) {
            // console.log(event.target.checked == true);
            // delete this.planmin;
            // this.planmin = event.target.checked == fail; 
            // this.planmin = null;
            this.showallplanPB = "both";
            
            //  this.planmin = this.fixed;
            this.setPage(1);
        }
        console.log(this.showallplanPB, "checkallremove ni howa ", this.planmin)
    }
    checked14(event, i) {
        delete this.timeall;
        delete this.nottime;
        if (event.target.checked == true) {
            console.log(event.target.checked);
           
            this.time = "Time Of Use";
            delete this.timeall;
            // delete this.time;
            this.setPage(1);
        }

        console.log(this.time)
    }
    checkedtime(event, i) {
        // delete this.timeall;
        delete this.nottime; 
        if (event.target.checked == true) {
            console.log(event.target.checked);
            this.timeall = "both";
            delete this.time;
            // delete this.nottime;
            this.setPage(1);
        }
        console.log(this.timeall)
    }
    checked15(event, i) {
        delete this.time;
        delete this.timeall;
        if (event.target.checked == true) {
            console.log(event.target.checked);
            this.nottime = "notime";

            delete this.timeall;
            this.setPage(1);
        }

        console.log(this.nottime)
    }
    checked16(event, i, energy) {
        if (energy) {
            console.log(energy);
            this.renewable = energy;
            this.setPage(1);
        }
        else if (!energy) {
            console.log()
            delete this.renewable;
        }
        console.log(this.renewable)
    }
    price1(price) {
        if (price) {
            console.log(price);
            this.value1 = price;
            this.setPage(1);
        }
        else if (!price) {
            console.log()
            //delete this.price;
        }
        console.log(this.price)
    }
    checked17(event, i, name) {
        if (name) {
            console.log(name);
            this.name = name;
            console.log(this.name)
            this.setPage(1);
        }
        else {
            // alert("usamn")
            console.log()
            delete this.name;
            localStorage.removeItem('name');
            this.refresh();
            this.setPage(1);

        }
        console.log(this.name)
    }
    refresh(): void {
        // this.setPage(1);
        window.location.reload();
    }

    checked18(event, i, item) {
        if (item) {
            console.log(item);
            // alert(item)
            this.item = item;
            this.setPage(1);
        }
        else {
            console.log()
            delete this.item;
            console.log(this.item)
        }
    }
    pricerate(min, max) {
        
        if ( this.value1== "500") {

            this.min_price_500=min; 
           
           this.max_price_500 =max;


           this.min_price_1000=undefined;
           this.max_price_1000 =undefined;
           this.max_price_2000 =undefined;
           this.max_price_2000 =undefined;
            console.log(this.min_price_500)
            this.setPage(1);
        }

       else if(this.value1=="1000")
        {
            this.min_price_500=undefined;
            this.max_price_500 =undefined;
            this.max_price_2000 =undefined;
            this.max_price_2000 =undefined;

            this.min_price_1000=min; 
           
           this.max_price_1000 =max;
           this.setPage(1);
        }
        else if (this.value1=="2000"){
            
            this.min_price_1000=undefined;
            this.max_price_1000 =undefined;
            this.max_price_500 =undefined;
            this.max_price_500 =undefined;
            this.min_price_2000=min; 
           
           this.max_price_2000 =max;
           this.setPage(1);
        }
        // else {
        //     localStorage.removeItem('min');
        //     localStorage.removeItem('max');
        //     localStorage.removeItem('price');
        //     delete this.min;
        //     delete this.max;
        //     // delete this.price;
        //     this.setPage(1);
        // }

        console.log(this.min, this.max)
    }

    checked20(event, i) {
        this.sort = "Renewable";
        this.setPage(1);
    }
    checked21(event, i) {
        this.sort = "dsc";
        this.setPage(1);
    }
    checked22(event, i) {
        this.sort = "dsc";
        this.setPage(1);
    }
    move(name) {

        this.name = name;
        console.log(this.name)

        //   this.router.navigate(['/products/' + this.zip_code]);
        //   localStorage.setItem('zip', this.zip_code);
        //   localStorage.setItem('name', name.trim());
        this.setPage(1);
    }

    Checkzipcode() {
        this.zipwithcity();
        localStorage.removeItem('min');
        localStorage.removeItem('max');
        localStorage.removeItem('price');
        localStorage.removeItem('market');
        localStorage.removeItem('fixed');
        localStorage.removeItem('vari');
        localStorage.removeItem('months1');
        localStorage.removeItem('months2');
        localStorage.removeItem('months3');
        localStorage.removeItem('months4');
        localStorage.removeItem('months5');
        localStorage.removeItem('months6');
        localStorage.removeItem('months7');
        localStorage.removeItem('name');
        delete this.min;
        delete this.max;
        delete this.price;
        delete this.name;
        delete this.market;
        delete this.vari;
        delete this.fixed;
        delete this.months1;
        delete this.months2;
        delete this.months3;
        delete this.months4;
        delete this.months5;
        delete this.months6;
        delete this.months7;
        delete this.sort;
        delete this.renewable;
        delete this.notprepaid;
        delete this.prepaid;
        delete this.time;
        delete this.nottime;
        delete this.planmin;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.get(Config.api + 'zipcodecheck/' + this.zip_code, { headers: headers })
            .subscribe(data => {
                console.log(data);
                this.state = data.json()['state'];
                console.log(this.state);
                localStorage.setItem('state', this.state);
                this.zipcodeexist = data.json()['message']
                delete this.item;

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
                    localStorage.setItem('zip', this.zip_code)
                    //  window.location.reload();
                }
                else if (this.state == "notderegulatedstate") {

                    this.router.navigate(['/products/' + this.zip_code]);
                    delete this.name;
                    localStorage.setItem('zip', this.zip_code);
                    // window.location.reload()
                }

            },
                error => {
                    swal({
                        text: "Zipcode Dose Not Exist",
                        title: "Choice Genie",
                        type: "error",
                        showConfirmButton: false,
                        timer: 1200,
                        confirmButtonText: "OK",

                    })
                }
            );
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
        }
        if (this.fixed == null) {
            delete this.fixed;
        }
        if (this.vari == null) {
            delete this.vari;
        }
        if (this.market == null) {
            delete this.market;
        }
        if (this.price == null) {
            delete this.price;
        }
        if (this.name == null) {
            delete this.name;
        }
        if (this.min == null) {
            delete this.min;
        }
        if (this.max == null) {
            delete this.max;
        }
        // if (this.planmin == null) {
        //     delete this.planmin;
        // }
        // this.min_price_500,this.max_price_500,this.min_price_1000,this.max_price_1000, this.min_price_2000,this.max_price_2000,
        const Results = {}

        if (this.months1 == "36 Months" || this.months2 == "24 Months" || this.months3 == "18 Months" || this.months4 == "14 Months" || this.months5 == "12 Months" || this.months6 == "12 Months" || this.months7 == "5 Months" || this.fixed == "Fixed Rate" || this.vari == "Variable (Changing Rate)" || this.market == "Indexed (Market Rate)" || this.prepaidall == "both" || this.showallplanPB == "both" || this.timeall == "both" || this.planmin == "NULL" || this.notprepaid == "noprepaid" || this.prepaid == "Prepaid" || this.time == "Time Of Use" || this.nottime == "notime" || this.renewable || this.name || this.sort || this.item || this.min_price_500||this.max_price_500||this.min_price_1000||this.max_price_1000||this.min_price_2000||this.max_price_2000|| this.logo1 || this.logo2 || this.logo3 || this.logo4 || this.logo5 == "StarRating5.png") {

            console.log(this.months1, this.months2, this.months3, this.months4, this.months5, this.months6, this.months7, this.fixed, this.vari, this.market, this.prepaid, this.notprepaid, this.planmin, this.time, this.nottime, this.renewable, this.name, this.sort,  this.item,this.min_price_500,this.max_price_500,this.min_price_1000,this.max_price_1000, this.min_price_2000,this.max_price_2000, this.timeall, this.prepaidall, this.showallplanPB, 'multifilter');
            this.obj.filter(page, this.zip_code, this.months1, this.months2, this.months3, this.months4, this.months5, this.months6, this.months7, this.fixed, this.vari, this.market, this.notprepaid, this.prepaid, this.planmin, this.time, this.nottime, this.renewable, this.name, this.sort, this.item, this.min_price_500,this.max_price_500,this.min_price_1000,this.max_price_1000, this.min_price_2000,this.max_price_2000, this.logo1, this.logo2, this.logo3, this.logo4, this.logo5, this.prepaidall, this.timeall, this.showallplanPB).subscribe(response => {


                // alert(this.min_price_500);
                this.product = response['Results'];
                this.noresult = response['Total Result'];
                this.zipdet = localStorage.getItem('zip');
                for (let prod of this.product) {
                    var re = /\s*(?:;|$)\s*/;
                    prod["plan_information"] = prod["plan_information"].split(',,', 3000);
                    // prod["plan_information"] = prod["plan_information"].split(',,,,,', 3000);
                    prod["price_rate"] = prod["price_rate"].split('..', 3000);

                }

                this.pager = this.pagerService.getPager(response['Total Result'], page, this.item);

            }


            );
            // localStorage.clear();

        }


        else {




            this.obj.searchProducts(this.zip_code, page).subscribe(response => {
                console.log(this.product = response['Results'])
                this.product = response['Results'];
                this.noresult = response['Total Result'];
                for (let prod of this.product) {
                    prod["plan_information"] = prod["plan_information"].split(',,', 3000);
                    prod["price_rate"] = prod["price_rate"].split('..', 3000);

                }


                this.pager = this.pagerService.getPager(response['Total Result'], page, this.item);

            }


            );

        }


    }


    openDialog(pID): void {
        let dialogRef = this.dialog.open(PremiseDialog, {
            // width: '300px',
            data: { productID: pID, zip: this.zip }
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }
    openDialog2(pID): void {
        let dialogRef = this.dialog.open(plandetailDialog, {
            // width: '300px',
            // data: { productID: pID, zip: this.zip }
        });

        dialogRef.afterClosed().subscribe(result => {
        });

    }


}

@Component({
    selector: 'premise-dialog',
    templateUrl: 'premise-dialog.html',
})

export class PremiseDialog {
    product_id;
    premiseID;
    signup;
    city;
    state;


    // premise_id ='';
    zip_code;
    digitsOnly = '^[0-9,-]+$';
    // private http: any;

    constructor(private http: HttpClient, private sg: SimpleGlobal,
        public dialogRef: MatDialogRef<PremiseDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any, private router: Router) {
        this.product_id = data.productID;
        console.clear(); console.log(this.product_id);
        //this.zipCode = data.zip;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
    premiseIdData() {
        // alert(this.premiseID.toString().length)
        // alert('hello');
        if (this.premiseID && this.premiseID.toString().length === 17) {
            let headers = new HttpHeaders();
            headers.append('Content-Type', 'application/json');
            // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
            this.http.put(Config.api + 'premiseid/', { "premiseid": this.premiseID }, { headers: headers })
                .subscribe(Res => {
                    console.log(Res);
                    this.city = Res[0].city;
                    this.state = Res[0].state;
                    localStorage.setItem("signupDetails", JSON.stringify(Res));
                    localStorage.setItem("signedupcompanyid", this.product_id);
                    localStorage.setItem("consumerPremiseID", this.premiseID);

                    //   return JSON.parse(localStorage.getItem("premiseID"))
                    // this.sg['products'] = Res.json()['Results'];
                    // this.data.changeProducts(this.sg['products']);

                });
        }
    }

    premiseESID() {
        // alert(this.premiseID.toString().length)
        // alert('hello');
        if (this.premiseID && this.premiseID.toString().length === 17) {
            let headers = new HttpHeaders();
            headers.append('Content-Type', 'application/json');
            // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
            this.http.post(Config.api + 'esid/', { "premiseid": this.premiseID }, { headers: headers })
                .subscribe(Res => {
                    console.log(Res);
                    this.city = Res[0].city;
                    this.state = Res[0].state;
                    localStorage.setItem("signupDetails", JSON.stringify(Res));
                    localStorage.setItem("signedupcompanyid", this.product_id);
                    //   return JSON.parse(localStorage.getItem("premiseID"))
                    // this.sg['products'] = Res.json()['Results'];
                    // this.data.changeProducts(this.sg['products']);

                });
        }
    }

    signUp(f: NgForm) {
        this.router.navigate(['/signup/' + this.product_id]);
        this.dialogRef.close();
    }


};
@Component({
    selector: 'Plandetail-dialog',
    templateUrl: 'plandetail-dialog.html',
})

export class plandetailDialog {
    // product_id;
    // premiseID;
    // signup;
    city;
    state;


    // premise_id ='';
    zip_code;
    digitsOnly = '^[0-9,-]+$';
    // private http: any;

    constructor(private http: HttpClient, public sg: SimpleGlobal,
        public dialogRef: MatDialogRef<plandetailDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any, private router: Router) {
        // this.product_id = data.productID;
        // console.clear(); console.log(this.product_id);
        //this.zipCode = data.zip;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }


    // signupdata() {
    // alert(this.premiseID.toString().length)
    // alert('hello');
    // if(this.premiseID&&this.premiseID.toString().length===17) {
    //   let headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');
    // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
    // this.http.post(Config.api + 'signup/'+ this.zip_code +'', {"premiseid": this.premiseID}, {headers: headers})
    // .subscribe(Res => {
    // console.log(Res);
    //  this.city = Res[0].city;
    // this.state = Res[0].state;
    // this.sg['products'] = Res.json()['Results'];
    // this.data.changeProducts(this.sg['products']);

    // });}

    // signUp(f: NgForm) {
    //     this.router.navigate(['/signup/' + this.product_id]);
    //     this.dialogRef.close();
}
