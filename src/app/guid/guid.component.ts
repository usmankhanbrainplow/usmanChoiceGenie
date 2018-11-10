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
import { DataService } from '../data.service';
import { PagerService } from '../pager.service';

import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';
@Component({
  selector: 'app-guid',
  templateUrl: './guid.component.html',
  styleUrls: ['./guid.component.scss']
})
export class GuidComponent implements OnInit {
  isLinear = true;
  onSubmit;
  i;
  signupForm: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  normalPattern = '[a-zA-Z0-9_.-]+?';
  digitsOnly = '^[0-9,-]+$';
  email = '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$';
  fixed;
  vari;
  market;
  months1;
  months2;
  months3;
  months4;
  months5;
  months6;
  months7;
  price;
  min;
  max;
  zip_code;
  product;
  constructor(private fb: FormBuilder,private http: Http, private pagerService: PagerService, private route: ActivatedRoute, public sg: SimpleGlobal, private obj: HomeService, private router: Router, private data: DataService) { }

  ngOnInit() {  
    this.zip_code = localStorage.getItem('zip');
    this.signupForm = this.fb.group({
    'price': [''],
 
  });
  this.secondFormGroup = this.fb.group({
    'fixed': [''],
    'vari': [''],
    'market': [''],
  });
  this.thirdFormGroup = this.fb.group({
   'min': [''],
   'max': [''],
  });
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
    this.obj.searchProducts(this.zip_code, 1).subscribe(response => {
        this.product = response['Total Result'];
       console.log(this.product,'dddd')

    });

  }
  checked8(event, i) {
    if (event.target.checked == true) {
        console.log(event.target.checked)
        this.fixed = "Fixed Rate";
        localStorage.setItem('fixed', this.fixed);
    }
    else if (event.target.checked == false) {
        console.log(event.target.checked)
        delete this.fixed;
        localStorage.removeItem('fixed');
    }
    console.log(this.fixed)
}
checked9(event, i) {
    if (event.target.checked == true) {
        console.log(event.target.checked)
        this.vari = "Variable (Changing Rate)";
        localStorage.setItem('vari', this.vari);
    }
    else if (event.target.checked == false) {
        console.log(event.target.checked)
        delete this.vari;
        localStorage.removeItem('vari');
    }
    console.log(this.vari)
}
checked10(event, i) {
    if (event.target.checked == true) {
        console.log(event.target.checked, this.market)
        this.market = "Indexed (Market Rate)";
        localStorage.setItem('market', this.market);
    }
    else if (event.target.checked == false) {
        console.log(event.target.checked)
        delete this.market;
        localStorage.removeItem('market');
    }
    console.log(this.market)
}
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
checked4(event, i) {
  if (event.target.checked == true) {
      console.log(event.target.checked)
      this.months4 = "14 Months";
      localStorage.setItem('months4', this.months4);
  }
  else if (event.target.checked == false) {
      console.log(event.target.checked)
      delete this.months4;
      localStorage.removeItem('months4');
  }
  console.log(this.months4)
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
checked7(event, i) {
  if (event.target.checked == true) {
      console.log(event.target.checked)
      this.months7 = "5 Months";
      localStorage.setItem('months7', this.months7);
  }
  else if (event.target.checked == false) {
      console.log(event.target.checked)
      delete this.months7;
      localStorage.removeItem('months7');
  }
  console.log(this.months7)
}

submit(){
if(this.price || this.fixed || this.vari || this.market || this.min || this.max || this.months1 || this.months2 || this.months3 || this.months4 || this.months5 || this.months6 || this.months7){

  this.router.navigate(['/products/' + this.zip_code]);
 // localStorage.setItem('zip', this.zip_code);
  localStorage.setItem('price', this.price);
  
  
 
  localStorage.setItem('min', this.min);
  localStorage.setItem('max', this.max);
  

 
 
  

 
}
}

}
