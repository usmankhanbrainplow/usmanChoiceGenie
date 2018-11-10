import { Component, OnInit } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { ErrorStateMatcher, MatStepper } from '@angular/material';
import { Config } from "../Config";
import { ActivatedRoute, Router } from "@angular/router";
import { SimpleGlobal } from 'ng2-simple-global';
import { ResponseContentType } from '@angular/http/src/enums';
import { FormBuilder, Validators, NgControl, RadioControlValueAccessor, FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import swal from 'sweetalert2';
import { MatSelect } from '@angular/material';
import { PasswordValidation } from './password-validator.component';
import { ViewChild } from '@angular/core';
import { RecaptchaComponent } from 'recaptcha-blackgeeks';
@Component({
  selector: 'app-signup1',
  templateUrl: './signup1.component.html',
  styleUrls: ['./signup1.component.scss']
})
export class Signup1Component implements OnInit {
  @ViewChild(RecaptchaComponent) captcha: RecaptchaComponent;
  state: any = [];
  city;
  username;
  confirmpassword;
  password;
  signupForm: FormGroup;
  private next: any;
  model: any = {};
  normalPattern = '[a-zA-Z0-9_.-]+?';
  digitsOnly = '^[0-9,-]+$';
  useronly='[a-zA-Z0-9_.]+';
  email = '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$';
  public phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  flag = true;
  status: boolean = true;
  date = new FormControl(new Date());
  emailexist: boolean = true;
  hide = true;
  repname;
  isequal;
  constructor(public router: Router, private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute,
    private sg: SimpleGlobal) { }
  ngOnInit() {
    this.states();
    // this.city();
    this.signupForm = this.fb.group({
      'repid': ['', Validators.compose([Validators.required, Validators.pattern(this.digitsOnly)])],
      'repname': ['', Validators.compose([Validators.required])],
      'email': ['', Validators.compose([Validators.required, Validators.pattern(this.email)])],
      'contact_email': ['', Validators.compose([Validators.required, Validators.pattern(this.email)])],
      'username': ['', Validators.compose([Validators.required, Validators.pattern(this.useronly)])],
      'contactphone': ['', Validators.compose([Validators.required])],
      //  'Market': ['', Validators.compose([Validators.required])],
      'contactname': ['', Validators.compose([Validators.required])],
     
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      'confirmpassword': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    },
      {
        validator: PasswordValidation.MatchPassword // your validation method
      });

  }

  onChange(e) {
    alert(e)
  }

  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }

  displayFieldCss(form: FormGroup, field: string) {
    return {
      'has-error': this.isFieldValid(form, field),
      'has-feedback': this.isFieldValid(form, field)
    };
  }

  check(e) {
    console.log(this.model)
  }
  emailauthentication() {
    // alert(this.premiseID.toString().length)
    //  alert('hello');
    console.log(this.model.email);

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
    this.http.post(Config.api + 'code/' + this.model.username, { headers: headers })

      //  this.http.get(Config.api + 'signup/'+ this.zip_code +'', {headers: headers})
      .subscribe(Res => {
        console.log(Res);
       
      });
  }
  states() {
  
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
    this.http.get(Config.api + 'state/', { headers: headers })

     
      .subscribe(Res => {
        console.log(Res);
       
        this.state = Res;


        // this.data.changeProducts(this.sg['products']);

      });
  }
  cities() {
    

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.http.get(Config.api + 'city/' + this.model.state + '', { headers: headers })

      //  this.http.get(Config.api + 'signup/'+ this.zip_code +'', {headers: headers})
      .subscribe(Res => {
        console.log(Res);
      
        this.city = Res;

      });
  }
 
  signupuserdata() {
    //alert('hello');
    if (this.captcha.getResponse()) {
      this.isequal = true;
    console.log("CHOICE GENIE", this.model);

    let headers = new HttpHeaders();


    headers.append('Content-Type', 'application/json');
   
    this.http.post(Config.api + 'companysignup/', this.model, { headers: headers })
   
      .subscribe(Res => {
        console.log(Res);
        swal({
          type: 'success',
          title: 'Successfully Logged in',
          showConfirmButton: false,
          // height:'300px',
          timer: 1000
        });
      
       // this.router.navigate(['/login/'])
      },
        error => {
          console.log(error);
          
        });
      }
      else {
        this.captcha.reset();
        this.isequal = false;
        // this.islogin = true;
      }
   


  }
  emailCheck(email1) {
  
    console.log("CHocie Genie", this.model.email);

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.http.get(Config.api + 'email_exist/' + email1 , { headers: headers })

      .subscribe(data => {
        console.log(data);
        console.log(data['status'], 'hhhhhhhhhhhhhhh')
        this.emailexist = data['status'];

        console.log(this.model.email);



      });
  }

  Checkzipcode(REP_certificate_id1) {
    //alert('hello');
    console.log("CHOICE GENIE", this.model.REP_certificate_id);
    // alert("REP_certificate_id1"+this.REP_certificate_id);

    let headers = new HttpHeaders();


    headers.append('Content-Type', 'application/json');
 
    this.http.get(Config.api + 'repname/' + REP_certificate_id1, { headers: headers })
      .subscribe(data => {
        console.log(data);
        // this.next = Res[0].next;
        console.log(data['REP_Name'], 'hhhhhhhhhhhhhhh')
        // if ( this.usernameexist=false){
        this.model['repname'] = data['REP_Name']
        // }
        //  console.log(this.usernameexist);

      },
        error => {
          //   this.usernameexist=error['status']
          console.log(error);

          //   f.resetForm();
        });



  }
  usernameexist: boolean = true;
  usernameCheck(username1) {
    console.log("CHOICE GENIE", this.model.username);

    let headers = new HttpHeaders();


    headers.append('Content-Type', 'application/json');
 
    this.http.get(Config.api + 'usernameexist/' + username1 + '/', { headers: headers })

      .subscribe(data => {
        console.log(data);
       
        console.log(data['status'], 'hhhhhhhhhhhhhhh')
        this.usernameexist = data['status']
      
      },
        error => {
         
          console.log(error);
         
        });
   

  }

}