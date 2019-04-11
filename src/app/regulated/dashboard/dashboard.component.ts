import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { Config } from "../../Config";
import { Subscription } from 'rxjs/Subscription';
import { CompanyService } from "../../company.service";
import { ErrorStateMatcher, MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material";
import { Pipe, PipeTransform } from "@angular/core";
import { Headers, Http, Response } from '@angular/http';
import { HomeService } from "../../home/home.service";
import { PagerService } from '../../pager.service';
import { ResponseContentType } from '@angular/http/src/enums';
import { Console } from '@angular/core/src/console';
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { ActivatedRoute, Router } from '@angular/router';
import { SimpleGlobal } from 'ng2-simple-global';
import { PageEvent } from '@angular/material';
import { DeleteService } from './delete.service';
import { DataService } from '../../data.service';
import { EditService } from './edit.service';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl, AbstractControl, FormGroupDirective, RadioControlValueAccessor } from '@angular/forms';
import swal from 'sweetalert2';
import { NgControl } from '@angular/forms';
import * as moment from 'moment';

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare const $: any;

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }


}

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'

})
export class DashboardComponent implements OnInit, AfterViewInit {
    rev: any = [];
    constructor(private route: ActivatedRoute, private https: HttpClient, private newService: DeleteService, private serve: EditService,
        private formBuilder: FormBuilder, private router: Router, private http: Http, private pagerService: PagerService, private homeService: HomeService, private sg: SimpleGlobal, private dialog: MatDialog, private dataa: DataService, private companyService: CompanyService) {

        this.title = localStorage.getItem('title');

    }
    // date;
    public updatedmydate;
    public updateddate;
    mydate;
    today = Date.now();
    // mydate;
    private Sub: Subscription;
    form;
    updataForm: FormGroup;
    noresult;
    zipdet;
    catagoryId = '';
    title = '';
    cancelation_fee = '';
    fact_sheet = '';
    phone = '';
    plan_information = '';
    product_name;
    rate_type;
    terms_month;
    renewable;
    customer_type;
    price_rate = '';
    profile_logo = '';
    profileurl = '';
    enrollment_productid;
        product_batch_rate;
    active;
    serviceareaname;
    minumum_usage_fee;
    specialterms;
    contact_email;
    product_inactive_date;
    publish_product_date;
    rating_logo = '';
    sign_up = '';
    terms_of_service = '';
    price_1000_kwh = '';
    price_500_kwh = '';
    price_2000_kwh = '';
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
    public username;
    name;
    obj: any = [];
    editdata: any = [];
    Inactivedate;
    publishdate;
    data;
    dataId = '';
    list = 'Hello';
    status: boolean = false;
    submit(id, title) {
        console.log(title.trim())
        this.router.navigate(['/Review/' + id]);
        localStorage.setItem('company', title.trim());
    }
    search(page: number) {
        this.title = localStorage.getItem('title');
        console.log(this.title,'search')
        let headers = new Headers();
        headers.append('Authorization', 'JWT ' + localStorage.getItem('token'));
        console.log('pofile', localStorage.getItem('token'));
        headers.append('Content-Type', 'application/json');

        this.http.post(Config.api + 'search_by_vendor/' + this.title.trim() + '?page=' + page, JSON.stringify({
            
            "productinactive":moment(this.Inactivedate).format('YYYY-MM-DD'),
            "propublish":moment(this.publishdate).format('YYYY-MM-DD'),
            "utility": this.name
        }), { headers: headers }).subscribe(Res => {
            console.log(Res);
            this.sg['products'] = Res.json()['Results'];
            this.noresult = Res.json()['Total Result'];
            for (let prod of this.sg['products']) {
                // prod["plan_information"] = prod["plan_information"].split(',,', 3000);
                // prod["price_rate"] = prod["price_rate"].split('..', 3000);

            }
            this.allItems = this.sg['products'];
            this.pager = this.pagerService.getPager(Res.json()['Total Result'], page, 20);
        });
    }

    setPage(title, page: number) {


        this.title = localStorage.getItem('title');

        console.log("usernameeeeeeeeeeeee", this.title)

        const Results = {};

        this.companyService.searchProduct(title, page).subscribe(Response => {
            console.log('service');
            this.sg['products'] = Response.json()['Results'];
            this.noresult = Response.json()['Total Result'];
            this.zipdet = localStorage.getItem('zip');

            // console.log(this.sg['products']);
            // for (let prod of this.sg['products']) {
            //     // prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            //     // prod["price_rate"] = prod["price_rate"].split('..', 300);

            // }
            this.rev = Response.json()['Results'];

            this.dataa.changeProducts(this.sg['products']);
            this.prod_loaded = true;
            this.prods_loaded = true;
            this.allItems = this.sg['products'];
            console.log(Response.json()['Total Result']);
            this.pager = this.pagerService.getPager(this.rev.length, page, 10);
        });

    }

    //Event Binding of Delete Buttons
    // data.id,data.title,data.sign_up,data.phone,data.terms_of_service,data.fact_sheet,data.cancelation_fee,
    // data.price_1000_kwh,data.price_500_kwh,data.price_2000_kwh,data.product_name,
    // data.rate_type,data.terms_month, data.renewable,data.customer_type,data.rating_logo,data.profile_logo,data.profileurl
    btnshowClick(id, val1, val2, val3, val4, val5, val6, val7, val8, val9, val10, val11,val12,val13,val14,val15,val16,val17) {
        this.catagoryId = id;
        console.log(this.plan_information)
        this.title = val1;
        this.sign_up = val2;
        this.phone = val3;
        this.terms_of_service = val4;
        this.fact_sheet = val5;
        this.cancelation_fee = val6;
        this.price_1000_kwh = val7;
        this.price_500_kwh = val8;
        this.price_2000_kwh = val9;
        this.product_name = val10;
        this.rate_type=val11;
        this.terms_month=val12;
        this.renewable=val13;
        this.customer_type=val14;
        this.rating_logo = val15; 
          this.profile_logo = val16;
        this.profileurl = val17;
        
       
    

       

    
     

        console.log(id, val1, val2, val3, val4, val5, val6, val7, val8, val9, val10, val11,val12,val13,val14,val15,val16,val17)
        console.log('id : ' + this.catagoryId);
    }

    //Event Binding of Delete Buttons
    btnDeleteClick(id) {
        this.dataId = id;
        console.log('id : ' + this.dataId);
    }

    //Event Binding of PopUp Delete Modal

    deleteClick(id) {
        console.log('delete' + id);

        //Calling Delete Service
        this.newService.DeleteTodoList(id).subscribe(data => {
            console.log(data);
            swal({
                type: 'success',
                title: 'Successfully deleted',
                showConfirmButton: false,
                timer: 1500
            })

            this.setPage(this.title, 1)


        }, error => {
        });


    }
    btnEditClick(id, val1, val2, val3, val4, val5, val6, val7, val8, val9, val10, val11,val12,val13,val14,val15,val16,val17,val18,val19,val20,val21,val22,val23,val24,val25) {
        // this.catagoryId = id;
        // console.log(this.plan_information)
        // this.title = val1;
        // this.sign_up = val2;
        // this.phone = val3;
        // this.terms_of_service = val4;
        // this.plan_information = val8;
        // this.fact_sheet = val5;
        // this.cancelation_fee = val6;
        // this.price_1000_kwh = val7;
        // this.price_500_kwh = val12;
        // this.price_2000_kwh = val13;
        // this.rating_logo = val9;
        // this.profile_logo = val10;
        // this.profileurl = val11;
        this.catagoryId = id;
        this.title = val1;
        this.sign_up = val2;
        this.phone = val3;
        this.terms_of_service = val4;
        this.fact_sheet = val5;
        this.cancelation_fee = val6;
        this.price_1000_kwh = val7;
        this.price_500_kwh = val8;
        this.price_2000_kwh = val9;
        this.product_name = val10;
        this.rate_type=val11;
        this.terms_month=val12;
        this.renewable=val13;
        this.customer_type=val14;
        this.rating_logo = val15; 
        this.profile_logo = val16;
        this.profileurl = val17;
        // this.active =val18;
        this.enrollment_productid=val18,
        this.product_batch_rate = val20,
        this.serviceareaname=val19;
        this.minumum_usage_fee=val21;
        this.specialterms=val22;
        this.contact_email= val23;
        this.product_inactive_date=val24;
        this.publish_product_date=val25;
    //     "serviceareaname": updatedserviceareaname,
    //     "title": updatedtitle,
    //     "profileurl": updatedprofileurl,
    //     "profile_logo": updatedprofile_logo,
    //     'product_name':updatedproduct_name,
    //     'rate_type':updatedrate_type,
    //     'terms_month':updatedterms_month,
    //     'customer_type':updatedcustomer_type,
    //     "cancelation_fee": updatedcancelation_fee,
    //     "fact_sheet": updatedfact_sheet,
    //     "terms_of_service":updatedterms_of_service,
    //     "phone": updatedphone,
    //     "sign_up": updatedsign_up,
    //     "minumum_usage_fee": updatedminimum_usage_fee,
    //     "renewable": updatedrenewable,
    //     "specialterms": updatedspecialterms,
    //     "price_1000_kwh": updatedprice1000kwh,
    //     "price_500_kwh": updatedprice500kwh,
    //     "price_2000_kwh": updatedprice2000kwh,
    //     "contact_email": updatedcontact_email,
    //  "rating_logo":updatedrating_logo,
    //     'publish_product_date': mydate,
    //     'product_inactive_date': updateddate,
    //     "enrollment_productid":updatedenrollment_productid,
    //     "product_batch_rate":updatedproduct_batch_rate,


        console.log(id, val1, val2, val3, val4, val5, val6, val7, val8, val9, val10, val11,val12,val13,val14,val15,val16,val17,val18,val19,val20,val21,val23)
        console.log('id : ' + this.catagoryId);
    }

    //Event Binding of PopUp Delete Modal

    editClick(updatedserviceareaname,updatedtitle,updatedprofileurl,updatedprofile_logo,updatedproduct_name,updatedrate_type,updatedterms_month,updatedcustomer_type,
        updatedcancelation_fee,updatedfact_sheet,updatedterms_of_service,updatedphone,updatedsign_up,updatedminimum_usage_fee,updatedrenewable,
        updatedspecialterms,updatedprice1000kwh,updatedprice500kwh,updatedprice2000kwh,updatedcontact_email,mydate,updateddate,
        updatedenrollment_productid,updatedproduct_batch_rate,updatedrating_logo) {
        console.log('edit' +updatedserviceareaname,updatedtitle,updatedprofileurl,updatedprofile_logo,updatedproduct_name,updatedrate_type,updatedterms_month,updatedcustomer_type,
        updatedcancelation_fee,updatedfact_sheet,updatedterms_of_service,updatedphone,updatedsign_up,updatedminimum_usage_fee,updatedrenewable,
        updatedspecialterms,updatedprice1000kwh,updatedprice500kwh,updatedprice2000kwh,updatedcontact_email,mydate,updateddate,
        updatedenrollment_productid,updatedproduct_batch_rate);
        console.log("TS OBJECT", updatedserviceareaname,updatedtitle,updatedprofileurl,updatedprofile_logo,updatedproduct_name,updatedrate_type,updatedterms_month,updatedcustomer_type,
        updatedcancelation_fee,updatedfact_sheet,updatedterms_of_service,updatedphone,updatedsign_up,updatedminimum_usage_fee,updatedrenewable,
        updatedspecialterms,updatedprice1000kwh,updatedprice500kwh,updatedprice2000kwh,updatedcontact_email,mydate,updateddate,
        updatedenrollment_productid,updatedproduct_batch_rate);
        //Calling Delete Service
        this.serve.editTodoList(this.catagoryId,updatedserviceareaname,updatedtitle,updatedprofileurl,updatedprofile_logo,updatedproduct_name,updatedrate_type,updatedterms_month,updatedcustomer_type,updatedcancelation_fee,updatedfact_sheet,updatedterms_of_service,updatedphone,updatedsign_up,updatedminimum_usage_fee,updatedrenewable,updatedspecialterms,updatedprice1000kwh,updatedprice500kwh,updatedprice2000kwh,updatedcontact_email,mydate,updateddate,updatedenrollment_productid,updatedproduct_batch_rate,updatedrating_logo,true).subscribe(data => {
            console.log(data);
            // this.catagoryId,
            swal({
                type: 'success',
                title: 'Successfully updated',
                showConfirmButton: false,
                timer: 1500
            })

            this.setPage(this.title, 1);
        }, error => {
        });
    }
    // btnactiveClick(id, val1, val2, val3, val4, val5, val6, val7, val8, val9, val10, val11, val12, val13) {
    //     // data.id,data.title,data.sign_up,data.phone,data.terms_of_service,
    //     // data.fact_sheet,data.cancelation_fee,data.price_1000_kwh,data.price_500_kwh,
    //     // data.price_2000_kwh,data.plan_information,data.rating_logo,data.profile_logo,data.profileurl

    //     this.catagoryId = id;
    //     console.log(this.plan_information)
    //     this.title = val1;
    //     this.sign_up = val2;
    //     this.phone = val3;
    //     this.terms_of_service = val4;
    //     this.fact_sheet = val5;
    //     this.cancelation_fee = val6;
    //     this.price_1000_kwh = val7;
    //     this.price_500_kwh = val8;
      
    //     console.log(this.price_500_kwh,"Prcie 500")
    //     this.price_2000_kwh = val9;
        
    //     console.log(this.price_2000_kwh,"Prcie 2000")
    //     this.plan_information = val10; 
    //     console.log(this.price_1000_kwh,"price 1000")
     
    //     this.rating_logo = val11;
    //     this.profile_logo = val12;
    //     this.profileurl = val13;
       
    //     this.status = false;
    
 

    //     console.log(id, val1, val2, val3, val4, val5, val6, val12, val13, val7, val8, val9, val10, val11)
    //     console.log('id : ' + this.catagoryId);
    // }
    btnactiveClick(id, val1, val2, val3, val4, val5, val6, val7, val8, val9, val10, val11,val12,val13,val14,val15,val16,val17,val18,val19,val20,val21,val22,val23,val24,val25) {
        // this.catagoryId = id;
        // console.log(this.plan_information)
        // this.title = val1;
        // this.sign_up = val2;
        // this.phone = val3;
        // this.terms_of_service = val4;
        // this.plan_information = val8;
        // this.fact_sheet = val5;
        // this.cancelation_fee = val6;
        // this.price_1000_kwh = val7;
        // this.price_500_kwh = val12;
        // this.price_2000_kwh = val13;
        // this.rating_logo = val9;
        // this.profile_logo = val10;
        // this.profileurl = val11;
        this.catagoryId = id;
        this.title = val1;
        this.sign_up = val2;
        this.phone = val3;
        this.terms_of_service = val4;
        this.fact_sheet = val5;
        this.cancelation_fee = val6;
        this.price_1000_kwh = val7;
        this.price_500_kwh = val8;
        this.price_2000_kwh = val9;
        this.product_name = val10;
        this.rate_type=val11;
        this.terms_month=val12;
        this.renewable=val13;
        this.customer_type=val14;
        this.rating_logo = val15; 
        this.profile_logo = val16;
        this.profileurl = val17;
        // this.active =val18;
        this.enrollment_productid=val18,
        this.product_batch_rate = val20,
        this.serviceareaname=val19;
        this.minumum_usage_fee=val21;
        this.specialterms=val22;
        this.contact_email= val23;
        this.product_inactive_date=val24;
        this.publish_product_date=val25;
    //     "serviceareaname": updatedserviceareaname,
    //     "title": updatedtitle,
    //     "profileurl": updatedprofileurl,
    //     "profile_logo": updatedprofile_logo,
    //     'product_name':updatedproduct_name,
    //     'rate_type':updatedrate_type,
    //     'terms_month':updatedterms_month,
    //     'customer_type':updatedcustomer_type,
    //     "cancelation_fee": updatedcancelation_fee,
    //     "fact_sheet": updatedfact_sheet,
    //     "terms_of_service":updatedterms_of_service,
    //     "phone": updatedphone,
    //     "sign_up": updatedsign_up,
    //     "minumum_usage_fee": updatedminimum_usage_fee,
    //     "renewable": updatedrenewable,
    //     "specialterms": updatedspecialterms,
    //     "price_1000_kwh": updatedprice1000kwh,
    //     "price_500_kwh": updatedprice500kwh,
    //     "price_2000_kwh": updatedprice2000kwh,
    //     "contact_email": updatedcontact_email,
    //  "rating_logo":updatedrating_logo,
    //     'publish_product_date': mydate,
    //     'product_inactive_date': updateddate,
    //     "enrollment_productid":updatedenrollment_productid,
    //     "product_batch_rate":updatedproduct_batch_rate,


        console.log(id, val1, val2, val3, val4, val5, val6, val7, val8, val9, val10, val11,val12,val13,val14,val15,val16,val17,val18,val19,val20,val21,val23)
        console.log('id : ' + this.catagoryId);
    }
    //Event Binding of PopUp Delete Modal

    // activeClick(updatedmydate, updateddate, updatedtitle, updatedsign_up, updatedphone, updatedterms_of_service, updatedfact_sheet, updatedcancelation_fee, updatedprice500kwh, updatedprice1000kwh, updatedprice2000kwh, updatedplan_information, updatedrating_logo, updatedprofile_logo, updatedprofileurl, upactive) {

    // // activeClick(updatedmydate, updateddate, updatedtitle, updatedsign_up, updatedphone, updatedterms_of_service, updatedfact_sheet, updatedcancelation_fee, updatedprice500kwh, updatedprice1000kwh, updatedprice2000kwh, updatedplan_information, updatedrating_logo, updatedprofile_logo, updatedprofileurl, upactive) {
    //     console.log('edit' + updatedmydate, updateddate, updatedtitle, updatedsign_up, updatedphone, updatedterms_of_service, updatedfact_sheet, updatedcancelation_fee, updatedprice500kwh, updatedprice1000kwh, updatedprice2000kwh, updatedplan_information, updatedrating_logo, updatedprofile_logo, updatedprofileurl, upactive);
    //     console.log("TS OBJECT", updatedtitle, updatedsign_up, updatedphone, updatedterms_of_service, updatedfact_sheet, updatedcancelation_fee, updatedprice500kwh, updatedprice1000kwh, updatedprice2000kwh, updatedplan_information, updatedrating_logo, updatedprofile_logo, updatedprofileurl, upactive);
    //     //Calling Delete Service
    //     if (this.updatedmydate != '' || this.updateddate != '') {
    //     // this.serve.editTodoList(updatedmydate, updateddate, this.catagoryId, updatedtitle, updatedsign_up, updatedphone, updatedterms_of_service, updatedfact_sheet, updatedcancelation_fee, updatedprice500kwh, updatedprice1000kwh, updatedprice2000kwh, updatedplan_information, updatedrating_logo, updatedprofile_logo, updatedprofileurl, 'None').subscribe(data => {
    //         this.serve.editTodoList(updatedmydate, updateddate, this.catagoryId, updatedtitle, updatedsign_up, updatedphone, updatedterms_of_service, updatedfact_sheet, updatedcancelation_fee, updatedprice500kwh, updatedprice1000kwh, updatedprice2000kwh, updatedplan_information, updatedrating_logo, updatedprofile_logo, updatedprofileurl, 'None').subscribe(data => {

    //     console.log(data);
    //         swal({
    //             type: 'success',
    //             title: 'Successfully updated',
    //             showConfirmButton: false,
    //             timer: 1500
    //         })
    //         this.setPage(this.title, 1);

    //     }, error => {
    //     });
    // }
    // else {
    //     swal({
    //         type: 'error',
    //         title: 'Please Select the deactive date ',
    //         showConfirmButton: false,
    //         timer: 1500
    //     })
    // }

    // }
    activeClick(mydate,updateddate) {
       
        this.serve.Deactive_products(this.catagoryId,mydate,updateddate).subscribe(data => {
            console.log(data);
            // this.catagoryId,
            swal({
                type: 'success',
                title: 'Successfully updated',
                showConfirmButton: false,
                timer: 1500
            })

            this.setPage(this.title, 1);
        }, error => {
        });
    }


     ngOnInit() {
        this.title = localStorage.getItem('title')
        console.log(this.title, 'gggggggggggggggg')
        this.updataForm = this.formBuilder.group({

            cancelation_fee: ['', Validators.compose([Validators.required])],
            fact_sheet: ['', Validators.compose([Validators.required])],
            phone: ['', Validators.compose([Validators.required])],
            id: ['', Validators.required],
            plan_information: ['', Validators.compose([Validators.required])],
            price_rate: ['', Validators.compose([Validators.required])],
            profile_logo: ['', Validators.compose([Validators.required])],
            profileurl: ['', Validators.required],
            rating_logo: ['', Validators.compose([Validators.required])],
            sign_up: ['', Validators.compose([Validators.required])],
            terms_of_service: ['', Validators.compose([Validators.required])],
            title: ['', Validators.compose([Validators.required])],
        });
        this.setPage(this.title, 1)
        console.log(this.title, 1)


    }
    ngAfterViewInit() {
        const breakCards = true;
        if (breakCards === true) {
            $('[data-header-animation="true"]').each(function () {
                const $fix_button = $(this);
                const $card = $(this).parent('.card');
                $card.find('.fix-broken-card').click(function () {
                    const $header = $(this).parent().parent().siblings('.card-header, .card-image');
                    $header.removeClass('hinge').addClass('fadeInDown');

                    $card.attr('data-count', 0);

                    setTimeout(function () {
                        $header.removeClass('fadeInDown animate');
                    }, 480);
                });

                $card.mouseenter(function () {
                    const $this = $(this);
                    const hover_count = parseInt($this.attr('data-count'), 10) + 1 || 0;
                    $this.attr('data-count', hover_count);
                    if (hover_count >= 20) {
                        $(this).children('.card-header, .card-image').addClass('hinge animated');
                    }
                });
            });
        }
    }
}
