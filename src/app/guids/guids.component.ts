import { Component, OnInit , Directive, Input } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { Config } from '../Config';
import { ActivatedRoute, Router } from "@angular/router";
import { SimpleGlobal } from 'ng2-simple-global';
import { ResponseContentType } from '@angular/http/src/enums';
import { FormBuilder, Validators, NgControl, RadioControlValueAccessor, FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
 import swal from 'sweetalert2';
import { MatSelect } from '@angular/material';
import { HomeService } from "../home/home.service";

import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';
@Component({
  selector: 'app-guids',
  templateUrl: './guids.component.html',
  styleUrls: ['./guids.component.scss']
})
export class GuidsComponent implements OnInit {
  isLinear = true;
 
  fourthFormGroup: FormGroup;
  normalPattern = '[a-zA-Z0-9_.-]+?';
  digitsOnly = '^[0-9,-]+$';
  email = '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$';
 
  months1;
  months2;
  months3;
  months4;
  months5;
  months6;
  months7;
 
  zip_code;
  product;
  onSubmit;
  i;
  constructor(private obj: HomeService,private https:Http,public router: Router, private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private sg: SimpleGlobal) { }

  ngOnInit() {  
    this.zip_code = localStorage.getItem('zip');
  //   this.signupForm = this.fb.group({
  //   'price': [''],
 
  // });
  // this.secondFormGroup = this.fb.group({
  //   'fixed': [''],
  //   'vari': [''],
  //   'market': [''],
  // });
  // this.thirdFormGroup = this.fb.group({
  //  'min': [''],
  //  'max': [''],
  // });
  this.fourthFormGroup = this.fb.group({
    'months1': [''],
    'months2': [''],
    'months3': [''],
    'months4': [''],
    'months5': [''],
    'months6': [''],
    'months7': [''],
  });
  this.fun();
  }
  fun(){
    this.obj.searchProducts1(this.zip_code, 1).subscribe(response => {
        this.product = response['Total Result'];
       console.log(this.product,'dddd')

    });

  }
//   checked8(event, i) {
//     if (event.target.checked == true) {
//         console.log(event.target.checked)
//         this.fixed = "Fixed Rate";
//         localStorage.setItem('fixed', this.fixed);
//     }
//     else if (event.target.checked == false) {
//         console.log(event.target.checked)
//         delete this.fixed;
//     }
//     console.log(this.fixed)
// }
// checked9(event, i) {
//     if (event.target.checked == true) {
//         console.log(event.target.checked)
//         this.vari = "Variable (Changing Rate)";
//         localStorage.setItem('vari', this.vari);
//     }
//     else if (event.target.checked == false) {
//         console.log(event.target.checked)
//         delete this.vari;
//     }
//     console.log(this.vari)
// }
// checked10(event, i) {
//     if (event.target.checked == true) {
//         console.log(event.target.checked, this.market)
//         this.market = "Indexed (Market Rate)";
//         localStorage.setItem('market', this.market);
//     }
//     else if (event.target.checked == false) {
//         console.log(event.target.checked)
//         delete this.market;
//     }
//     console.log(this.market)
// }
checked1(event, i) {
  if (event.target.checked == true) {
      console.log(event.target.checked)
      this.months1 = "36 Months";
      localStorage.setItem('months1', this.months1);
  }
  else if (event.target.checked == false) {
      console.log(event.target.checked)
      delete this.months1;
      localStorage.removeItem('months1');
  }
  console.log(this.months1)
}
checked2(event, i) {
  if (event.target.checked == true) {
      console.log(event.target.checked)
      this.months2 = "24 Months";
      localStorage.setItem('months2', this.months2);
  }
  else if (event.target.checked == false) {
      console.log(event.target.checked)
      delete this.months2;
      localStorage.removeItem('months2');
  }
  console.log(this.months2)
}
checked3(event, i) {
  if (event.target.checked == true) {
      console.log(event.target.checked)
      this.months3 = "18 Months";
      localStorage.setItem('months3', this.months3);
  }
  else if (event.target.checked == false) {
      console.log(event.target.checked)
      delete this.months3;
      localStorage.removeItem('months3');
  }
  console.log(this.months3)
}

checked5(event, i) {
  if (event.target.checked == true) {
      console.log(event.target.checked)
      this.months5 = "12 Months";
      localStorage.setItem('months5', this.months5);
  }
  else if (event.target.checked == false) {
      console.log(event.target.checked)
      delete this.months5;
      localStorage.removeItem('months5');
  }
  console.log(this.months5)
}
checked6(event, i) {
  if (event.target.checked == true) {
      console.log(event.target.checked)
      this.months6 = "6 Months";
      localStorage.setItem('months6', this.months6);
  }
  else if (event.target.checked == false) {
      console.log(event.target.checked)
      delete this.months6;
      localStorage.removeItem('months6');
  }
  console.log(this.months6)
}


submit(){
if(this.months1 || this.months2 || this.months3 || this.months5 || this.months6){

  this.router.navigate(['/product/' + this.zip_code]);
 // localStorage.setItem('zip', this.zip_code);
 
  

 
 
  

 
}
}}
