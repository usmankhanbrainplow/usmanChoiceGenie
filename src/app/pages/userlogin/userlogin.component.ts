import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from '../../Config';
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { SimpleGlobal } from 'ng2-simple-global';
import { ResponseContentType } from '@angular/http/src/enums';
import { Console } from '@angular/core/src/console';
import { Observable } from "rxjs/Observable";
// import { Headers, Http, Response } from '@angular/http';
import swal from 'sweetalert2';
import { TOUCHEND_HIDE_DELAY } from '@angular/material';
// import { HomeRoutes } from '../../home/home.routing';
import { RecaptchaComponent } from 'recaptcha-blackgeeks';
import { HttpService } from '../../serv/http-service';

import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { PasswordValidation } from './password-validator.component';
import { DataService } from '../../data.service';
import { UserLoginService } from './userlogin.service';
declare var $: any;
declare interface ValidatorFn {
  (c: AbstractControl): {
    [key: string]: any;
  };
}
declare interface User {
  username?: string; // required, must be 5-8 characters
  email?: string; // required, must be valid email format
  password?: string; // required, value must be equal to confirm password.
  confirmPassword?: string; // required, value must be equal to password.
  number?: number; // required, value must be equal to password.
  url?: string;
  idSource?: string;
  idDestination?: string;
  optionsCheckboxes?: boolean;
}
@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.scss']
})
export class UserloginComponent implements OnInit {
  @ViewChild(RecaptchaComponent) captcha: RecaptchaComponent;
  isCaptcha = false;

  public typeValidation: User;
  register: FormGroup;
  staySignedIn: boolean = true;
  Email;
  login: FormGroup;
  type: FormGroup;
  test: Date = new Date();
  private toggleButton: any;
  private sidebarVisible: boolean;
  private nativeElement: Node;
  public username;
  password;
  hide = true;
  islogin = true;
  i;
  isequal;
  word;
  role;
  data: any = [];
  Datarole: any;
  hel: any = [];
  currentUser;
  massage;
    tit: any = [];
    title;
  constructor(public router: Router, private element: ElementRef, private http: Http, private route: ActivatedRoute,
    private sg: SimpleGlobal, private _nav: Router, private _serv: UserLoginService, private formBuilder: FormBuilder, private https: HttpClient,private _http5: HttpService) {
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;

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
  fetchzip() {
    console.log(this.username, "checl_role", localStorage.getItem('token'))
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'JWT ' + localStorage.getItem('token'));
    console.log('user_profile', localStorage.getItem('token'));
    this.http.get(Config.api + 'check_role/' + this.username + '/', { headers: headers })

      .subscribe(Res => {
        this.data = Res.json();
        console.log(this.data);
        this.role = this.data.Role;
        localStorage.setItem('role', this.role);
      });

  }
  onLogin() {
    if (this.captcha.getResponse()) {
      console.log('equ ok');
      // alert("login");
      this.isequal = true;
      if (this.username != '' || this.password != '') {

        this._serv.isactivated(this.login.value.username).subscribe(
          data => {
            this._serv.login(this.login.value.username, this.login.value.password).subscribe(
              data => {
                console.log(data);
                // this.fetchzip();
                console.log(this.username, "checl_role", localStorage.getItem('token'))
                let headers = new Headers();
                headers.append('Content-Type', 'application/json');
               headers.append('Authorization', 'JWT ' +  localStorage.getItem('token'));
                // headers.append('Authorization', 'JWT ' + localStorage.getItem('token'));
                console.log('user_profile', localStorage.getItem('token'));
                this._http5.get(Config.api + 'check_role/' + this.username + '/', { headers: headers })
            
                  .subscribe(Res => {
                    this.Datarole = Res.json();
                    console.log(this.Datarole);
                    this.role = this.Datarole.Role;
                    localStorage.setItem('role', this.role);
                    
                console.log(Res.json()['Results']);
                this.hel = Res.json()['Results'];
                // this.massage = Res.json()['Message'];
                // localStorage.setItem('massage', this.massage);
              
                // localStorage.setItem('user', this.word);
                // localStorage.setItem('username', this.word.trim());
                // localStorage.setItem('token', Res.json()['token']);
                    if (this.role == "USER") {
                      this.router.navigate(['/userprofile']);
                      localStorage.setItem('username', this.username);
                    }
                    else if(this.role=="Not Deregulatedstate Vendor"){
                      console.log(this.massage);
                      this.tit = this.hel[0];
                      console.log(this.tit);
                      this.word = this.tit.title;
                      console.log(this.word);
                      // dashboard/:username
                      // this.router.navigate(['/dashboard/:username']);
                      this.router.navigate(['/dashboard/' + this.username]);
                      // localStorage.setItem('change', this.username);
                      localStorage.setItem('username', this.username);
                      localStorage.setItem('title', this.tit.title);
                    }
                    else if(this.role=="Deregulatedstate Vendor"){
                      console.log(this.massage);
                      this.tit = this.hel[0];
                      console.log(this.tit);
                      this.word = this.tit.title;
                      console.log(this.word);
                      this.router.navigate(['/dashboards/' + this.username]);
                      localStorage.setItem('username', this.username);
                      localStorage.setItem('title', this.tit.title);
  
                      // localStorage.setItem('username', this.word);
    
                    }
                  });
                  // swal({
                  //   text: "Please Enter Valid Zipcode",
                  //   title: "Choice Genie",
                  //   type: "success",
                  //   showConfirmButton: false,
                  //   timer: 200000,
                  //   width: '512px',
                  //   //confirmButtonText: "OK",
        
                  // })
                swal({
                  type: 'success',
                  title: 'Successfully Logged in',
                  showConfirmButton: false,
                  // height:'300px',
                  timer: 1000
                });
              
              },
              error => {
                console.log(error);

                swal(
                  'Invalid',
                  'Username OR Password',
                  'error'
                )

              });
          },
          error => {

            swal(
              'Error',
              'User does not exist Please Check Your email for activation registation',
              'error'
            )
          }
        );

      }
      else {
        this.validateAllFormFields(this.login);
      }
    }
    else {
      this.captcha.reset();
      this.isequal = false;
      // this.islogin = true;
    }
    if (this.staySignedIn == false) {
      localStorage.setItem('signed', 'false');
      console.log(this.staySignedIn)
    }
  }
  checked(event, i) {
    if (event.target.checked == true) {
      console.log(event.target.checked)
      this.staySignedIn = true;
    }
    else if (event.target.checked == false) {
      console.log(event.target.checked)
      this.staySignedIn = false;

    }

  }
  foremail() {

  }
  model: any = {};
  forgetpass(Email) {
    //alert('hello');
    console.log("CHOICE GENIE", this.username);

    let headers = new HttpHeaders();


    headers.append('Content-Type', 'application/json');

    this.https.post(Config.api + 'forget_password/' + this.username, { "email": Email }, { headers: headers })

      .subscribe(Res => {
        this.router.navigate(['/forgetpassword/']);
        console.log(Res);
        // this.next = Res[0].next;

        console.log(this.username);

      },
        error => {
          console.log(error);
          //  this.toastr.error(error, null, {toastLife: 5000});
          swal(
            'Invalid',
            'User Already Exist! or May be Some Error!',
            'error'
          )

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
  recaptcha;
  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
    this.recaptcha = captchaResponse;
  }
  ngOnInit() {
    this.login = this.formBuilder.group({
      // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
      username: ['', Validators.compose([Validators.required])],
      // We can use more than one validator per field. If we want to use more than one validator we have to wrap our array of validators with a Validators.compose function. Here we are using a required, minimum length and maximum length validator.
      password: ['', Validators.compose([Validators.required])],
      Email: ['', Validators.compose([])],
      staySignedIn: ['', Validators.compose([])],
    });


    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

    setTimeout(function () {
      // after 1000 ms we add the class animated to the login/register card
      $('.card').removeClass('card-hidden');
    }, 700);
  }

  sidebarToggle() {
    var toggleButton = this.toggleButton;
    var body = document.getElementsByTagName('body')[0];
    var sidebar = document.getElementsByClassName('navbar-collapse')[0];
    if (this.sidebarVisible == false) {
      setTimeout(function () {
        toggleButton.classList.add('toggled');
      }, 500);
      body.classList.add('nav-open');
      this.sidebarVisible = true;
    } else {
      this.toggleButton.classList.remove('toggled');
      this.sidebarVisible = false;
      body.classList.remove('nav-open');
    }
  }
}
