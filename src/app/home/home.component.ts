// import { Component, OnInit, ElementRef } from '@angular/core';
import { Component, OnInit, HostListener,ElementRef } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { HomeService } from "./home.service";
import { Subscription } from 'rxjs/Subscription';
import { Http, Response, Headers } from '@angular/http';
import { Router } from "@angular/router";
import { ViewChild } from '@angular/core';
import { Config } from "../Config";
import { ActivatedRoute, RouterModule } from "@angular/router";
import swal from 'sweetalert2';
import { SimpleGlobal } from 'ng2-simple-global';
import { DataService } from '../data.service';
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { google } from '@agm/core/services/google-maps-types';
import { HttpService } from '../serv/http-service';

declare var $;

export class errorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [
  ]

})

export class HomeComponent implements OnInit {
  @ViewChild('openModal') openModal: ElementRef;
  zipCode = '';
  product_id;
  premiseID;
  signup;
  city;
  state;
  items;
  private sub: Subscription;
  model: any = {};
  zipcodeexist;
  public products: any;
  public longi;
  public lati;
  dataa;
  Items: any = [];
  slideConfig = {
    "slidesToShow": 7,
    "slidesToScroll": 5,
    autoplay: 'true',
    prevArrow: '<button class="leftRs slick-arrow leftArrow btn-slider btn-slider-left" style="display: block;"><i class="fa fa-chevron-left"></i></button>',
    nextArrow: '<button class="rightRs slick-arrow leftArrow btn-slider btn-slider-right" style="display: block;"><i class="fa fa-chevron-right"></i></button>',
    responsive: [
      {
        breakpoint: 778,
        settings: {
          arrows: true,
          // centerMode: true,
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        // "slidesToScroll": 1,
        settings: {
          arrows: true,
          slidesToScroll: 1,
          // centerMode: true,
          slidesToShow: 1
        }
      }
    ]
  }
  constructor(private obj: HomeService, private router: Router, private route: ActivatedRoute,  
    private http: HttpClient, public sg: SimpleGlobal, private data: DataService, private Http: Http,private https: HttpService) {

  }


  googleTranslateElementInit() {
    new google.translate.TranslateElement({ pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL }, 'google_translate_element');
  }


  onSubmit(f: NgForm) {

    localStorage.setItem('zip', this.zipCode);
  }

  digitsOnly = '^[0-9,-]+$';
  public results: any;
  public zip;
  cord;


  promo = new FormControl('', [
    Validators.pattern(this.digitsOnly)
  ]);
  zip_code = new FormControl('', [
    Validators.pattern(this.digitsOnly)
  ]);
  location = {};
  postalCode;
  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {

    localStorage.removeItem('zip');
  }

  setPosition(position) {
    if (!localStorage.getItem('zip')) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.get(Config.api + 'get_location/' + position.coords['latitude'] + '/' + position.coords['longitude']).subscribe(Res => {
        console.log(Res);
        this.zipCode = Res['postalCodes'][0]['postalCode'];

        // this.Conversation();
        console.log(this.cord)
      });
     
      }
      // else{
      //   this.zipCode="75001";
      // }
     
    }


   



  position: any;
  ngOnInit() {
    this.zipCode = localStorage.getItem('zip');
    //this.googleTranslateElementInit();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
      // navigator.geolocation.getCurrentPosition(this.getzipcode.bind(this));
    };
    this.premiseIdData();
    // this.featuredplan();

    $('.home-slider').slick({
      infinite: true,
      speed: 500,
      fade: true,
      autoplay: true,
      cssEase: 'linear',
      prevArrow: '<button type="button" class="slick-prev">Previous</button>',
      nextArrow: '<button type="button" class="slick-next">Next</button>'
    });

  }

  onKeydown(event, zipcode1) {
    if (event.key === "Enter") {
      //alert("enter the zip code")
      console.log(event);
      console.log("CHOICE GENIE", this.model.zipcode1);
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      this.http.get(Config.api + 'zipcodecheck/' + zipcode1, { headers: headers })
        .subscribe(data => {
          console.log(data);
          console.log(data['message'], 'hhhhhhhhhhhhhhh')
          this.state = data['state'];
          this.zipcodeexist = data['message']
          if (this.zipcodeexist == "InValid Zipcode") {
            swal({
              text: "Please Enter Valid Zipcode",
              title: "Choice Genie",
              type: "error",
              showConfirmButton: false,
              timer: 1200,
              width: '512px',
              confirmButtonText: "OK",

            })
          }
          else if (this.state == "deregulatedstate") {
            this.router.navigate(['/product/' + this.zipCode]);
            localStorage.setItem('zip', this.zipCode);
          }
          else if (this.state == "notderegulatedstate") {
            this.router.navigate(['/products/' + this.zipCode]);
            localStorage.setItem('zip', this.zipCode);
          }
        },
          error => {
            console.log(error);
            swal({
              text: "Please Enter Valid Zipcode",
              title: "Choice Genie",
              type: "error",
              showConfirmButton: false,
              width: '512px',
              timer: 1200,
              confirmButtonText: "OK",

            })

          });

      //this.router.navigate(['/product/' + this.zipCode]);
    }
  }
  featuredplan() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    this.https.get(Config.api + 'topproducts/', { headers: headers })

        .subscribe(Res => {

            this.sg['plan'] = Res.json()['Results'];

            this.Items = this.sg['plan'];
            for (let prod of this.sg['plan']) {
                console.log(prod["plan_information"])
                console.log(prod["price_rate"])
                prod["plan_information"] = prod["plan_information"].split(',,', 3000);
                prod["price_rate"] = prod["price_rate"].split('..', 3000);
            }

        });
}

  Checkzipcode(event, zipcode1) {

    console.log("CHOICE GENIE", this.model.zipcode1);
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.http.get(Config.api + 'zipcodecheck/' + zipcode1, { headers: headers })
      .subscribe(data => {
        console.log(data);
        console.log(data['message'], 'hhhhhhhhhhhhhhh')
        this.state = data['state'];
        this.zipcodeexist = data['message']
        if (this.zipcodeexist == "InValid Zipcode") {
          swal({
            text: "Please Enter Valid Zipcode",
            title: "Choice Genie",
            type: "error",
            showConfirmButton: false,
            timer: 1200,
            width: '512px',
            confirmButtonText: "OK",

          })
        }
        else if (this.state == "deregulatedstate") {
          this.router.navigate(['/product/' + this.zipCode]);
          localStorage.setItem('zip', this.zipCode);
        }
        else if (this.state == "notderegulatedstate") {
          this.router.navigate(['/products/' + this.zipCode]);
          localStorage.setItem('zip', this.zipCode);
        }
      },
        error => {
          console.log(error);
          swal({
            text: "Please Enter Valid Zipcode",
            title: "Choice Genie",
            type: "error",
            showConfirmButton: false,
            timer: 1200,
            width: '512px',
            confirmButtonText: "OK",

          })

        });
  }
  Checkzipcode1(event, zipcode1) {

    console.log("CHOICE GENIE", this.model.zipcode1);
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.http.get(Config.api + 'zipcodecheck/' + zipcode1, { headers: headers })
      .subscribe(data => {
        console.log(data);
        console.log(data['message'], 'hhhhhhhhhhhhhhh')
        this.state = data['state'];
        this.zipcodeexist = data['message']
        if (this.zipcodeexist == "InValid Zipcode") {
          swal({
            text: "Please Enter Valid Zipcode",
            title: "Choice Genie",
            type: "error",
            showConfirmButton: false,
            timer: 1200,
            width: '512px',
            confirmButtonText: "OK",

          })
        }
        else if (this.state == "deregulatedstate") {
          this.router.navigate(['/guids']);
          localStorage.setItem('zip', this.zipCode);
        }
        else if (this.state == "notderegulatedstate") {
          this.router.navigate(['/guid']);
          localStorage.setItem('zip', this.zipCode);
        }
      },
        error => {
          console.log(error);
          swal({
            text: "Please Enter Valid Zipcode",
            title: "Choice Genie",
            type: "error",
            showConfirmButton: false,
            timer: 1200,
            width: '512px',
            confirmButtonText: "OK",

          })

        });
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();

    }
  }
  mess;
  notmess;
  resulttaxes;
  resultderegulated;
  total;
  premiseIdData() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.https.get(Config.api + 'combine_vendors/', { headers: headers })
      .subscribe(Res => {
        console.log(Res);
        this.mess = Res.json()['Results_Texas'];
        // this.notmess = Res.json()['Results_Deregulated'];
        this.resulttaxes = Res.json()['Vendors1'];
        // this.resultderegulated = Res.json()['Vendors2'];


      });
  }
  // derugu(name){
  //   if(this.zipCode && this.state == "Yes"){
  //     this.router.navigate(['/product/' + this.zipCode]);
  //     localStorage.setItem('zip', this.zipCode);
  //     localStorage.setItem('name', name);
  //   }
  //   else{
  //     swal({
  //       text: "Please Enter zipcode",
  //       title: "Choice Genie",
  //       type: "error",
  //       showConfirmButton: false,
  //       timer: 1200,
  //       confirmButtonText: "OK",

  //     })
  //   }
  // }
  // move(name){
  //   if(this.zipCode && this.state == "Yes"){

  //     this.router.navigate(['/products/' + this.zipCode]);
  //     localStorage.setItem('zip', this.zipCode);
  //     localStorage.setItem('name', name.trim());
  //   }
  //   else{
  //     swal({
  //       text: "Please Enter zipcode",
  //       title: "Choice Genie",
  //       type: "error",
  //       showConfirmButton: false,
  //       timer: 1200,
  //       confirmButtonText: "OK",

  //     })
  //   }
  //    }
  move(name) {

    console.log("CHOICE GENIE", this.model.zipcode1);
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.http.get(Config.api + 'zipcodecheck/' + this.zipCode, { headers: headers })
      .subscribe(data => {
        console.log(data);
        console.log(data['message'], 'hhhhhhhhhhhhhhh')
        this.state = data['state'];
        this.zipcodeexist = data['message']

        if (this.zipcodeexist == "InValid Zipcode") {

          // swal({
          //   text: "Please Enter Valid Zipcode",
          //   title: "Choice Genie",
          //   type: "error",
          //   showConfirmButton: false,
          //   timer: 1200,
          //   width: '512px',
          //   confirmButtonText: "OK",

          // })
          //   this.router.navigate(['/products/77004' ]);
          // localStorage.setItem('zip', '77004');
          // localStorage.setItem('name', name);
          // this.router.navigate(['/products/77004' ]);
          // localStorage.setItem('zip', this.zipCode);
          // localStorage.setItem('name', name);
        }
        else if (this.state == "deregulatedstate") {
          this.router.navigate(['/product/' + this.zipCode]);
          localStorage.setItem('zip', this.zipCode);
          localStorage.setItem('name', name);

        }
        else if (this.state == "notderegulatedstate") {
          this.router.navigate(['/products/' + this.zipCode]);
          localStorage.setItem('zip', this.zipCode);
          localStorage.setItem('name', name);

        }
      }
      ,
        error => {
          console.log(error);
          // swal({
          //   text: "Please Enter Valid Zipcode",
          //   title: "Choice Genie",
          //   type: "error",
          //   showConfirmButton: false,
          //   timer: 1200,
          //   width: '512px',
          //   confirmButtonText: "OK",

          // })
          this.router.navigate(['/products/75001' ]);
          localStorage.setItem('zip', '75001');
          localStorage.setItem('name', name);

        }
        );
  }
}
