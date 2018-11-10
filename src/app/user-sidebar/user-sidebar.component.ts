import { Component, OnInit } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { Config } from "../Config";
import { ActivatedRoute, Router } from "@angular/router";
import { SimpleGlobal } from 'ng2-simple-global';
import { ResponseContentType } from '@angular/http/src/enums';
import { DataService } from '../data.service';
import { PagerService } from '../pager.service';
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { AfterContentInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { RandomService } from '../random.service';
import { HomeService } from '../home/home.service';
import { error } from 'selenium-webdriver';
//import { SideBarService } from './side-bar.service';
import swal from 'sweetalert2';

declare const $: any;

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
})

export class UserSidebarComponent implements OnInit, AfterContentInit {
  eUsage;

  cUsage;
  message: string;
  localVar;
  renewable='';
  model;
  price;
  energy;
  price_from;
  price_to;
  i;
  1;

  // min;
  // max;
  // price;
  constructor(private https: HttpClient, private http: Http, private route: ActivatedRoute,
    private sg: SimpleGlobal, private data: DataService, private someserv: RandomService, private obj: HomeService, private pagerService: PagerService) {
    //    if (this.sg['gv']) {
    //      this.localVar = this.sg['gv'];
    // }
  }
  private allItems: any[];
  prod_loaded = false;
  prods_loaded = false;
  public zip_code: any;
  items;
  title;
  pager: any = {};
  mySelect;
  private sub: Subscription;
  private zip: any;
  id;
  public zipCode: any;
  min;
  max;


  ngOnInit() {
    //this.someserv.telecast.subscribe(message=> this.message = message);
    //   this.sub = this.route.params.subscribe(params => {
    //     this.zip_code = +params['zip_code'];
    //     console.log();
    //    this.setPage(1);
    this.zip_code = localStorage.getItem('zip');
    //alert(this.zip_code);

    // });

    //this.months();
    this.companytitle();
    this.fetchzip();

  }
  ngAfterContentInit() {
    // console.log(this.eUsage);
    // alert($("#mySelect").val());

  }

  onChange(e) {
    alert(e)
  }
  usage = [
    { value: 'building-0', viewValue: 'Building' },
    { value: 'restaurant-1', viewValue: 'Restaurant' },
    { value: 'store-2', viewValue: 'Store' },
    { value: 'manufacturing-plant-2', viewValue: 'Manufacturing Plant' },
    { value: 'office-2', viewValue: 'Office' },
    { value: 'other-2', viewValue: 'Other' }
  ];
  check(e) {


  }
  fetchitem(items) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    this.http.get(Config.api + 'items_perpage/title/asc/' + items, { headers: headers })

      .subscribe(Res => {
        console.log(Res.json()['results'])
        this.sg['products'] = Res.json()['results'];
        this.data.changeProducts(this.sg['products']);

      });

  }
  months;
  fetchProducts() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post(Config.api + 'filter/' + this.zip_code + '', this.months, { headers: headers })
      .subscribe(Res => {
        this.sg['products'] = Res.json()['Results'];
        this.data.changeProducts(this.sg['products']);
        this.allItems = this.sg['products'];
        for (let prod of this.sg['products']) {

          prod["plan_information"] = prod["plan_information"].split(',,', 3000);
          prod["price_rate"] = prod["price_rate"].split('..', 3000);
        }
      });

  }

  fetchzip() {

    let headers = new Headers();
    // alert("your zip code are show "+this.zip_code);
    headers.append('Content-Type', 'application/json');
    this.http.get(Config.api + 'zipcodedata/' + this.zip_code + '', { headers: headers })

      .subscribe(Res => {
        this.sg['products'] = Res.json()['Results'];
        this.data.changeProducts(this.sg['products']);
        this.allItems = this.sg['products'];
        for (let prod of this.sg['products']) {

          prod["plan_information"] = prod["plan_information"].split(',,', 3000);
          prod["price_rate"] = prod["price_rate"].split('..', 3000);
        }
      });

  }

  companytitle() {

    // http://192.168.30.193:9000/choice/companytitle/
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.get(Config.api + 'companytitle/', { headers: headers })

      .subscribe(Res => {

        this.title = Res.json();

        this.title = this.title;
        console.log(this.title)
      });

  }
  name;
  // 'http://192.168.30.193:9000/choice/company/
  companydata(name, page) {
    localStorage.setItem('company', name.trim())
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.get(Config.api+'company/' + this.zip_code + '/' + this.name.trim() +'?page='+page +'', { headers: headers })
     
      .subscribe(Res => {
        console.log("totallllllllllllllllllllllll", Res.json()['Total Pages'])

        console.log(Res, 'hhhhhhhhhhhhhhhhhhh')
        this.sg['products'] = Res.json()['Results'];
        this.data.changeProducts(this.sg['products']);
        this.allItems = this.sg['products'];
        for (let prod of this.sg['products']) {
          console.log(prod["plan_information"])
          console.log(prod["minumum_usage_fee"])
          prod["plan_information"] = prod["plan_information"].split(',,', 3000);
          prod["price_rate"] = prod["price_rate"].split('..', 3000);
        }
        this.pager = this.pagerService.getPager(Res.json()['Total Result'], page, 10);
      });



  }
 
  // months1 = false;
  // months2 = false;
  // months3 = false;
  // months4 = false;
  // months5 = false;
  // months6 = false;
  // months7 = false;

  fetchmutimonth(months1, months2, months3, months4, months5, months6, months7) {


    if (months1 == true && months2 == true && months3 == true && months4 == true && months5 == true && months6 == true && months7 == true) {
      months1 = "36 Months";
      months2 = "24 Months";
      months3 = "18 Months";
      months4 = "14 Months";
      months5 = "12 Months";
      months6 = "6 Months";
      months7 = "5 Months";

      console.log(months1, months2, months3, months4, months5, months6, months7, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');


      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({

        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        .subscribe(Res => {
          console.log(Res)

          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {

            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }


    else if (months1 == true && months2 == true && months3 == true && months4 == true && months5 == true && months6 == true) {
      months1 = "36 Months";
      months2 = "24 Months";
      months3 = "18 Months";
      months4 = "14 Months";
      months5 = "12 Months";
      months6 = "6 Months";

      console.log(months1, months2, months3, months4, months5, months6, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code, JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months1 == true && months2 == true && months3 == true && months4 == true && months5 == true && months7 == true) {
      months1 = "36 Months";
      months2 = "24 Months";
      months3 = "18 Months";
      months4 = "14 Months";
      months5 = "12 Months";
      months7 = "5 Months";

      console.log(months1, months2, months3, months4, months5, months7, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months1 == true && months2 == true && months3 == true && months4 == true && months6 == true && months7 == true) {
      months1 = "36 Months";
      months2 = "24 Months";
      months3 = "18 Months";
      months4 = "14 Months";
      months7 = "5 Months";
      months6 = "6 Months";

      console.log(months1, months2, months3, months4, months7, months6, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code  , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months1 == true && months2 == true && months3 == true && months7 == true && months5 == true && months6 == true) {
      months1 = "36 Months";
      months2 = "24 Months";
      months3 = "18 Months";
      months7 = "5 Months";
      months5 = "12 Months";
      months6 = "6 Months";

      console.log(months1, months2, months3, months7, months5, months6, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months1 == true && months2 == true && months7 == true && months4 == true && months5 == true && months6 == true) {
      months1 = "36 Months";
      months2 = "24 Months";
      months7 = "5 Months";
      months4 = "14 Months";
      months5 = "12 Months";
      months6 = "6 Months";

      console.log(months1, months2, months7, months4, months5, months6, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months1 == true && months7 == true && months3 == true && months4 == true && months5 == true && months6 == true) {
      months1 = "36 Months";
      months7 = "5 Months";
      months3 = "18 Months";
      months4 = "14 Months";
      months5 = "12 Months";
      months6 = "6 Months";

      console.log(months1, months7, months3, months4, months5, months6, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months7 == true && months2 == true && months3 == true && months4 == true && months5 == true && months6 == true) {
      months7 = "5 Months";
      months2 = "24 Months";
      months3 = "18 Months";
      months4 = "14 Months";
      months5 = "12 Months";
      months6 = "6 Months";

      console.log(months7, months2, months3, months4, months5, months6, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months1 == true && months2 == true && months3 == true && months4 == true && months5 == true) {
      months1 = "36 Months";
      months2 = "24 Months";
      months3 = "18 Months";
      months4 = "14 Months";
      months5 = "12 Months";

      console.log(months1, months2, months3, months4, months5, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months1 == true && months2 == true && months3 == true && months4 == true && months6 == true) {
      months1 = "36 Months";
      months2 = "24 Months";
      months3 = "18 Months";
      months4 = "14 Months";
      months6 = "6 Months";

      console.log(months1, months2, months3, months4, months6, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months1 == true && months2 == true && months3 == true && months5 == true && months6 == true) {
      months1 = "36 Months";
      months2 = "24 Months";
      months3 = "18 Months";
      months5 = "12 Months";
      months6 = "6 Months";

      console.log(months1, months2, months3, months5, months6, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months1 == true && months2 == true && months4 == true && months5 == true && months6 == true) {
      months1 = "36 Months";
      months2 = "24 Months";
      months5 = "12 Months";
      months4 = "14 Months";
      months6 = "6 Months";

      console.log(months1, months2, months5, months4, months6, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months1 == true && months3 == true && months4 == true && months5 == true && months6 == true) {
      months1 = "36 Months";
      months5 = "12 Months";
      months3 = "18 Months";
      months4 = "14 Months";
      months6 = "6 Months";

      console.log(months1, months5, months3, months4, months6, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months1 == true && months2 == true && months3 == true && months4 == true && months7 == true) {
      months1 = "36 Months";
      months2 = "24 Months";
      months3 = "18 Months";
      months4 = "14 Months";
      months7 = "5 Months";

      console.log(months1, months2, months3, months4, months7, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months1 == true && months2 == true && months3 == true && months5 == true && months7 == true) {
      months1 = "36 Months";
      months2 = "24 Months";
      months3 = "18 Months";
      months5 = "14 Months";
      months7 = "5 Months";

      console.log(months1, months2, months3, months5, months7, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months1 == true && months2 == true && months4 == true && months5 == true && months7 == true) {
      months1 = "36 Months";
      months2 = "24 Months";
      months5 = "12 Months";
      months4 = "14 Months";
      months7 = "5 Months";

      console.log(months1, months2, months5, months4, months7, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months1 == true && months3 == true && months4 == true && months5 == true && months7 == true) {
      months1 = "36 Months";
      months5 = "12 Months";
      months3 = "18 Months";
      months4 = "14 Months";
      months7 = "5 Months";

      console.log(months1, months2, months3, months4, months7, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months2 == true && months3 == true && months4 == true && months5 == true && months6 == true) {
      months6 = "6 Months";
      months2 = "24 Months";
      months3 = "18 Months";
      months4 = "14 Months";
      months5 = "12 Months";

      console.log(months6, months2, months3, months4, months5, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months2 == true && months3 == true && months4 == true && months5 == true && months7 == true) {
      months7 = "5 Months";
      months2 = "24 Months";
      months3 = "18 Months";
      months4 = "14 Months";
      months5 = "12 Months";

      console.log(months7, months2, months3, months4, months5, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months2 == true && months4 == true && months5 == true && months6 == true && months7 == true) {
      months5 = "12 Months";
      months2 = "24 Months";
      months6 = "6 Months";
      months4 = "14 Months";
      months7 = "5 Months";

      console.log(months5, months2, months6, months4, months7, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months2 == true && months3 == true && months5 == true && months6 == true && months7 == true) {
      months5 = "12 Months";
      months2 = "24 Months";
      months6 = "6 Months";
      months3 = "18 Months";
      months7 = "5 Months";

      console.log(months5, months2, months6, months3, months7, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months2 == true && months3 == true && months4 == true && months6 == true && months7 == true) {
      months3 = "18 Months";
      months2 = "24 Months";
      months6 = "6 Months";
      months4 = "14 Months";
      months7 = "5 Months";

      console.log(months3, months2, months6, months4, months7, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }

    else if (months3 == true && months4 == true && months5 == true && months6 == true && months7 == true) {
      months6 = "6 Months";
      months7 = "5 Months";
      months3 = "18 Months";
      months4 = "14 Months";
      months5 = "12 Months";

      console.log(months6, months7, months3, months4, months5, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months1 == true && months2 == true && months3 == true && months4 == true) {
      months1 = "36 Months";
      months2 = "24 Months";
      months3 = "18 Months";
      months4 = "14 Months";
      console.log(months1, months2, months3, months4, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months1 == true && months2 == true && months3 == true && months5 == true) {
      months1 = "36 Months";
      months2 = "24 Months";
      months3 = "18 Months";
      months5 = "12 Months";
      console.log(months1, months2, months3, months5, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months1 == true && months2 == true && months3 == true && months6 == true) {
      months1 = "36 Months";
      months2 = "24 Months";
      months3 = "18 Months";
      months6 = "6 Months";
      console.log(months1, months2, months3, months6, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months1 == true && months2 == true && months3 == true && months7 == true) {
      months1 = "36 Months";
      months2 = "24 Months";
      months3 = "18 Months";
      months7 = "5 Months";
      console.log(months1, months2, months3, months7, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months2 == true && months3 == true && months4 == true && months5 == true) {
      months2 = "24 Months";
      months3 = "18 Months";
      months4 = "14 Months";
      months5 = "12 Months";
      console.log(months2, months3, months4, months5, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months2 == true && months3 == true && months4 == true && months6 == true) {
      months2 = "24 Months";
      months3 = "18 Months";
      months4 = "14 Months";
      months6 = "6 Months";
      console.log(months2, months3, months4, months6, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months2 == true && months3 == true && months4 == true && months7 == true) {
      months2 = "24 Months";
      months3 = "18 Months";
      months4 = "14 Months";
      months7 = "5 Months";
      console.log(months2, months3, months4, months7, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months3 == true && months4 == true && months5 == true && months6 == true) {
      months6 = "6 Months";
      months3 = "18 Months";
      months4 = "14 Months";
      months5 = "12 Months";
      console.log(months6, months3, months4, months5, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code  , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months3 == true && months4 == true && months5 == true && months7 == true) {
      months7 = "5 Months";
      months3 = "18 Months";
      months4 = "14 Months";
      months5 = "12 Months";
      console.log(months7, months3, months4, months5, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months4 == true && months5 == true && months6 == true && months7 == true) {
      months6 = "6 Months";
      months7 = "5 Months";
      months4 = "14 Months";
      months5 = "12 Months";
      console.log(months6, months7, months4, months5, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code, JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }

    else if (months1 == true && months2 == true && months3 == true) {
      months1 = "36 Months";
      months2 = "24 Months";
      months3 = "18 Months";
      console.log(months1, months2, months3, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code, JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months1 == true && months2 == true && months4 == true) {
      months1 = "36 Months";
      months2 = "24 Months";
      months4 = "14 Months";
      console.log(months1, months2, months4, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months1 == true && months2 == true && months5 == true) {
      months1 = "36 Months";
      months2 = "24 Months";
      months5 = "12 Months";
      console.log(months1, months2, months5, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code  , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months1 == true && months2 == true && months6 == true) {
      months1 = "36 Months";
      months2 = "24 Months";
      months6 = "6 Months";
      console.log(months1, months2, months6, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months1 == true && months2 == true && months7 == true) {
      months1 = "36 Months";
      months2 = "24 Months";
      months7 = "5 Months";
      console.log(months1, months2, months7, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months1 == true && months3 == true && months4 == true) {
      months1 = "36 Months";
      months4 = "14 Months";
      months3 = "18 Months";
      console.log(months1, months3, months4, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months1 == true && months3 == true && months5 == true) {
      months1 = "36 Months";
      months5 = "12 Months";
      months3 = "18 Months";
      console.log(months1, months3, months5, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months1 == true && months3 == true && months6 == true) {
      months1 = "36 Months";
      months6 = "6 Months";
      months3 = "18 Months";
      console.log(months1, months3, months6, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code  , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months1 == true && months3 == true && months7 == true) {
      months1 = "36 Months";
      months7 = "5 Months";
      months3 = "18 Months";
      console.log(months1, months3, months7, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months1 == true && months4 == true && months5 == true) {
      months1 = "36 Months";
      months4 = "14 Months";
      months5 = "12 Months";
      console.log(months1, months4, months5, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months1 == true && months4 == true && months6 == true) {
      months1 = "36 Months";
      months4 = "14 Months";
      months6 = "6 Months";
      console.log(months1, months4, months6, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months1 == true && months4 == true && months7 == true) {
      months1 = "36 Months";
      months4 = "14 Months";
      months7 = "12 Months";
      console.log(months1, months4, months7, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months1 == true && months5 == true && months6 == true) {
      months1 = "36 Months";
      months6 = "6 Months";
      months5 = "12 Months";
      console.log(months1, months5, months6, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months1 == true && months5 == true && months7 == true) {
      months1 = "36 Months";
      months7 = "5 Months";
      months5 = "12 Months";
      console.log(months1, months5, months7, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months1 == true && months6 == true && months7 == true) {
      months1 = "36 Months";
      months6 = "6 Months";
      months7 = "5 Months";
      console.log(months1, months6, months7, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months2 == true && months3 == true && months4 == true) {
      months2 = "24 Months";
      months3 = "18 Months";
      months4 = "14 Months";
      console.log(months2, months3, months4, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months2 == true && months3 == true && months5 == true) {
      months2 = "24 Months";
      months3 = "18 Months";
      months5 = "12 Months";
      console.log(months2, months3, months5, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code  , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months2 == true && months3 == true && months6 == true) {
      months2 = "24 Months";
      months3 = "18 Months";
      months6 = "6 Months";
      console.log(months2, months3, months6, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months2 == true && months3 == true && months7 == true) {
      months2 = "24 Months";
      months3 = "18 Months";
      months7 = "5 Months";
      console.log(months2, months3, months7, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months2 == true && months4 == true && months5 == true) {
      months2 = "24 Months";
      months4 = "14 Months";
      months5 = "12 Months";
      console.log(months2, months4, months5, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code  , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months2 == true && months4 == true && months6 == true) {
      months2 = "24 Months";
      months4 = "14 Months";
      months6 = "6 Months";
      console.log(months2, months4, months6, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months2 == true && months4 == true && months7 == true) {
      months2 = "24 Months";
      months4 = "14 Months";
      months7 = "5 Months";
      console.log(months2, months4, months7, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months2 == true && months5 == true && months6 == true) {
      months2 = "24 Months";
      months6 = "6 Months";
      months5 = "12 Months";
      console.log(months2, months6, months5, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months2 == true && months5 == true && months7 == true) {
      months2 = "24 Months";
      months7 = "5 Months";
      months5 = "12 Months";
      console.log(months2, months7, months5, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months2 == true && months6 == true && months7 == true) {
      months2 = "24 Months";
      months6 = "6 Months";
      months7 = "5 Months";
      console.log(months2, months6, months7, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months3 == true && months4 == true && months5 == true) {
      months3 = "18 Months";
      months4 = "14 Months";
      months5 = "12 Months";
      console.log(months3, months4, months5, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months3 == true && months4 == true && months6 == true) {
      months3 = "18 Months";
      months4 = "14 Months";
      months6 = "6 Months";
      console.log(months3, months4, months6, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months3 == true && months4 == true && months7 == true) {
      months3 = "18 Months";
      months4 = "14 Months";
      months7 = "5 Months";
      console.log(months3, months4, months7, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months3 == true && months5 == true && months6 == true) {
      months3 = "18 Months";
      months6 = "6 Months";
      months5 = "12 Months";
      console.log(months3, months6, months5, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months3 == true && months5 == true && months7 == true) {
      months3 = "18 Months";
      months7 = "5 Months";
      months5 = "12 Months";
      console.log(months3, months7, months5, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months3 == true && months6 == true && months7 == true) {
      months3 = "18 Months";
      months6 = "6 Months";
      months7 = "5 Months";
      console.log(months3, months6, months7, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months4 == true && months5 == true && months6 == true) {
      months4 = "14 Months";
      months5 = "12 Months";
      months6 = "6 Months";
      console.log(months4, months5, months6, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months4 == true && months5 == true && months7 == true) {
      months4 = "14 Months";
      months5 = "12 Months";
      months7 = "5 Months";
      console.log(months4, months5, months7, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months4 == true && months6 == true && months7 == true) {
      months4 = "14 Months";
      months7 = "5 Months";
      months6 = "6 Months";
      console.log(months4, months7, months6, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months5 == true && months6 == true && months7 == true) {
      months7 = "5 Months";
      months5 = "12 Months";
      months6 = "6 Months";
      console.log(months7, months5, months6, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months1 == true && months2 == true) {
      months1 = "36 Months";
      months2 = "24 Months"

      console.log(months1, months2, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months1 == true && months3 == true) {
      months1 = "36 Months";
      months3 = "18 Months"

      console.log(months1, months3, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months1 == true && months4 == true) {
      months1 = "36 Months";
      months4 = "14 Months"

      console.log(months1, months4, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months1 == true && months5 == true) {
      months1 = "36 Months";
      months5 = "12 Months"

      console.log(months1, months5, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months1 == true && months6 == true) {
      months1 = "36 Months";
      months6 = "6 Months"

      console.log(months1, months6, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months1 == true && months7 == true) {
      months1 = "36 Months";
      months7 = "5 Months"

      console.log(months1, months7, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months2 == true && months3 == true) {
      months3 = "18 Months";
      months2 = "24 Months"

      console.log(months3, months2, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months2 == true && months4 == true) {
      months4 = "14 Months";
      months2 = "24 Months"

      console.log(months4, months2, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months2 == true && months5 == true) {
      months5 = "12 Months";
      months2 = "24 Months"

      console.log(months5, months2, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months2 == true && months6 == true) {
      months6 = "6 Months";
      months2 = "24 Months"

      console.log(months6, months2, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code  , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months2 == true && months7 == true) {
      months7 = "5 Months";
      months2 = "24 Months"

      console.log(months7, months2, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months3 == true && months4 == true) {
      months3 = "18 Months";
      months4 = "14 Months"

      console.log(months3, months4, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months3 == true && months5 == true) {
      months3 = "18 Months";
      months5 = "12 Months"

      console.log(months3, months5, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months3 == true && months6 == true) {
      months3 = "18 Months";
      months6 = "6 Months"

      console.log(months3, months6, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months3 == true && months7 == true) {
      months3 = "18 Months";
      months7 = "5 Months"

      console.log(months3, months7, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months4 == true && months5 == true) {
      months4 = "14 Months";
      months5 = "12 Months"

      console.log(months4, months5, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months4 == true && months6 == true) {
      months4 = "14 Months";
      months6 = "6 Months"

      console.log(months4, months6, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months4 == true && months7 == true) {
      months4 = "14 Months";
      months7 = "5 Months"

      console.log(months4, months7, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months5 == true && months6 == true) {
      months6 = "6 Months";
      months5 = "12 Months"

      console.log(months6, months5, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months5 == true && months7 == true) {
      months7 = "5 Months";
      months5 = "12 Months"

      console.log(months7, months5, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months6 == true && months7 == true) {
      months6 = "6 Months";
      months7 = "5 Months"

      console.log(months6, months7, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months1 == true) {
      months1 = "36 Months";
      console.log(months1, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months2 == true) {
      months2 = "24 Months";
      console.log(months2, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months3 == true) {
      months3 = "18 Months";
      console.log(months3, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months4 == true) {
      months4 = "14 Months";
      console.log(months4, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months5 == true) {
      months5 = "12 Months";
      console.log(months5, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months6 == true) {
      months6 = "6 Months";
      console.log(months6, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (months7 == true) {
      months7 = "5 Months";
      console.log(months7, 'tttttttttttt')
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'multifilter/' + this.zip_code , JSON.stringify({
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "plan_information7": months7,
      }
      ), { headers: headers })

        // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
        .subscribe(Res => {
          console.log(Res)
          //console.log(selectedvalue)
          // console.log(plan_information)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            // console.log(prod["plan_information"])
            // console.log(prod["price_rate"])
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
  }
  renewableenergy(energy) {
    console.log(energy)
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
    this.http.post(Config.api + 'renewableenergy/' + this.zip_code + '', JSON.stringify({

      "renewable1": energy
    }
    ), { headers: headers })

      // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
      .subscribe(Res => {
        console.log(Res)
        //console.log(selectedvalue)
        // console.log(plan_information)
        this.sg['products'] = Res.json()['Results'];
        this.data.changeProducts(this.sg['products']);
        for (let prod of this.sg['products']) {
          // console.log(prod["plan_information"])
          // console.log(prod["price_rate"])
          prod["plan_information"] = prod["plan_information"].split(',,', 3000);
          prod["price_rate"] = prod["price_rate"].split('..', 3000);
        }

      });
  }
  // fixed = false;
  // vari = false;
  // index = false;
  plantype(fixed, vari, index) {
    if (fixed == true) {
      fixed = "Fixed Rate";

      console.log(fixed, 'tttttttttttt');
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(Config.api + 'multifilter/' + this.zip_code, JSON.stringify({
        "plan_type1": fixed,
        "plan_type2": index,
        "plan_type3": vari,
      }
      ), { headers: headers })

        .subscribe(Res => {
          console.log(Res)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (index == true) {
      index = "Indexed (Market Rate)";
      console.log(index, 'tttttttttttt');
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(Config.api + 'multifilter/' + this.zip_code, JSON.stringify({
        "plan_type1": fixed,
        "plan_type2": index,
        "plan_type3": vari,
      }
      ), { headers: headers })

        .subscribe(Res => {
          console.log(Res)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (vari == true) {

      vari = "Variable (Changing Rate)";

      console.log(vari, 'tttttttttttt');
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(Config.api + 'multifilter/' + this.zip_code, JSON.stringify({
        "plan_type1": fixed,
        "plan_type2": index,
        "plan_type3": vari,
      }
      ), { headers: headers })

        .subscribe(Res => {
          console.log(Res)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (fixed == true && vari == true && index == true) {
      fixed = "Fixed Rate";
      vari = "Variable (Changing Rate)";
      index = "Indexed (Market Rate)";
      console.log(fixed, vari, index, 'tttttttttttt');
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(Config.api + 'multifilter/' + this.zip_code, JSON.stringify({
        "plan_type1": fixed,
        "plan_type2": index,
        "plan_type3": vari,
      }
      ), { headers: headers })

        .subscribe(Res => {
          console.log(Res)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });

    }
    else if (fixed == true && vari == true) {
      fixed = "Fixed Rate";
      vari = "Variable (Changing Rate)";

      console.log(fixed, vari, 'tttttttttttt');
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(Config.api + 'multifilter/' + this.zip_code, JSON.stringify({
        "plan_type1": fixed,
        "plan_type2": index,
        "plan_type3": vari,
      }
      ), { headers: headers })

        .subscribe(Res => {
          console.log(Res)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (fixed == true && index == true) {
      fixed = "Fixed Rate";

      index = "Indexed (Market Rate)";
      console.log(fixed, index, 'tttttttttttt');
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(Config.api + 'multifilter/' + this.zip_code, JSON.stringify({
        "plan_type1": fixed,
        "plan_type2": index,
        "plan_type3": vari,
      }
      ), { headers: headers })

        .subscribe(Res => {
          console.log(Res)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (index == true && vari == true) {

      vari = "Variable (Changing Rate)";
      index = "Indexed (Market Rate)";
      console.log(vari, index, 'tttttttttttt');
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(Config.api + 'multifilter/' + this.zip_code, JSON.stringify({
        "plan_type1": fixed,
        "plan_type2": index,
        "plan_type3": vari,
      }
      ), { headers: headers })

        .subscribe(Res => {
          console.log(Res)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    //   this.vari= "Variable (Changing Rate)";
    //  this.index = "Indexed (Market Rate)";

  }

  aChecked: boolean = false;
  bChecked: boolean = false;
  nullplan() {
    console.log(this.aChecked)
    // if (this.aChecked) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.get(Config.api + 'planmin/' + this.zip_code + '', { headers: headers })

      .subscribe(Res => {
        console.log(Res, 'hhhhhhhhhhhhhhhhhhh')
        this.sg['products'] = Res.json()['Results'];
        this.data.changeProducts(this.sg['products']);
        this.allItems = this.sg['products'];
        for (let prod of this.sg['products']) {
          console.log(prod["plan_information"])
          console.log(prod["minumum_usage_fee"])
          prod["plan_information"] = prod["plan_information"].split(',,', 3000);
          prod["price_rate"] = prod["price_rate"].split('..', 3000);
        }
      });

    // } else (error => {
    //   console.log(error)

    // }

    // );

  }
  preplanChecked: boolean = false;
  prepaidplan() {
    console.log(this.preplanChecked)
    // this.route.params.subscribe(params => {
    //   let zip =  this.sg['product_zipcode'];
    // if (this.preplanChecked) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.get(Config.api + 'onlyprepaidplans/' + this.zip_code + '', { headers: headers })

      .subscribe(Res => {
        console.log(Res, 'hhhhhhhhhhhhhhhhhhh')
        this.sg['products'] = Res.json()['Results'];
        this.data.changeProducts(this.sg['products']);
        this.allItems = this.sg['products'];
        for (let prod of this.sg['products']) {
          console.log(prod["plan_information"])
          console.log(prod["minumum_usage_fee"])
          prod["plan_information"] = prod["plan_information"].split(',,', 3000);
          prod["price_rate"] = prod["price_rate"].split('..', 3000);
        }
      });

    // } else (error => {
    //   console.log(error)

    // }

    // );

  }
  noplanChecked: boolean = false;
  nopaidplan() {
    console.log(this.noplanChecked)
    // if (this.noplanChecked) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.get(Config.api + 'noprepaidplans/' + this.zip_code + '', { headers: headers })

      .subscribe(Res => {
        console.log(Res, 'hhhhhhhhhhhhhhhhhhh')
        this.sg['products'] = Res.json()['Results'];
        this.data.changeProducts(this.sg['products']);
        this.allItems = this.sg['products'];
        for (let prod of this.sg['products']) {
          console.log(prod["plan_information"])
          console.log(prod["minumum_usage_fee"])
          prod["plan_information"] = prod["plan_information"].split(',,', 3000);
          prod["price_rate"] = prod["price_rate"].split('..', 3000);
        }
      });

    // } else (error => {
    //   console.log(error)

    // }

    // );

  }
  autocomplete = "off";
  fullplan() {
    console.log(this.bChecked)
    //if (this.bChecked) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.get(Config.api + 'planfull/' + this.zip_code + '', { headers: headers })

      .subscribe(Res => {
        console.log(Res)
        this.sg['products'] = Res.json()['Results'];
        this.data.changeProducts(this.sg['products']);
        this.allItems = this.sg['products'];
        for (let prod of this.sg['products']) {
          console.log(prod["plan_information"])
          console.log(prod["minumum_usage_fee"])
          prod["plan_information"] = prod["plan_information"].split(',,', 3000);
          prod["price_rate"] = prod["price_rate"].split('..', 3000);
          prod["minumum_usage_fee"] = prod["minumum_usage_fee"];

        }
      });
    // } else (error => {
    //   console.log(error)
    // }

    // );
  }

  fetchrenewable() {
    // this.route.params.subscribe(params => {
    //   let zip =  this.sg['product_zipcode'];
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
    //this.http.get(Config.api + 'monthly/' + this.zip_code + '',{ headers: headers })

    this.http.get(Config.api + 'reneable/' + this.zip_code + '/', { headers: headers })
      .subscribe(Res => {
        this.sg['products'] = Res.json()['Results'];
        this.data.changeProducts(this.sg['products']);
        this.allItems = this.sg['products'];
        for (let prod of this.sg['products']) {
          // console.log(prod["plan_information"])
          // console.log(prod["price_rate"])
          prod["plan_information"] = prod["plan_information"].split(',,', 3000);
          prod["price_rate"] = prod["price_rate"].split('..', 3000);
        }
      });

  }
  notChecked: boolean = false;
  notime() {
    console.log(this.notChecked)
    // this.route.params.subscribe(params => {
    //   let zip =  this.sg['product_zipcode'];
    // if (this.notChecked) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.get(Config.api + 'notimeuseplans/' + this.zip_code + '', { headers: headers })

      .subscribe(Res => {
        console.log(Res, 'hhhhhhhhhhhhhhhhhhh')
        this.sg['products'] = Res.json()['Results'];
        this.data.changeProducts(this.sg['products']);
        this.allItems = this.sg['products'];
        for (let prod of this.sg['products']) {
          console.log(prod["plan_information"])
          console.log(prod["minumum_usage_fee"])
          prod["plan_information"] = prod["plan_information"].split(',,', 3000);
          prod["price_rate"] = prod["price_rate"].split('..', 3000);
        }
      });

    // } else (error => {
    //   console.log(error)

    // }

    // );

  }


  onlyChecked: boolean = false;
  showtime() {
    console.log(this.onlyChecked)
    // this.route.params.subscribe(params => {
    //   let zip =  this.sg['product_zipcode'];
    // if (this.onlyChecked) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.get(Config.api + 'onlytimeuseplans/' + this.zip_code + '', { headers: headers })

      .subscribe(Res => {
        console.log(Res, 'hhhhhhhhhhhhhhhhhhh')
        this.sg['products'] = Res.json()['Results'];
        this.data.changeProducts(this.sg['products']);
        this.allItems = this.sg['products'];
        for (let prod of this.sg['products']) {
          console.log(prod["plan_information"])
          console.log(prod["minumum_usage_fee"])
          prod["plan_information"] = prod["plan_information"].split(',,', 3000);
          prod["price_rate"] = prod["price_rate"].split('..', 3000);
        }
      });

    // } 
    // else (error => {
    //   console.log(error)

    // }

    // );

  }

  pricerate(min, max) {
    console.log(this.price)
    if (this.price == 500) {
      console.log(min, max, 'tttttttttttt');
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(Config.api + 'pricerange/' + this.zip_code, JSON.stringify({

        "price_500_kwh_min_price": min,
        "price_500_kwh_max_price": max

      }
      ), { headers: headers })

        .subscribe(Res => {
          console.log(Res)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });

    }
    else if (this.price == 1000) {
      //   this.vari= "Variable (Changing Rate)";
      //  this.index = "Indexed (Market Rate)";
      console.log(min, max, 'tttttttttttt');
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(Config.api + 'pricerange/' + this.zip_code, JSON.stringify({
        "price_1000_kwh_min_price": min,
        "price_1000_kwh_max_price": max

      }
      ), { headers: headers })

        .subscribe(Res => {
          console.log(Res)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    }
    else if (this.price == 2000) {
      console.log(min, max, 'tttttttttttt');
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(Config.api + 'pricerange/' + this.zip_code, JSON.stringify({

        "price_2000_kwh_min_price": min,
        "price_2000_kwh_max_price": max
      }
      ), { headers: headers })

        .subscribe(Res => {
          console.log(Res)
          this.sg['products'] = Res.json()['Results'];
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }

        });
    };

  }
  months1 = "";
  months2 = "";
  months3 = "";
  months4 = "";
  months5 = "";
  months7 = "";
  months6 = "";
  fixed = "";
  vari = "";
  index = "";
  notprepaid="";
  prepaid="";
  planmin="";
  time="";
  nottime="";
  renewablerate="";
  com="";
  checked1(event, i) {
    if(event.target.checked == true){
    console.log(event.target.checked)
    this.months1="36 Months";    
}
else if(event.target.checked == false){
    console.log(event.target.checked)
    this.months1=""; 
}
console.log(this.months1)
}
checked2(event, i) {
  if(event.target.checked == true){
  console.log(event.target.checked)
  this.months2="24 Months";    
}
else if(event.target.checked == false){
  console.log(event.target.checked)
  this.months2=""; 
}
console.log(this.months2)
}
checked3(event, i) {
  if(event.target.checked == true){
  console.log(event.target.checked)
  this.months3="18 Months";    
}
else if(event.target.checked == false){
  console.log(event.target.checked)
  this.months3=""; 
}
console.log(this.months3)
}
checked4(event, i) {
  if(event.target.checked == true){
  console.log(event.target.checked)
  this.months4="14 Months";    
}
else if(event.target.checked == false){
  console.log(event.target.checked)
  this.months4=""; 
}
console.log(this.months4)
}
checked5(event, i) {
  if(event.target.checked == true){
  console.log(event.target.checked)
  this.months5="12 Months";    
}
else if(event.target.checked == false){
  console.log(event.target.checked)
  this.months5=""; 
}
console.log(this.months5)
}
checked6(event, i) {
  if(event.target.checked == true){
  console.log(event.target.checked)
  this.months6="6 Months";    
}
else if(event.target.checked == false){
  console.log(event.target.checked)
  this.months6=""; 
}
console.log(this.months6)
}
checked7(event, i) {
  if(event.target.checked == true){
  console.log(event.target.checked)
  this.months7="5 Months";    
}
else if(event.target.checked == false){
  console.log(event.target.checked)
  this.months7=""; 
}
console.log(this.months7)
}
checked8(event, i) {
  if(event.target.checked == true){
  console.log(event.target.checked)
  this.fixed = "Fixed Rate";    
}
else if(event.target.checked == false){
  console.log(event.target.checked)
  this.fixed=""; 
}
console.log(this.fixed)
}
checked9(event, i) {
  if(event.target.checked == true){
  console.log(event.target.checked)
  this.vari = "Variable (Changing Rate)";    
}
else if(event.target.checked == false){
  console.log(event.target.checked)
  this.vari=""; 
}
console.log(this.vari)
}
checked10(event, i) {
  if(event.target.checked == true){
  console.log(event.target.checked)
  this.index = "Indexed (Market Rate)"  
}
else if(event.target.checked == false){
  console.log(event.target.checked)
  this.index=""; 
}
console.log(this.index)
}
checked11(event, i) {
  if(event.target.checked == true){
  console.log(event.target.checked)
  this.notprepaid = "prepaid";
  console.log('jjjjjjjjjjjjjjjjj')
  console.log(this.notprepaid);
  // this.prepaid == "";
}
else if(event.target.checked == false){
  console.log(event.target.checked)
  this.notprepaid=""; 
}
console.log(this.notprepaid)
}
checked12(event, i) {
  if(event.target.checked == true){
  console.log(event.target.checked);
  this.prepaid = "prepaid";
  // this.notprepaid == "";
}
else if(event.target.checked == false){
  console.log(event.target.checked)
   this.prepaid=""; 
}
console.log(this.prepaid)
}
checked13(event, i) {
  if(event.target.checked == true){
  console.log(event.target.checked);
  this.planmin="NULL";
   this.planmin == "";
}
else if(event.target.checked == false){
  console.log(event.target.checked)
  this.planmin=""; 
}
console.log(this.planmin)
}
checked14(event, i) {
  if(event.target.checked == true){
  console.log(event.target.checked);
  this.time="Time Of Use";
 
}
else if(event.target.checked == false){
  console.log(event.target.checked)
  this.time=""; 
}
console.log(this.time)
}
checked15(event, i) {
  if(event.target.checked == true){
  console.log(event.target.checked);
  this.nottime="Time Of Use";
 
}
else if(event.target.checked == false){
  console.log(event.target.checked)
  this.nottime=""; 
}
console.log(this.nottime)
}
checked16(event, i,energy) {
  if(energy){
  console.log(energy);
  this.renewable=energy;
 
}
else if(!energy){
  console.log()
  this.renewable=""; 
}
console.log(this.renewable)
}
checked17(event,i,comp) {
  if(comp){
  console.log(comp);
  this.com=comp.trim();
 
}
else if(!comp){
  console.log()
  this.com=""; 
}
console.log(this.com)
}
  search(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
  }
    console.log(this.months1, this.months2, this.months3, this.months4, this.months5, this.months6, this.months7,this.fixed, this.vari, this.index,this.prepaid,this.notprepaid,this.planmin,this.time,this.nottime, this.renewable,this.com)
    if (this.months1 == "36 Months" || this.months2 == "24 Months" || this.months3 == "18 Months" || this.months4 == "14 Months" || this.months5 == "12 Months" || this.months6 == "6 Months" || this.months7 == "5 Months" || this.fixed == "Fixed Rate" || this.vari == "Variable (Changing Rate)" || this.index == "Indexed (Market Rate)" || this.notprepaid == "Prepaid" || this.prepaid == "Prepaid" || this.planmin == "NULL" || this.time == "Time Of Use" || this.nottime == "Time Of Use" || this.renewable || this.com) {
    
    
      console.log(this.months1, this.months2, this.months3, this.months4, this.months5, this.months6, this.months7,this.fixed, this.vari, this.index,this.prepaid,this.notprepaid,this.planmin,this.time,this.nottime,this.renewable,this.com, 'tttttttttttt');
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(Config.api+'multifilter/'+this.zip_code +'?page='+page,JSON.stringify({
        "plan_type1": this.fixed,
        "plan_type2": this.index,
        "plan_type3": this.vari,
        "plan_information1": this.months1,
        "plan_information2": this.months2,
        "plan_information3": this.months3,
        "plan_information4": this.months4,
        "plan_information5": this.months5,
        "plan_information6": this.months6,
        "prepaid": this.prepaid,
        "noprepaid": this.notprepaid,
        "planmin": this.planmin,
        "time":this.time,
        "notime":this.nottime,
        "renewablerate":this.renewable,
        "company":this.com
      }
      ), { headers: headers })

        .subscribe(Res => {
          console.log(Res)

          this.sg['products'] = Res.json()['Results'];
          localStorage.setItem('PRO',Res.json()['Results'])
          localStorage.setItem('Pages',Res.json()['Total Result'])
          this.data.changeProducts(this.sg['products']);
          for (let prod of this.sg['products']) {
            prod["plan_information"] = prod["plan_information"].split(',,', 3000);
            prod["price_rate"] = prod["price_rate"].split('..', 3000);
          }
          this.pager = this.pagerService.getPager(Res['Total Result'], page, 10);

        });
    }
    else{
      swal({
        type: 'error',
        title: 'Please Select any of filter!!!',
        showConfirmButton: true,
        timer: 1500

      })
     
    }
 
}}
