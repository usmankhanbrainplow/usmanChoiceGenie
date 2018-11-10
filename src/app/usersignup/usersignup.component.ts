
import { Component, OnInit, ElementRef } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'

import { Config } from "../Config";
import { ActivatedRoute, Router } from "@angular/router";
import { SimpleGlobal } from 'ng2-simple-global';
import { ResponseContentType } from '@angular/http/src/enums';
import { FormBuilder, Validators, NgControl, RadioControlValueAccessor, FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import swal from 'sweetalert2';
import { MatSelect } from '@angular/material';
import { LoginService } from '../pages/login/login.service';
import { PasswordValidation } from './password-validator.component';
import { ViewChild } from '@angular/core';
import { RecaptchaComponent } from 'recaptcha-blackgeeks';



@Component({
  selector: 'app-usersignup',
  templateUrl: './usersignup.component.html',
  styleUrls: ['./usersignup.component.scss']
})

export class UsersignupComponent implements OnInit {
  @ViewChild(RecaptchaComponent) captcha: RecaptchaComponent;
  // @ViewChild('username') el:ElementRef; captcha: RecaptchaComponent
  state;
  city;
  username;
  confirmpassword;
  signupForm: FormGroup;
  private next: any;
  model: any = {};
  normalPattern = '[a-zA-Z0-9_.-]+?';
  digitsOnly = '^[0-9,-]+$';
  email = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  usernameOnly = '[a-zA-Z0-9_.]+';
  public phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  useronly = '[a-zA-Z0-9_.]+';

  flag = true;
  date = new FormControl(new Date());
  hide = true;
  emailexist: boolean = true;
  usernameexist: boolean = true;
  service_zip;
  isequal;
  constructor(private _serv: LoginService, public router: Router, private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private sg: SimpleGlobal) {
    // this.captcha.reset();
    // let status = this.captcha.getResponse();
  }

  ngOnInit() {


    // this.city();
    this.signupForm = this.fb.group({

      'name': ['', Validators.compose([Validators.required])],
      'service_zip': ['', Validators.compose([Validators.required, Validators.pattern(this.digitsOnly), Validators.minLength(5)])],

      'email': ['', Validators.compose([Validators.required, Validators.pattern(this.email)])],
      'username': ['', Validators.compose([Validators.required, Validators.pattern(this.useronly)])],

      'phoneno': ['', Validators.compose([Validators.required])],
      // 'dob': ['', Validators.compose([Validators.required])],
      'service_state': ['', Validators.compose([Validators.required])],
      'service_address': ['', Validators.compose([Validators.required])],
      'service_city': ['', Validators.compose([Validators.required])],

      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      'confirmpassword': ['', Validators.compose([Validators.required, Validators.minLength(6)])],


    },
      {
        validator: PasswordValidation.MatchPassword // your validation method
      });
    // this.captcha.reset();
    // let status = this.captcha.getResponse();
  }

  onChange(e) {
    alert(e)
  }
  check(e) {
    console.log(this.model)
  }

  email1;

  emailCheck(email1) {
    // alert(this.premiseID.toString().length)
    //  alert('hello');
    console.log("CHocie Genie", this.model.email);

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.http.get(Config.api + 'email_exist/' + email1, { headers: headers })

      .subscribe(data => {
        console.log(data);
        console.log(data['status'], 'hhhhhhhhhhhhhhh')
        this.emailexist = data['status'];

        console.log(this.model.email);



      });
  }

  // usernameexist;
  usernameCheck(username1) {
    //alert('hello');
    console.log("CHOICE GENIE", this.model.username);

    let headers = new HttpHeaders();


    headers.append('Content-Type', 'application/json');
    // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
    this.http.get(Config.api + 'usernameexist/' + username1 + '/', { headers: headers })


      //   // this.http.post(Config.api + 'signup/'+ this.zip_code +'', {"premiseid": this.premiseID +'', {headers: headers})
      .subscribe(data => {
        console.log(data);
        // this.next = Res[0].next;
        console.log(data['status'], 'hhhhhhhhhhhhhhh')
        // if ( this.usernameexist=false){
        this.usernameexist = data['status']
        // }
        //  console.log(this.usernameexist);

      },
        error => {
          //   this.usernameexist=error['status']
          console.log(error);

          //   f.resetForm();
        });



  }


  states(zip) {
    //alert('hello');
    console.log("CHOICE GENIE", zip);
    // alert("REP_certificate_id1"+this.REP_certificate_id);

    let headers = new HttpHeaders();


    headers.append('Content-Type', 'application/json');
    // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),http://192.168.30.237:9000/choice/
    this.http.get(Config.api + 'zipcodewith_country_city/' + zip, { headers: headers })

      .subscribe(Response => {
        console.log(Response);
        // this.next = Res[0].next;
        console.log(Response['zipcode'], 'hhhhhhhhhhhhhhh')
        console.log(Response['country'], 'hhhhhhhhhhhhhhh')
        console.log(Response['city'], 'hhhhhhhhhhhhhhh')
        // if ( this.usernameexist=false){
        // this.model['zip'] = data['zipcode']
        this.model['service_state'] = Response['State']
        this.model['service_city'] = Response['City']
        // }
        //  console.log(this.usernameexist);

      },
        error => {
          //   this.usernameexist=error['status']
          console.log(error);

          //   f.resetForm();
        });



  }
  cities() {
    // alert(this.premiseID.toString().length)
    //  alert('hello');


    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
    this.http.get(Config.api + 'city/' + this.model.state + '', { headers: headers })

      //  this.http.get(Config.api + 'signup/'+ this.zip_code +'', {headers: headers})
      .subscribe(Res => {
        console.log(Res);
        //  this.sQuestion = Res[0].sQuestion;
        // this.state = Res[0].state;
        this.city = Res;

      });
  }
  Email() {

    console.log("CHOICE GENIE", this.model);

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.http.post(Config.api + 'authenticade_code/', JSON.stringify(this.model.email) + '', { headers: headers })


      .subscribe(Res => {
        console.log(Res);
        console.log(this.model.email);


      });

  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      // console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  clear() {
    this.model['service_state'].clear();
  }
  signupuserdata() {

    //console.log("main form",this.signupForm.value)
    if (this.captcha.getResponse()) {
      this.isequal = true;
      console.log("CHOICE GENIE", this.model);
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      this.http.post(Config.api + 'Usersignup/', this.model, { headers: headers })
        .subscribe(Res => {
          console.log(Res);
          // alert('hello');
          console.log(this.model);
          swal({
            text: "Register Successflluy! Please go to Your email to active your account",
            title: "Choice Genie",
            type: "success",
            showConfirmButton: false,
            timer: 1200,
            confirmButtonText: "OK",

          })
          //  f.resetForm();
          this.router.navigate(['/userlogin'])
        },
          error => {
            this.validateAllFormFields(this.model);
            console.log(error);
          });

    }

    else {
      this.captcha.reset();
      this.isequal = false;
      // this.islogin = true;
    }
  }


}
