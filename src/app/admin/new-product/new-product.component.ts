
import { Component, OnInit, Directive, Input } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { Config } from '../../Config';
import { ActivatedRoute, Router } from "@angular/router";
import { SimpleGlobal } from 'ng2-simple-global';
import { ResponseContentType } from '@angular/http/src/enums';
import { FormBuilder, Validators, NgControl, RadioControlValueAccessor, FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import swal from 'sweetalert2';
import { MatSelect } from '@angular/material';

import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';
// import moment = require('moment');
import * as moment from 'moment';
@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html'
})
export class NewProductComponent implements OnInit {
  state;
  city;
  signupForm: FormGroup;
  private next: any;
  model: any = {};
  normalPattern = '[a-zA-Z0-9_.-]+?';
  digitsOnly = '^[0-9,-]+$';
  public phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  publish_product_date;
  product_inactive_date;
  email = '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$';
  public username;
  flag = true;
  date = new FormControl(new Date());
  zipcode;
  utilityarea;
  profileurl;
  profile_logo;
  rating_logo;
  plan_information;
  price_rate;
  cancelation_fee;
  terms_of_service;
  phone;
  sign_up;
  minimum_usage_fee;
  contact_email;
  renewable;
  fact_sheet;
  spectialterms;
  price_1000_kwh;
  price_500_kwh;
  price_2000_kwh;
  price_600_kwh;
  price_1200_kwh;
  price_1500_kwh;
  price_900_kwh;
  emailexist: boolean = false;
  isLinear = true;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  constructor(private https: Http, public router: Router, private fb: FormBuilder,private _http: HttpClient, private http: Http, private route: ActivatedRoute, private sg: SimpleGlobal) { }
  title;
  url: any = '.pdf';
  titlevendor;
  public user;
  servicearea;
  ngOnInit() {
    this.user = localStorage.getItem('user')
    this.username = localStorage.getItem('username')
    this.titlevendor =localStorage.getItem('title')
    console.log(this.username)
    this.fetchProducts()
    this.profile();
    // this.companystates();
    console.log(this.username)
    this.signupForm = this.fb.group({
      'zipcode': ['', Validators.compose([Validators.required])],
      'utilityarea': [''],
      'contact_email': [''],

    });
    this.secondFormGroup = this.fb.group({
      'plan_information': ['', Validators.compose([Validators.required])],
      'specialterms': ['', Validators.compose([Validators.required])],
      
      // 'price_rate': ['', Validators.compose([Validators.required])],
    });
    this.thirdFormGroup = this.fb.group({
      'fact_sheet': [''],
      'terms_of_service': [''],
      'phone': ['', Validators.compose([Validators.required])],
    });
    this.fourthFormGroup = this.fb.group({
      'publish_product_date': [''],
      'product_inactive_date': [''],
 
      'price_1000_kwh': ['', Validators.compose([Validators.required])],
      'price_600_kwh': [''],
      'price_900_kwh': [''],
      'price_500_kwh': ['', Validators.compose([Validators.required])],
      'price_2000_kwh': ['', Validators.compose([Validators.required])],
      'price_1200_kwh': [''],
      'price_1500_kwh': [''],
      'status_600':[],
'status_900':[],
'status_1200':[],
'status_1500':[],

      'minimum_usage_fee': ['', Validators.compose([Validators.required])],
      'renewable': ['', Validators.compose([Validators.required])],
      'cancelation_fee': ['', Validators.compose([Validators.required])],
    });
  }
  check(e) { }
  data: any = [];
  word: any = [];
  tit;
  only;
  prourl;
  prologo;
  sign;
  private authentication = localStorage.getItem('token');

  fetchProducts() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'JWT ' +  this.authentication);
    headers.append('Authorization', 'JWT ' + localStorage.getItem('token'));
    console.log('new product', localStorage.getItem('token'));
    this.https.get(Config.api + 'check_role/' + this.username + '/', { headers: headers })
      .subscribe(Res => {
        this.sg['products'] = Res.json()['Results'];
        this.data = this.sg['products'];
        console.log(this.data);
        this.word = this.data[0];
        this.prourl = this.word.profileurl;
        console.log(this.prourl,'url')

        this.prologo = this.word.profile_logo;
        console.log(this.prologo,'profile ')

        this.sign = this.word.sign_up;
        console.log(this.sign,'company sign in ')

        this.tit = this.word.title;
        this.only = this.tit.trim()
        console.log(this.tit,'company name')
      });

  }
  comprofile;
  profile() {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'JWT ' +  this.authentication);
    headers.append('Authorization', 'JWT ' + localStorage.getItem('token'));
    console.log('pofile', localStorage.getItem('token'));

    this.http.get(Config.api + 'comprofile/' + this.titlevendor.trim() + '/', { headers: headers })
    
    .subscribe(Res => {
      //alert(this.comprofile)
    this.comprofile=Res.json();
    // this.data = Res;
    // this.data= this.email.contact_emai;


    // this.record= data[0].package_type;
    // localStorage.getItem('package_type');

    console.log(this.comprofile,'company email');
    });
    
    }
    companystates() {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.get(Config.api + 'deregulated_utility/', { headers: headers })
        .subscribe(Res => {
          this.utilityarea = Res.json();
          console.log(this.utilityarea)
        });
    }
  onSubmit(f) {
    f.resetForm();
  }
  
  onChange(event: EventTarget) {
    this.terms_of_service = new FormData();
    // this.fact_sheet = new FormData();
     
    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    this.terms_of_service.append('fileToUpload', target.files[0]);
    // this.fact_sheet.append('fileToUpload', target.files[0]);
    console.log(this.terms_of_service);
    // console.log(this.fact_sheet)
// alert(this.fact_sheet)
    alert(this.terms_of_service);
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.url = e.target.result;
        console.log(this.url);
      };
      alert(this.url)
      reader.readAsDataURL(event.target.files[0]);
     this.upload();
    //  this.uploadfactsheet();
    }
  }
  onChangefeet(event: EventTarget) {
    // this.terms_of_service = new FormData();
    this.fact_sheet = new FormData();
     
    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    // this.terms_of_service.append('fileToUpload', target.files[0]);
    this.fact_sheet.append('fileToUpload', target.files[0]);
    // console.log(this.terms_of_service);
    console.log(this.fact_sheet)
alert(this.fact_sheet)
    // alert(this.terms_of_service);
  }
  readUrlfect(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.url = e.target.result;
        console.log(this.url);
      };
      alert(this.url)
      reader.readAsDataURL(event.target.files[0]);
  //  this.upload();
     this.uploadfactsheet();
    }
  }

  upload() {
    this._http.post(
      Config.pdfupload,
      this.terms_of_service,{ responseType: 'text' }).subscribe(data => {
        if (data === "Sorry, not a valid Image.Sorry, only JPG, JPEG, PNG & GIF files are allowed.Sorry, your file was not uploaded.") {
        }
        else {


          console.log(data);
          alert(data);
          this.terms_of_service = data;

       // this.signupuserdata();
        }
      });
  }
  uploadfactsheet() {
    this._http.post(
      Config.pdfupload,
      this.fact_sheet,{ responseType: 'text' }).subscribe(data => {
        if (data === "Sorry, not a valid Image.Sorry, only JPG, JPEG, PNG & GIF files are allowed.Sorry, your file was not uploaded.") {
        }
        else {


          console.log(data);
          alert(data);
          this.fact_sheet = data;

       // this.signupuserdata();
        }
      });



  }
  status_600:boolean=false
  AddReservePriceFun() {
    alert(this.status_600 )
    if ( this.status_600 === true ) {
      this.status_600 = true;
    } else {
      this.status_600 = false;
    }
  }
  status_900:boolean=false
  AddReservePriceFun1() {
    if ( this.status_900 === true ) {
      this.status_900 = true;
    } else {
      this.status_900 = false;
    }
  }
  status_1200:boolean=false
  AddReservePriceFun2() {
    if ( this.status_1200 === true ) {
      this.status_1200 = false;
    } else {
      this.status_1200 = true;
    }
  }
  status_1500:boolean=false
  AddReservePriceFun3() {
    if ( this.status_1500 === true ) {
      this.status_1500 = false;
    } else {
      this.status_1500 = true;
    }
  }
  signupuserdata(zipcode,utilityarea, contact_email, title, profileurl, profile_logo, plan_information,  cancelation_fee, fact_sheet, terms_of_service, phone, sign_up, minimum_usage_fee, renewable, specialterms, price_1000_kwh, price_500_kwh, price_2000_kwh,publish_product_date,product_inactive_date) {
    console.log(utilityarea, title, profileurl, profile_logo, plan_information,  cancelation_fee, fact_sheet, terms_of_service, phone, sign_up, minimum_usage_fee, renewable, specialterms, price_1000_kwh, price_500_kwh, price_2000_kwh,publish_product_date,product_inactive_date);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'JWT ' +  this.authentication);
    headers.append('Authorization', 'JWT ' + localStorage.getItem('token'));
    console.log('pofile', localStorage.getItem('token'));  
    this.price_rate= '600 kWh '+this.price_600_kwh +'..900 kWh '+this.price_900_kwh +'..1200 kwh '+this.price_1200_kwh +'..1500 kwh '+this.price_1500_kwh ;
    console.log(this.price_rate)
    this.https.post(Config.api + 'addproduct/',JSON.stringify( {
      'zipcode':zipcode,
      "serviceareaname": utilityarea,
      "title": title,
      "profileurl": profileurl,
      "profile_logo": profile_logo,
      "plan_information": plan_information,
      "price_rate":this.price_rate   ,
      "cancelation_fee": cancelation_fee,
      "fact_sheet": this.fact_sheet,
      "terms_of_service":this.terms_of_service,
      "phone": phone,
      "sign_up": sign_up,
      "minumum_usage_fee": minimum_usage_fee,
      "renewable": renewable,
      "specialterms": specialterms,
      "price_1000_kwh": price_1000_kwh,
      "price_500_kwh": price_500_kwh,
      "price_2000_kwh": price_2000_kwh,
      "contact_email": contact_email,
      'publish_product_date': moment(publish_product_date).format('YYYY/MM/DD'),
      'product_inactive_date': moment(product_inactive_date).format('YYYY/MM/DD')
    }), { headers: headers })
      .subscribe(Res => {
        console.log(Res);
        console.log(this.model);
        swal(
          'Successfully added your new plan !',
          'ChoiceGenie',
          'success'
        )
        console.log(this.model);

      },

        error => {
          console.log(error);

          swal(
            'Invalid',
            'Please Try Again!',
            'error'
          )

        });
    //  window.location.reload();
  }


  company() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');


    this.http.get(Config.api + 'companytitle/', { headers: headers })


      .subscribe(Res => {
        console.log(Res);

        this.title = Res;




      });
  }


}