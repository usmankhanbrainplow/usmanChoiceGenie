import { Component, OnInit , Directive, Input } from '@angular/core';
// import { Headers, Http, Response } from '@angular/http';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { Config } from '../../Config';
import { ActivatedRoute, Router } from "@angular/router";
import { SimpleGlobal } from 'ng2-simple-global';
import { ResponseContentType } from '@angular/http/src/enums';
import { FormBuilder, Validators, NgControl, RadioControlValueAccessor, FormControl, FormGroup } from '@angular/forms';
// import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
 import swal from 'sweetalert2';
import { MatSelect } from '@angular/material';

import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';
@Component({
  selector: 'app-new-products',
  templateUrl: './new-products.component.html',
  styleUrls: ['./new-products.component.scss']
})
export class NewProductsComponent implements OnInit {
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
  contact_email;
  sign_up;
  minimum_usage_fee;
  renewable;
  fact_sheet;
  spectialterms;
  price_1000_kwh;
  price_500_kwh;
  price_2000_kwh;
  // zipcode;
  emailexist: boolean = false;
  isLinear = true;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  constructor(private https:Http,public router: Router, private fb: FormBuilder, private http: Http, private route: ActivatedRoute, private sg: SimpleGlobal) { }
title;

  public user;
  ngOnInit() {
    this.user = localStorage.getItem('user')
    this.username = localStorage.getItem('username')
    console.log(this.username)
   this. fetchProducts()
    console.log(this.username)
    this.signupForm = this.fb.group({
      'zipcode': ['', Validators.compose([Validators.required])],
      'utilityarea': ['', Validators.compose([Validators.required])],
     'contact_email':['', Validators.compose([Validators.required, Validators.pattern(this.email)])],

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
  check(e){}
  data:any=[];
  word:any=[];
  tit;
  only;
  prourl;
  prologo;
  sign;
  word2 :any=[];
  fetchProducts() {
       
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    this.https.get(Config.api+'titlescompanies/'+ this.username  ,{ headers: headers })
    .subscribe(Res => {
    this.sg['products'] = Res.json()['Results'];
    this.data=this.sg['products'];
    console.log(this.data);
this.word=this.data[5];
this.prourl=this.word.profileurl;
console.log(this.prourl,'company')

this.prologo=this.word.profile_logo;
console.log(this.prologo,'link')
alert(this.prologo)
this.word2=this.data[0];
this.sign=this.word2.sign_up;
console.log(this.sign,"company sign up")

this.tit=this.word.title;
this.only=this.tit
console.log(this.tit)
    });
    
    } 

    onSubmit(f) {
      f.resetForm();
    }
  signupuserdata(zipcode,utilityarea,contact_email,title,profileurl,profile_logo,plan_information,price_rate,cancelation_fee,fact_sheet,terms_of_service,phone,sign_up,minimum_usage_fee,renewable,specialterms,price_1000_kwh,price_500_kwh,price_2000_kwh) {
    console.log(utilityarea,contact_email,title,profileurl,profile_logo,plan_information,price_rate,cancelation_fee,fact_sheet,terms_of_service,phone,sign_up,minimum_usage_fee,renewable,specialterms,price_1000_kwh,price_500_kwh,price_2000_kwh);
   
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'JWT ' +  this.authentication);
    headers.append('Authorization', 'JWT ' + localStorage.getItem('token'));
    console.log('pofile', localStorage.getItem('token'));
   
      
   return this.http.post(Config.api+'deregulated_add_product/',JSON.stringify({
      "zipcode":zipcode,
      "serviceareaname":utilityarea,
      "title":title,
      "profileurl":profileurl,
      "profile_logo":profile_logo,
      "plan_information":plan_information,
      "price_rate":price_rate,
      "cancelation_fee":cancelation_fee,
      "fact_sheet":fact_sheet,
      "terms_of_service":terms_of_service,
      "phone":phone,
      "sign_up":sign_up,
      "minumum_usage_fee":minimum_usage_fee,
      "renewable":renewable,
      "specialterms":specialterms,
      "price_1000_kwh":price_1000_kwh,
      "price_500_kwh":price_500_kwh,
      "price_2000_kwh":price_2000_kwh,
      "contact_email":contact_email
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

  // filter(page,id,months1,months2,months3,months4,months5,months6,months7,fixed,vari,market,notprepaid,prepaid,planmin,time,nottime,renewable,name,sort,item,min500,max500,min1000,max1000,min2000,max2000,logo1,logo2,logo3,logo4,logo5,prepaidall,timeall,showallplanPB) {
  //   if(name){
  //       this.com=name.trim();}
  //       console.log(page,id,months1,months2,months3,months4,months5,months6,months7,fixed,vari,market,prepaidall,notprepaid,prepaid,planmin,timeall,time,nottime,renewable,name,sort,item,min500,max500,min1000,max1000,min2000,max2000,showallplanPB)
  //       const headers = new Headers();
  //       headers.append('Content-Type', 'application/json');
  //       return this.http.post(Config.api+'multifilter/'+id +'?page='+page, JSON.stringify({
  //         "plan_type1": fixed,
  //         "plan_type2": market,
  //         "plan_type3": vari,
  //         "plan_information1": months1,
  //         "plan_information2": months2,
  //         "plan_information3": months3,
  //         "plan_information4": months4,
  //         "plan_information5": months5,
  //         "plan_information6": months6,
  //         "plan_information7": months7,
  //         "prepaid": prepaid,
  //         "noprepaid": notprepaid,
  //         "planmin": planmin,
  //         "allplans":showallplanPB,
  //         "bothplanspre":prepaidall,
  //         "bothplanstim":timeall,
  //         "time":time,
  //         "notime":nottime,
  //         "renewablerate":renewable,
  //         "company":this.com,
  //         "itemsperpage":item,
    
  //         "price_500_kwh_min_price":min500, 
  //         "price_500_kwh_max_price":max500,
    
  //         "price_1000_kwh_min_price": min1000,
  //         "price_1000_kwh_max_price": max1000,      
    
  //         "price_2000_kwh_min_price": min2000,
  //         "price_2000_kwh_max_price": max2000,
    
  //         // "itemsperpage":this.items,
    
  //         "dsc":sort,
  //         "logo1":logo1,
  //         "logo2":logo2,
  //         "logo3":logo3,
  //         "logo4":logo4,
  //         "logo5":logo5
    
          
          
    
  //        }), 
  //       {headers: headers}).map((response: Response) => response.json());
  //       }
  company() {
   
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    this.http.get(Config.api +'companytitle/', { headers: headers })

    
      .subscribe(Res => {
        console.log(Res);
      
        this.title = Res;


      

      });
  }

}
