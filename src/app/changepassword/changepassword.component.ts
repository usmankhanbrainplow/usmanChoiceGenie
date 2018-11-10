import { ChangepasswordService } from '../changepassword.service';
import { Component, OnInit } from '@angular/core';
// import {FormControl, Validators} from '@angular/forms';
import { NgForm } from '@angular/forms';
// import {ContactUsService} from "./contact-us.service";
import { AgmCoreModule } from '@agm/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { Config } from "../Config";
import { ActivatedRoute, Router } from "@angular/router";
import { SimpleGlobal } from 'ng2-simple-global';
import { ResponseContentType } from '@angular/http/src/enums';
import { FormBuilder, Validators, NgControl, RadioControlValueAccessor, FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import swal from 'sweetalert2';
import { MatSelect } from '@angular/material';
import { PasswordValidation } from './password-validator.component';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  hide = true;
public username;
  constructor(private fb: FormBuilder,private serve:ChangepasswordService) { }
  oldpass;
  pass1;
  pass2;
  signupForm: FormGroup;
  ngOnInit() {
    this.username = localStorage.getItem('custum')
    this.username = localStorage.getItem('change')
    this.username = localStorage.getItem('username')
    
    console.log(this.username)
    this.signupForm = this.fb.group({
      'oldpass': ['', Validators.compose([Validators.required])],
      'pass1': ['', Validators.compose([Validators.required])],
      'pass2': ['', Validators.compose([Validators.required])],

    },{
      validator: PasswordValidation.MatchPassword // your validation method
    });
  }
  editClick(oldpass,pass1,pass2) {
    console.log('edit',this.username,oldpass,pass1,pass2 );
console.log("TS OBJECT",);
    this.serve.changepsd(this.username,oldpass,pass1,pass2 ).subscribe(data => {
        console.log(data);
        swal({
            type: 'success',
            title: 'Updated Your Profile',
            showConfirmButton: false,
            timer: 1500
          })
    }, error => {

    });

}
}
