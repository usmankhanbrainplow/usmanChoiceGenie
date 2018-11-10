
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
  price_2000_kwh
  emailexist: boolean = false;
  isLinear = true;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  constructor(private https: Http, public router: Router, private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private sg: SimpleGlobal) { }
  title;

  public user;
  ngOnInit() {
    this.user = localStorage.getItem('user')
    this.username = localStorage.getItem('username')
    console.log(this.username)
    this.fetchProducts()
    console.log(this.username)
    this.signupForm = this.fb.group({
      'zipcode': ['', Validators.compose([Validators.required])],
      'utilityarea': ['', Validators.compose([Validators.required])],
      'contact_email': ['', Validators.compose([Validators.required, Validators.pattern(this.email)])],

    });
    this.secondFormGroup = this.fb.group({
      'plan_information': ['', Validators.compose([Validators.required])],
      'price_rate': ['', Validators.compose([Validators.required])],
      'cancelation_fee': ['', Validators.compose([Validators.required])],
    });
    this.thirdFormGroup = this.fb.group({
      'fact_sheet': ['', Validators.compose([Validators.required])],
      'terms_of_service': ['', Validators.compose([Validators.required])],
      'phone': ['', Validators.compose([Validators.required])],
      'minimum_usage_fee': ['', Validators.compose([Validators.required])],
      'renewable': ['', Validators.compose([Validators.required])],
    });
    this.fourthFormGroup = this.fb.group({
      'specialterms': ['', Validators.compose([Validators.required])],
      'price_1000_kwh': ['', Validators.compose([Validators.required])],
      'price_500_kwh': ['', Validators.compose([Validators.required])],
      'price_2000_kwh': ['', Validators.compose([Validators.required])],
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

  onSubmit(f) {
    f.resetForm();
  }
  signupuserdata(zipcode,utilityarea, contact_email, title, profileurl, profile_logo, plan_information, price_rate, cancelation_fee, fact_sheet, terms_of_service, phone, sign_up, minimum_usage_fee, renewable, specialterms, price_1000_kwh, price_500_kwh, price_2000_kwh) {
    console.log(utilityarea, title, profileurl, profile_logo, plan_information, price_rate, cancelation_fee, fact_sheet, terms_of_service, phone, sign_up, minimum_usage_fee, renewable, specialterms, price_1000_kwh, price_500_kwh, price_2000_kwh);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'JWT ' +  this.authentication);
    headers.append('Authorization', 'JWT ' + localStorage.getItem('token'));
    console.log('pofile', localStorage.getItem('token'));  
    this.https.post(Config.api + 'addproduct/',JSON.stringify( {
      'zipcode':zipcode,
      "serviceareaname": utilityarea,
      "title": title,
      "profileurl": profileurl,
      "profile_logo": profile_logo,
      "plan_information": plan_information,
      "price_rate": price_rate,
      "cancelation_fee": cancelation_fee,
      "fact_sheet": fact_sheet,
      "terms_of_service": terms_of_service,
      "phone": phone,
      "sign_up": sign_up,
      "minumum_usage_fee": minimum_usage_fee,
      "renewable": renewable,
      "specialterms": specialterms,
      "price_1000_kwh": price_1000_kwh,
      "price_500_kwh": price_500_kwh,
      "price_2000_kwh": price_2000_kwh,
      "contact_email": contact_email
    }), { headers: headers })
      .subscribe(Res => {
        console.log(Res);
        console.log(this.model);
        swal({
          text: "Successfully Added!",
          title: "Choice Genie",
          type: "success",
          showConfirmButton: false,
          timer: 1200,
          confirmButtonText: "OK",

        })
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

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');


    this.http.get(Config.api + 'companytitle/', { headers: headers })


      .subscribe(Res => {
        console.log(Res);

        this.title = Res;




      });
  }


}