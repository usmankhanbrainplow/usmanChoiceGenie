import { Component, OnInit } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import {ErrorStateMatcher, MatStepper} from '@angular/material';
import { Config } from "../Config";
import { ActivatedRoute, Router } from "@angular/router";
import { SimpleGlobal } from 'ng2-simple-global';
import { ResponseContentType } from '@angular/http/src/enums';
import { FormBuilder, Validators, NgControl, RadioControlValueAccessor, FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
 import swal from 'sweetalert2'; 
import { MatSelect } from '@angular/material';
import { PasswordValidation } from './password-validator.component.1';

@Component({
  selector: 'app-forget_password',
  templateUrl: './forget_password.component.html',
  styleUrls: ['./forget_password.component.scss']
})
export class ForgetpasswordComponent implements OnInit {

  constructor(public router: Router, private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute,
    private sg: SimpleGlobal) { }
    pass1;
    pass2;
    qurey;
    sub;
    signupForm: FormGroup;
  ngOnInit() {
    this.signupForm = this.fb.group({
      'pass1': ['', Validators.compose([Validators.required])],
      // 'pass1': ['', Validators.compose([Validators.required])],
      'pass2': ['', Validators.compose([Validators.required])],
      
    },{
      validator: PasswordValidation.MatchPassword // your validation method
    });
    this.route.params.subscribe(params => {
this.qurey=params['qurey']

       console.log('paramsssssssssss',this.qurey)
     
      console.log(params['qurey'],1)
  });
    this.sub = this.route.params.subscribe ( params => {
      console.log('params',params['query'])
    
        });
  }
  forgetpass(qurey) {
   console.log(qurey,"ffffffffffffffffff")
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
   
    this.http.post(Config.api +'reset_password/', {'pass1':this.pass1,
    'pass2':this.pass2,
    'code': this.qurey
  }, { headers: headers })
   .subscribe(Res => {
      
        console.log(Res);
     
        swal({
          type: 'success',
          title: 'Successfully updated your password',
          showConfirmButton: false,
          timer: 1500
        })
      
      },
        error => {
          console.log(error);
      
          swal(
            'Invalid',
            'May be Some error!',
            'error'
          )
        });
       }
}
