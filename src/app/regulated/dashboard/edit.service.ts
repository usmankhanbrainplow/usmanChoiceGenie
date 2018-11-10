import { Injectable } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map'
import {Config} from "../../Config";
@Injectable()
export class EditService {

  constructor(private http: Http) { }
  

editTodoList(mydate,updateddate,id,updatedtitle,updatedsign_up,updatedphone,updatedterms_of_service,updatedfact_sheet,updatedcancelation_fee,updatedprice500kwh,updatedprice1000kwh,updatedprice2000kwh,updatedplan_information,updatedrating_logo,updatedprofile_logo,updatedprofileurl,active) {
  
  console.log(" service object",mydate,updateddate,id,updatedtitle,updatedsign_up,updatedphone,updatedterms_of_service,updatedfact_sheet,updatedcancelation_fee,updatedprice500kwh,updatedprice1000kwh,updatedprice2000kwh,updatedplan_information,updatedrating_logo,updatedprofile_logo,updatedprofileurl,active)
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  
  return this.http.put(Config.api + 'dataup/'+ id , JSON.stringify({
   
    "cancelation_fee":updatedcancelation_fee,
    "fact_sheet":updatedfact_sheet,
    "phone":updatedphone, 
    "plan_information":updatedplan_information,
    "price_1000_kwh":updatedprice1000kwh,
    "price_500_kwh":updatedprice500kwh,
    "price_2000_kwh":updatedprice2000kwh,
    "profile_logo":updatedprofile_logo,
    "profileurl":updatedprofileurl,
    "rating_logo":updatedrating_logo,
    "sign_up":updatedsign_up,
    "terms_of_service":updatedterms_of_service,
    "title":updatedtitle,
    "active":active,
    "product_inactive_date":updateddate,
    "publish_product_date":mydate
  }), 
  {headers: headers}).map((response: Response) => response.json());
  }
  activeTodoList(date,id,updatedtitle,updatedsign_up,updatedphone,updatedterms_of_service,updatedfact_sheet,updatedcancelation_fee,updatedprice500kwh,updatedprice1000kwh,updatedprice2000kwh,updatedplan_information,updatedrating_logo,updatedprofile_logo,updatedprofileurl,active) {
  
    console.log(" service object",date,id,updatedtitle,updatedsign_up,updatedphone,updatedterms_of_service,updatedfact_sheet,updatedcancelation_fee,updatedprice500kwh,updatedprice1000kwh,updatedprice2000kwh,updatedplan_information,updatedrating_logo,updatedprofile_logo,updatedprofileurl,active)
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(Config.api + 'dataup/'+ id , JSON.stringify({
     
      "cancelation_fee":updatedcancelation_fee,
      "fact_sheet":updatedfact_sheet,
      "phone":updatedphone, 
      "plan_information":updatedplan_information,
      "price_1000_kwh":updatedprice1000kwh,
      "price_500_kwh":updatedprice500kwh,
      "price_2000_kwh":updatedprice2000kwh,
      "profile_logo":updatedprofile_logo,
      "profileurl":updatedprofileurl,
      "rating_logo":updatedrating_logo,
      "sign_up":updatedsign_up,
      "terms_of_service":updatedterms_of_service,
      "title":updatedtitle,
      "active":active,
      
      "publish_product_date":date
    }), 
    {headers: headers}).map((response: Response) => response.json());
    }
    editderegulated(mydate,updateddate,id,updatedtitle,updatedsign_up,updatedphone,updatedterms_of_service,updatedfact_sheet,updatedcancelation_fee,updatedprice,updatedplan_information,updatedrating_logo,updatedprofile_logo,updatedprofileurl,active) {
  
      console.log(" service object",mydate,updateddate,id,updatedtitle,updatedsign_up,updatedphone,updatedterms_of_service,updatedfact_sheet,updatedcancelation_fee,updatedprice,updatedplan_information,updatedrating_logo,updatedprofile_logo,updatedprofileurl,active)
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.put(Config.api + 'deregulated_edit_product/'+ id , JSON.stringify({
       
        "cancelation_fee":updatedcancelation_fee,
        "fact_sheet":updatedfact_sheet,
        "phone":updatedphone, 
        "plan_information":updatedplan_information,
        "price_rate":updatedprice,
        "profile_logo":updatedprofile_logo,
        "profileurl":updatedprofileurl,
        "rating_logo":updatedrating_logo,
        "sign_up":updatedsign_up,
        "terms_of_service":updatedterms_of_service,
        "title":updatedtitle,
        "active":active,
        "product_inactive_date":updateddate,
        "publish_product_date":mydate
      }), 
      {headers: headers}).map((response: Response) => response.json());
      }
      activederegulated(date,id,updatedtitle,updatedsign_up,updatedphone,updatedterms_of_service,updatedfact_sheet,updatedcancelation_fee,updatedprice,updatedplan_information,updatedrating_logo,updatedprofile_logo,updatedprofileurl,active) {
  
        console.log(" service object",date,id,updatedtitle,updatedsign_up,updatedphone,updatedterms_of_service,updatedfact_sheet,updatedcancelation_fee,updatedprice,updatedplan_information,updatedrating_logo,updatedprofile_logo,updatedprofileurl,active)
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(Config.api + 'deregulated_edit_product/'+ id , JSON.stringify({ 
          "cancelation_fee":updatedcancelation_fee,
          "fact_sheet":updatedfact_sheet,
          "phone":updatedphone, 
          "plan_information":updatedplan_information,
          "price_rate":updatedprice,
          "product_inactive_date":"null",
          "profile_logo":updatedprofile_logo,
          "profileurl":updatedprofileurl,
          "rating_logo":updatedrating_logo,
          "sign_up":updatedsign_up,
          "terms_of_service":updatedterms_of_service,
          "title":updatedtitle,
          "active":active,
          "publish_product_date":date
        }), 
        {headers: headers}).map((response: Response) => response.json());
        }
}
