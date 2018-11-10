import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { Config } from "../Config";
import { SimpleGlobal } from 'ng2-simple-global';
import { ResponseContentType } from '@angular/http/src/enums';
import { FormBuilder, Validators, NgControl, RadioControlValueAccessor, FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import swal from 'sweetalert2';
import { MatSelect } from '@angular/material';
import { LoginService } from '../pages/login/login.service';
import { ViewChild } from '@angular/core';
import { RecaptchaComponent } from 'recaptcha-blackgeeks';
import { HeaderService } from './header.service';
import { DataService } from '../data.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { google } from '@agm/core/services/google-maps-types';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})


  export class HeaderComponent implements OnInit {
    @ViewChild('openModal') openModal: ElementRef;
  public customer;
  public username;
  model: any = {};
  public massage;
  state;
  query;
  search;
  zipcodeexist;
  zipcode;
  record: any = []
  zipCode;
  admin;
  uname;
  local;
  // google:any = []
  constructor(private router: Router, private _serv: HeaderService, private data: DataService, private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private sg: SimpleGlobal) { }

//  googleTranslateElementInit() {
//   new this.google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
// }
googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.VERTICAL}, 'google_translate_element');
}

  
  
  
  
  checked_login() {
    if (localStorage.getItem('username')) {
      let local = localStorage.getItem('username');
      return true;
    }
    else if(!localStorage.getItem('username')){
      return false;
    }
    
  }
    
  checked_price() {
    if (localStorage.getItem('role')=='Deregulatedstate Vendor') {
      // let local = localStorage.getItem('role');
      return false;
    }
    else if(localStorage.getItem('role')=='Not Deregulatedstate Vendor'){
      return false;
    }
    else if(localStorage.getItem('role')=='USER')
    {
      return true;
    }
    else if(!localStorage.getItem('role')){
      return true;
    }

    
  }
  
  check_login1() {
    if (localStorage.getItem('currentadmin')) {
      let local = localStorage.getItem('currentadmin');
      return true;
    }
   
  }
  getprofile() {
    if (localStorage.getItem('role') == "Not Deregulatedstate Vendor") {
      this.router.navigate(['/company-profile']);
    }
    else if (localStorage.getItem('role') == "Deregulatedstate Vendor") {
      this.router.navigate(['/company-profile']);
    }
    else if(localStorage.getItem('role') =="USER"){
      this.router.navigate(['/userprofile']);
    }
  }
  
  moving() {
    if (localStorage.getItem('role') == "Not Deregulatedstate Vendor") {
      this.router.navigate(['/dashboard/' + this.username]);
    }
    else if (localStorage.getItem('role') == "Deregulatedstate Vendor") {
      this.router.navigate(['/dashboards/' + this.username]);
    }
    else if(localStorage.getItem('role') =="USER"){
      this.router.navigate(['/userprofile/']);
    }
  }
  moving1() {
    this.router.navigate(['/supermaindashboard']);
  }
  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

 closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
  ngOnInit() {
    setTimeout(() => {
      this.openModal.nativeElement.click();
  },
  3000);
    const mainSearch = $('.main-search');
    const formSearch = $('.form-search');

    $('#searchIcon').click(function () {
      $(mainSearch).addClass('active');
      $('body').addClass('noScroll');
      $(formSearch).addClass('flipInX');

      setTimeout(function () {
        $('.form-search .mat-input-element').focus();
      }, 370);

    });

    $('#closeSearch').click(function () {
      $(mainSearch).removeClass('active');
      $('body').removeClass('noScroll');
      $(formSearch).removeClass('flipInX');
    });
    this.admin=localStorage.getItem('currentadmin')
    this.username = localStorage.getItem('username')
    console.log(this.username);
    // <script>
      $("#showmenu").click(function(e){
        e.preventDefault();
        $("#menu").toggleClass("show");
      });
      $("#menu a").click(function(event){
        event.preventDefault();
        if($(this).next('ul').length){
          $(this).next().toggle('fast');
          $(this).children('i:last-child').toggleClass('fa-caret-down fa-caret-left');
        }
      });
    // </script>
    // <script type="text/javascript">

      // var _gaq = _gaq || [];
      // _gaq.push(['_setAccount', 'UA-36251023-1']);
      // _gaq.push(['_setDomainName', 'jqueryscript.net']);
      // _gaq.push(['_trackPageview']);

      // (function() {
      //   var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      //   ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      //   var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      // })();

    // </script>

  }
  logout() {
    // this.authService.signOut().then( success =>{
    // console.log("true",success)
    // },error =>{
    // console.log("error",error)
    // });
    localStorage.clear();
    sessionStorage.clear();

    swal({
      type: 'success',
      title: 'Successfully Logged out',
      showConfirmButton: false,
      timer: 1500
      });
  this.router.navigate(['/']);
   //this._nav.navigate(['/']);
  }
  // logout() {
  //   localStorage.clear();
  //   this.router.navigate(['/']);

  // }
  check_login() {
    if (localStorage.getItem('username')) {
      this.local = localStorage.getItem('username');
      // let pars = JSON.parse(this.local);
      this.uname = this.local.username;
      return true;
    } else {
      return false;
    }

  }
 
  submit(event, query) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.http.get(Config.api + 'zipcodecheck/' + query, { headers: headers })
      .subscribe(data => {
        console.log(data);
        console.log(data['message'], 'hhhhhhhhhhhhhhh')
        this.state = data['state'];
        console.log(this.state)
        this.zipcodeexist = data['message']
        if (event.key == "Enter" && this.zipcodeexist == "InValid Zipcode") {
          swal({
            text: "InValid Zipcode",
            title: "Choice Genie",
            type: "error",
            showConfirmButton: false,
            timer: 1200,
            confirmButtonText: "OK",

          })
        }
        else if (event.key == "Enter" && this.state == "deregulatedstate") {
          this.router.navigate(['/product/' + query]);
          localStorage.setItem('zip', query);
          //  window.location.reload()
          $('.main-search').removeClass('active');
           $('body').removeClass('noScroll');
            $('.form-search').removeClass('flipInX');

        }

        else if (event.key == "Enter" && this.state == "notderegulatedstate") {
          this.router.navigate(['/products/' + query]);
          localStorage.setItem('zip', query);
          $('.main-search').removeClass('active');
          $('body').removeClass('noScroll');
           $('.form-search').removeClass('flipInX');
        }
      },
    );

  }
  searchuserdata(query) {
    console.log(query)
    this._serv.searchrecord(query).subscribe(response => {
      this.record = response;

      // this.sg['zip'] = Res.json()['Results'];
      // this.data.changezip(this.sg['zip']);
      console.log(this.record)
    })

  }
//   setPage(page: number) {
        
  


//         this.obj.searchProducts(this.zip_code, page).subscribe(response => {

//             this.product = response['Results'];
//             this.noresult = response['Total Result'];
//             for (let prod of this.product) {
//                 prod["plan_information"] = prod["plan_information"].split(',,', 3000);
//                 prod["price_rate"] = prod["price_rate"].split('..', 3000);

//             }


//             this.pager = this.pagerService.getPager(response['Total Result'], page, this.item);

//         }


//         );

    


// }
  singlerfp(zipcode) {
    this.zipcode=zipcode;
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.http.get(Config.api + 'zipcodecheck/' + this.zipcode, { headers: headers })
      .subscribe(data => {
        console.log(data);
        console.log(data['message'], 'hhhhhhhhhhhhhhh')
        this.state = data['state'];
        this.zipcodeexist = data['message']
        if (this.zipcodeexist == "InValid Zipcode") {
          swal({
            text: "InValid Zipcode",
            title: "Choice Genie",
            type: "error",
            showConfirmButton: false,
            timer: 1200,
            confirmButtonText: "OK",

          })
        }
        else if (this.state == "deregulatedstate") {
          this.router.navigate(['/product/' + this.zipcode]);
          localStorage.setItem('zip', this.zipcode);
          $('.main-search').removeClass('active');
          $('body').removeClass('noScroll');
           $('.form-search').removeClass('flipInX');
        }
        else if (this.state == "notderegulatedstate") {
          this.router.navigate(['/products/' + this.zipcode]);
          localStorage.setItem('zip', this.zipcode);
          $('.main-search').removeClass('active');
          $('body').removeClass('noScroll');
           $('.form-search').removeClass('flipInX');
        }
      },
      error => {
        console.log(error);


      });
  }


}
