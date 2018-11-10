import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { Config } from "../Config";
import { ActivatedRoute, Router } from "@angular/router";
import { SimpleGlobal } from 'ng2-simple-global';

import { FormBuilder, Validators, NgControl, RadioControlValueAccessor, FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import swal from 'sweetalert2';



const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const NAME_REGEX = /^[a-zA-Z _.]+$/;
const PHONE_REGEX = /^[0-9]+$/;
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {
//  date = new Date(1992, 3, 15);
today = Date.now();
date;
  state;
  city;
  username;
  confirmpassword;
  signupForm: FormGroup;
  private next: any;
   name;
  mobno;
  email;
  msg;
  // date;
  subject;
  model: any = {};
  normalPattern = '[a-zA-Z0-9_.-]+?';
  digitsOnly = '^[0-9,-]+$';
  // email = '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$';

  flag = true;
  // date = new FormControl(new Date());

  emailexist: boolean = false;
  usernameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(NAME_REGEX)
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(EMAIL_REGEX)
  ]);

  phoneFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(PHONE_REGEX)
  ]);

  subjectFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z-0-9 _.]+?')
  ]);
  constructor(public router: Router, private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private sg: SimpleGlobal) { }

  //constructor() { }


  ngOnInit() {
    // today = Date.now();
    
    this.signupForm = this.fb.group({
      //['', Validators.compose([Validators.required])],
      'name': ['', Validators.compose([Validators.requiredTrue])],
      'mobno': ['', Validators.compose([Validators.required])],
      'msg': ['', Validators.compose([Validators.required])],
      'email': ['', Validators.compose([Validators.required])],
      'subject':['', Validators.compose([Validators.required])],
      // 'date':['', Validators.compose([Validators.required])]

      // 'Phone': ['', Validators.compose([Validators.required, Validators.pattern(this.digitsOnly)])],
      // 'country': ['', Validators.compose([Validators.required, Validators.pattern(this.normalPattern)])],

    });
    // this.date=Date.now();
  }

  onChange(e) {
    alert(e)
  }
  check(e) {
    console.log(this.model)
  }

  // name;
  // mobno;
  // msg;
  // subject;
//   cleardata(){
   
//  this.model.name= null;
//  this.model.mobno=null;
//  this.model.msg=null;
//  this.model.subject=null;
//  this.model.email=null;


//   }
onSubmit(f) {
  f.resetForm();
}
Contactuserdata(name,mobno,email,msg,date,subject) {
  console.log(name,mobno,email,msg,date,subject);
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');    
  this.http.post(Config.api+'contactus/', {
    "name": name,
    "mobno":mobno,
    "email":email,
    "msg":msg,
    "date":date,
    "subject":subject

  }, { headers: headers })
    .subscribe(Res => {
      console.log(Res);
      console.log(this.model);
      swal({
      text: "Thank you for Successflluy Contact Us ",
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





   }


}
