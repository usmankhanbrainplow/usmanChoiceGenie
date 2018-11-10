import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from '../../Config';
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
 

import { ActivatedRoute, Router, RouterModule, NavigationExtras } from "@angular/router";
import { SimpleGlobal } from 'ng2-simple-global';
 
import swal from 'sweetalert2';
 
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { PasswordValidation } from './password-validator.component';
import { LoginService } from './login.service';
import { DataService } from '../../data.service';
import { DataloginService } from './datalogin.service';
import { RecaptchaComponent } from 'recaptcha-blackgeeks';
 
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
  selector: 'app-login-cmp',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  // @ViewChild('username') el: ElementRef : RecaptchaComponent;
  @ViewChild(RecaptchaComponent) captcha: RecaptchaComponent;
  isCaptcha = false;
  statuslogin: any;
  returnUrl: string;
  hide = true;
  public typeValidation: User;
  register: FormGroup;
  login: FormGroup;
  type: FormGroup;
  test: Date = new Date();
  private toggleButton: any;
  private sidebarVisible: boolean;
  private nativeElement: Node;
  public username;
  public title;
  i;
  Email;
  status;
  islogin = true;
  isequal;
  staySignedIn:boolean=true;
  // returnUrl: string;


  password;


  constructor(public router: Router, private element: ElementRef, private http: Http, private route: ActivatedRoute,
    private sg: SimpleGlobal, private _nav: Router, private _serv: LoginService, private fb: FormBuilder, private https: HttpClient,
    private authenticationservice: DataloginService) {

    {
      this.nativeElement = element.nativeElement;
      this.sidebarVisible = false;
    }


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

  result: any = [];
  massage;
  onLogin() {

    if (this.captcha.getResponse()) {
      console.log('equ ok');
      // alert("login");
      this.isequal = true;
      if (this.username != '' || this.password != '') {
        this._serv.login_authenticate(this.login.value.username, this.login.value.password).subscribe(
          data => {

            this._serv.login(this.login.value.username, this.login.value.password).subscribe(
              data => {
                this.result = data;
                console.log(this.result)


                swal({
                  type: 'success',
                  title: 'Successfully Logged in',
                  showConfirmButton: false,
                  timer: 1500
                });

              },
              error => {

                swal(
                  'Invalid',
                  'Username OR Password',
                  'error'
                )

              }
            );

          },

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
    if(this.staySignedIn == false){
      localStorage.setItem('signed', 'false');
      console.log(this.staySignedIn)
    }
  }
  checked(event, i) {
    if (event.target.checked == true) {
        console.log(event.target.checked)
        this.staySignedIn=true;
    }
    else if (event.target.checked == false) {
        console.log(event.target.checked)
        this.staySignedIn=false;

    }
  }
  model: any = {};
  forgetpass(Email) {
    console.log("CHOICE GENIE", this.username);

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.https.post(Config.api + 'forget_password/' + this.username, { "email": Email }, { headers: headers })

      .subscribe(Res => {
        this.router.navigate(['/forgetpassword/']);
        console.log(Res);
        console.log(this.username);

      },
        error => {
          console.log(error);

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
  // recaptcha;
  // resolved(captcha: string) {
  //   console.log(`Resolved captcha with response ${captcha}:`);
  //   let status = this.captcha.getResponse();
  //   status=this.recaptcha();
  //   // this.recaptcha = captchaResponse;
  //   }

  ngOnInit() {

    this.login = this.fb.group({
      username: ['', Validators.compose([Validators.required])],
      // We can use more than one validator per field. If we want to use more than one validator we have to wrap our array of validators with a Validators.compose function. Here we are using a required, minimum length and maximum length validator.
      password: ['', Validators.compose([Validators.required])],
      // title: ['', Validators.compose([Validators.required])],
      Email: ['', Validators.compose([])],
      staySignedIn:['', Validators.compose([])],
    });

    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    this.captcha.reset();
    Observable.interval(90000).takeWhile(() => true).subscribe(() => this.captcha.reset());

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
