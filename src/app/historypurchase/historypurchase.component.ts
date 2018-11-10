// import { Component, OnInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
// import { PricingService} from './pricing.service';
import swal from 'sweetalert2';
import { Router} from '@angular/router';
import { TextMaskModule } from 'angular2-text-mask';
// import {DatePipe} from '@angular/common';

import {FormBuilder, FormGroup} from '@angular/forms';
import { HistorypurchaseService } from './historypurchase.service';

declare const $:any;

@Component({
  selector: 'app-historypurchase',
  templateUrl: './historypurchase.component.html',
  styleUrls: ['./historypurchase.component.scss']
})
export class HistorypurchaseComponent implements OnInit {
  record = {} ;
    nofound : boolean = false;
    pkgList ={};
    result: boolean =false;
    today: number = Date.now();
    pkg_detail={};
    pkgsub = false;
    public mask = [/\d/, /\d/, /\d/, /\d/];
    public mask1 = [/[a-zA-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
        /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
        /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
        /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
        /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
        /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
        /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
        /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
        /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/];
    cardnumber1;
    cardnumber2;
    cardnumber3;
    cardnumber4;
    cardholdername;
    expmonth;
    options: FormGroup;
    expyear;
    ccv;
    local;
    uname;
    results: any = [];
plan;
pricepackage;
month;
    flipclass = 'credit-card-box';
    shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

    constructor(private _nav:Router,private formBuilder: FormBuilder ,private _serv: HistorypurchaseService,private https: Http){

      if (localStorage.getItem('username')) {
          this.local = localStorage.getItem('username');
          // let pars = JSON.parse(this.local) ;
          this.uname = this.local
          console.log("usman",this.uname)
      }
      this.options = formBuilder.group({
          bottom: 0,
          fixed: false,
          top: 0
      });
  }
  // fetchregister() {
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   this.https.get( 'countuserproductsrep/', { headers: headers })

  //     .subscribe(Res => {
  //       this.results = Res.json();
  //       console.log(this.results);
  //     });

  // }
  mainFunction(){
    this._serv.purchaseHistory().subscribe(
        data => {
            // this.record = data.json();
            this.record= data[0];
            console.log('Hello there dasds'+this.record);

        },
        error => {
            // alert(error.status)
            if(error.status = 404){
                this.nofound = true;
            }
            console.log(error)
        })
}

next_stepdetail(event: any){
  if (event.target.value == "BM") {
      this.prv_stepdetail("699")

  } else if (event.target.value == "PY") {
      this.prv_stepdetail("64");
  }

}

firststep(value){
  console.log(value)
if (value == "BM") {
  this.pricepackage="699"
  this.month="monthly"
   this.prv_stepdetail("699")

} else if (value == "PY") {
  this.pricepackage="64"
  this.month="yearly"
    this.prv_stepdetail("64")
}
}

prv_stepdetail(type) {
    this.pkg_detail['type']=type
    //  this.pkg_detail['dur']=dur
    this.pkgsub = true;

}


proceed() {

    this.pkg_detail['credit']=this.cardnumber1 + this.cardnumber2 +
        this.cardnumber3 + this.cardnumber4
    this.pkg_detail['ccv']=this.ccv
    this.pkg_detail['expdate']= this.expmonth + '/' + this.expyear
    this._serv.packageUpdate(this.pkg_detail).subscribe(
        data =>{

            swal(
                'Your payment has been transferred',
                '',
                'success'
            )
            let url = 'find-bids';
            this._nav.navigate([url]);

        },
        error => {
            console.log(error);
            swal(
                'Oops...',
                'Something went wrong!',
                'error'
            )
        });

}

ngOnInit(){
    this.mainFunction()

    $('#click_advance').click(function() {
        $("i", this).toggleClass("fa-arrow-left fa-arrow-right");
    });
}
logout() {
    // this.authService.signOut();        
    localStorage.clear();

    swal({
        type: 'success',
        title: 'Successfully Logged out',
        showConfirmButton: false,
        timer: 1500
    });

    this._nav.navigate(['/']);
}

}