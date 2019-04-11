
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
  enrollment_productid;
  product_batch_rate;
  zipcode;
  utilityarea;
  profileurl;
  profile_logo;
  rating_logo;
  plan_information;
  price_rate;
  cancelation_fee;
  terms_of_service;
  // Pricing;
  customer='New Customer';
  phone;
  sign_up;
  fixed ='Fixed Rate';
  market;
  vari;
  minimum_usage_fee;
  contact_email;
  basefee;
  renewable;
  billing;
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
  product_name;
  specialterms;
  terms_month;
  newcustomer;
  customer_type;
  Existing;
  NewandExisting;
  i;
  ngOnInit() {
    this.user = localStorage.getItem('user')
    this.username = localStorage.getItem('username')
    this.titlevendor =localStorage.getItem('title')
    console.log(this.username)
    this.fetchProducts()
    this.profile();
    // alert(this.fixed)
  // alert(this.customer)
    // this.checked8();
    // this.companystates();
    console.log(this.username)
    this.signupForm = this.fb.group({
      // 'zipcode': ['', Validators.compose([Validators.required])],
      'utilityarea': [''],
      'contact_email': [''],

    });
    this.secondFormGroup = this.fb.group({
      'product_name': ['', Validators.compose([Validators.required])],
      'renewable': ['', Validators.compose([Validators.required])],
      // min: 0, max: 20
      'specialterms': ['', Validators.compose([Validators.required])],
      // 'product_name':[''],
      'terms_month':['']
      
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
      // 'price_600_kwh': [''],
      // 'price_900_kwh': [''],
      'price_500_kwh': ['', Validators.compose([Validators.required])],
      'price_2000_kwh': ['', Validators.compose([Validators.required])],
      // 'price_1200_kwh': [''],
      // 'price_1500_kwh': [''],
      // 'status_600':[],
// 'status_900':[],
// 'status_1200':[],
// 'status_1500':[],

      // 'minimum_usage_fee': ['', Validators.compose([Validators.required])],
     
      'cancelation_fee': ['', Validators.compose([Validators.required])],
      'enrollment_productid': ['', Validators.compose([Validators.required])],
      'product_batch_rate': ['', Validators.compose([Validators.required])],
      'basefee': ['', Validators.compose([Validators.required])]
    });
  }
  // zip_code = this.fb.group('', [ Validators.pattern(this.digitsOnly)]);
    // zip_code1 = new FormControl('', [
    //   Validators.pattern(this.digitsOnly)
    // ]);
  check(e) { }
  data: any = [];
  word: any = [];
  tit;
  only;
  prourl;
  prologo;
  sign;
  private authentication = localStorage.getItem('token');
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();

    }
  }
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
    // alert(this.terms_of_service);
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.url = e.target.result;
        console.log(this.url);
      };
      // alert(this.url)
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
    // console.log(this.fact_sheet)
// alert(this.fact_sheet)
    // alert(this.terms_of_service);
  }
  readUrlfect(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.url = e.target.result;
        console.log(this.url);
      };
      // alert(this.url)
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
  checked8(event, i) {
    if (event.target.checked == true) {
        console.log(event.target.checked)
        this.fixed = "Fixed Rate";
        // this.setPage(1);
        // alert(this.fixed)
        console.log(this.fixed,"fixed rate");
    }
    
    console.log(this.fixed)
}
checked9(event, i) {
  if (event.target.checked == true) {
      console.log(event.target.checked)
      this.fixed = "Variable (Changing Rate) ";
      // alert(this.fixed)
  
      // this.setPage(1);
      // alert(this.fixed)
      console.log(this.fixed,"Variable (Changing Rate) ");
  }
   
  console.log(this.fixed)
}
 
checked10(event, i) {
  if (event.target.checked == true) {
      console.log(event.target.checked)
      this.fixed = "Indexed (Market Rate)";
      // alert(this.fixed)
      // delete 
      // this.setPage(1);
      // alert(this.fixed)
      console.log(this.fixed,"Indexed (Market Rate)");
  }
   
  console.log(this.fixed)
}
checked11(event, i) {
  if (event.target.checked == true) {
      console.log(event.target.checked)
      this.customer = "New Customer";
      // alert(this.customer)
      // delete 
      // this.setPage(1);
      // alert(this.fixed)
      console.log(this.customer,"New Customer");
  }
   
  console.log(this.customer)
}
checked12(event, i) {
  if (event.target.checked == true) {
      console.log(event.target.checked)
      this.customer = "Existing";
      // alert(this.customer)
      // delete 
      // this.setPage(1);
      // alert(this.fixed)
      console.log(this.customer,"Existing");
  }
   
  console.log(this.customer)
}
checked13(event, i) {
  if (event.target.checked == true) {
      console.log(event.target.checked)
      this.customer = "New and Existing";
      // alert(this.customer)
      // delete 
      // this.setPage(1);
      // alert(this.fixed)
      console.log(this.customer,"New and Existing");
  }
   
  console.log(this.fixed)
}
pricing= "Both";
checked15(event, i) {
  if (event.target.checked == true) {
      console.log(event.target.checked)
      this.pricing = "NULL";
      // alert(this.Pricing)
      // delete 
      // this.setPage(1);
      // alert(this.fixed)
      console.log(this.pricing,"New and Existing");
  }
   
  console.log(this.pricing)
}

checked14(event, i) {
  if (event.target.checked == true) {
      console.log(event.target.checked)
      this.pricing = "Both";
      // alert(this.Pricing)
      // delete 
      // this.setPage(1);
      // alert(this.fixed)
      console.log(this.pricing,"New and Existing");
  }
   
  console.log(this.pricing)
}

  // signupuserdata(utilityarea, contact_email, title, profileurl, profile_logo, plan_information,  cancelation_fee, fact_sheet, terms_of_service, phone, sign_up, minimum_usage_fee, renewable, specialterms, price_1000_kwh, price_500_kwh, price_2000_kwh,publish_product_date,product_inactive_date,enrollment_productid,product_batch_rate) {
    signupuserdata(utilityarea,contact_email,title,profileurl,profile_logo,product_name,terms_month,fixed,customer_type,cancelation_fee,fact_sheet,terms_of_service,phone,sign_up,minimum_usage_fee,renewable,specialterms,price_1000_kwh,price_500_kwh,price_2000_kwh, publish_product_date,product_inactive_date,enrollment_productid,product_batch_rate,basefee  ) {
    // utilityarea,contact_email.value,title.value,profileurl.value,profile_logo.value,product_name,terms_month,fixed,customer_type,cancelation_fee,fact_sheet,terms_of_service,phone,sign_up.value,minimum_usage_fee,renewable,specialterms,price_1000_kwh,price_500_kwh,price_2000_kwh, publish_product_date,product_inactive_date,enrollment_productid,product_batch_rate  
  console.log(utilityarea,contact_email.value,title,profileurl,profile_logo,product_name,terms_month,fixed,customer_type,cancelation_fee,fact_sheet,terms_of_service,phone,sign_up,minimum_usage_fee,renewable,specialterms,price_1000_kwh,price_500_kwh,price_2000_kwh, publish_product_date,product_inactive_date,enrollment_productid,product_batch_rate,basefee  );
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // // headers.append('Authorization', 'JWT ' +  this.authentication);
    // headers.append('Authorization', 'JWT ' + localStorage.getItem('token'));
    // console.log('pofile', localStorage.getItem('token'));  
    this.price_rate= '600 kWh '+'..900 kWh '+'..1200 kwh '+'..1500 kwh '+this.price_1500_kwh 
    
    this.https.post(Config.api + 'addproduct/',JSON.stringify( {
      // 'zipcode':zipcode,
      "serviceareaname": utilityarea,
      "title": title,
      "profileurl": profileurl,
      "profile_logo": profile_logo,
      // "plan_information": plan_information,
      "price_rate":this.price_rate  ,
      'product_name':product_name,
      'rate_type':this.fixed,
      'terms_month':terms_month+' '+'Months',
      'customer_type':this.customer,
      "cancelation_fee": cancelation_fee,
      "fact_sheet": this.fact_sheet,
      "terms_of_service":this.terms_of_service,
      "phone": phone,
      "sign_up": sign_up,
      // "minumum_usage_fee": minimum_usage_fee,
      "renewable": renewable,
      "specialterms": specialterms,
      "price_1000_kwh": price_1000_kwh,
      "price_500_kwh": price_500_kwh,
      "price_2000_kwh": price_2000_kwh,
      "contact_email": contact_email,
      "minumum_usage_fee":this.pricing,

      'publish_product_date': moment(publish_product_date).format('YYYY-MM-DD'),
      'product_inactive_date': moment(product_inactive_date).format('YYYY-MM-DD'),
      "enrollment_productid":enrollment_productid,
      "product_batch_rate":product_batch_rate,
      "check":false,
      "active":true,
      "basefee":basefee
    }), { headers: headers })
      .subscribe(Res => {
        console.log(Res);
        console.log(this.model);
        swal(
          'Successfully added your new plan !',
          'ChoiceGenie',
          'success'
        )
        // this.router.navigate(['/'])
        this.router.navigate(['/dashboard/' + this.username]);
        
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