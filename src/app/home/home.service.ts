import { Injectable } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map'
import {Config} from "../Config";
import {HttpService} from '../serv/http-service';
@Injectable()
export class HomeService {
public username;
  months:any[];
  product;
  items;
  com;
  title;
  constructor(private http: Http) {this.username = localStorage.getItem('username');
  this.title=localStorage.getItem('title');
               this.product = localStorage.getItem('PRO');
}

  searchProducts(id,page) {
    console.log(id)
   
   return this.http.get(Config.api+'zipcodedata/' + id +'?page='+page).map((response: Response) => response.json());
    }
  searchProducts1(id,page) {
    console.log(id)
   return this.http.get(Config.api+'deregulated/' + id +'?page='+page +'').map((response: Response) => response.json());
  }
  inactiveproduct(title,page){
    console.log(title)
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'JWT ' +  this.authentication);
    headers.append('Authorization', 'JWT ' + localStorage.getItem('token'));
    console.log('pofile', localStorage.getItem('token'));
   
   return this.http.get(Config.api+'inactive/' + this.title.trim() +'?page='+page +'/',{ headers: headers }).map((response: Response) => response);

  }
  deregulatedinactivepro(title,page){
    console.log(title)
   
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'JWT ' +  this.authentication);
    headers.append('Authorization', 'JWT ' + localStorage.getItem('token'));
    console.log('pofile', localStorage.getItem('token'));
   return this.http.get(Config.api+'deregulated_inactive_product/' + this.title +'?page='+page +'/',{ headers: headers }).map((response: Response) => response);

  }
  filter(page,id,months1,months2,months3,months4,months5,months6,months7,fixed,vari,market,notprepaid,prepaid,planmin,time,nottime,renewable,name,sort,item,min500,max500,min1000,max1000,min2000,max2000,logo1,logo2,logo3,logo4,logo5,prepaidall,timeall,showallplanPB) {
if(name){
    this.com=name.trim();}
    console.log(page,id,months1,months2,months3,months4,months5,months6,months7,fixed,vari,market,prepaidall,notprepaid,prepaid,planmin,timeall,time,nottime,renewable,name,sort,item,min500,max500,min1000,max1000,min2000,max2000,showallplanPB)
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(Config.api+'multifilter/'+id +'?page='+page, JSON.stringify({
      "plan_type1": fixed,
      "plan_type2": market,
      "plan_type3": vari,
      "plan_information1": months1,
      "plan_information2": months2,
      "plan_information3": months3,
      "plan_information4": months4,
      "plan_information5": months5,
      "plan_information6": months6,
      "plan_information7": months7,
      "prepaid": prepaid,
      "noprepaid": notprepaid,
      "planmin": planmin,
      "allplans":showallplanPB,
      "bothplanspre":prepaidall,
      "bothplanstim":timeall,
      "time":time,
      "notime":nottime,
      "renewablerate":renewable,
      "company":this.com,
      "itemsperpage":item,

      "price_500_kwh_min_price":min500, 
      "price_500_kwh_max_price":max500,

      "price_1000_kwh_min_price": min1000,
      "price_1000_kwh_max_price": max1000,      

      "price_2000_kwh_min_price": min2000,
      "price_2000_kwh_max_price": max2000,

      // "itemsperpage":this.items,

      "dsc":sort,
      "logo1":logo1,
      "logo2":logo2,
      "logo3":logo3,
      "logo4":logo4,
      "logo5":logo5

      
      

     }), 
    {headers: headers}).map((response: Response) => response.json());
    }
  
  deregulatedfilter(page,zip_code,months1,months2,months3,months5,months6,items,dsc,com,min,max) {
    // console.log(price)
      if(items==undefined){
        this.items="10";
         console.log(page,zip_code,months1,months2,months3,months5,months6,items,dsc,com)
         const headers = new Headers();
         headers.append('Content-Type', 'application/json');
         return this.http.post(Config.api+'deregulated_genericfilter/'+zip_code +'?page='+page, JSON.stringify({
          
          "plan_information5": months1,
           "plan_information1": months2,
           "plan_information2": months3,
          
           "plan_information3": months5,
           "plan_information4": months6,
             "company":com,
           "itemsperpage": this.items,
           "dsc":dsc,
           "min_price":min,
            "max_price":max,
          }), 
         {headers: headers}).map((response: Response) => response.json());
         } else{
          console.log(page,zip_code,months1,months2,months3,months5,months6,items,dsc,com)
          const headers = new Headers();
          headers.append('Content-Type', 'application/json');
          return this.http.post(Config.api+'deregulated_genericfilter/'+zip_code +'?page='+page, JSON.stringify({
            "min_price":min,
            "max_price":max,
           "plan_information5": months1,
            "plan_information1": months2,
            "plan_information2": months3,
           
            "plan_information3": months5,
            "plan_information4": months6,
              "company":com,
            "itemsperpage":items,
            "dsc":dsc
           }), 
          {headers: headers}).map((response: Response) => response.json());
          }
        }
        }