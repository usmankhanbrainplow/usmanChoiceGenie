import { Injectable } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map'
import {Config} from "../../Config";
@Injectable()
export class EditService {

  constructor(private http: Http) { }
  

editTodoList(id,updatedserviceareaname,updatedtitle,updatedprofileurl,updatedprofile_logo,updatedproduct_name,updatedrate_type,updatedterms_month,updatedcustomer_type,
  updatedcancelation_fee,updatedfact_sheet,updatedterms_of_service,updatedphone,updatedsign_up,updatedminimum_usage_fee,updatedrenewable,
  updatedspecialterms,updatedprice1000kwh,updatedprice500kwh,updatedprice2000kwh,updatedcontact_email,mydate,updateddate,
  updatedenrollment_productid,updatedproduct_batch_rate,updatedrating_logo,active) {
  //mydate,updateddate,id,updatedtitle,updatedprofileurl,upactive,updatedprofile_logo,updatedrating_logo,updatedprice500kwh,updatedprice1000kwh,updatedprice2000kwh,updatedcancelation_fee,updatedfact_sheet,updatedterms_of_service,updatedphone,updatedsign_up,updatedproduct_name,updatedterms_month,updatedrenewable,updatedrate_type,updatedcustomer_type
  console.log(" service object",id,updatedserviceareaname,updatedtitle,updatedprofileurl,updatedprofile_logo,updatedproduct_name,updatedrate_type,updatedterms_month,updatedcustomer_type,
  updatedcancelation_fee,updatedfact_sheet,updatedterms_of_service,updatedphone,updatedsign_up,updatedminimum_usage_fee,updatedrenewable,
  updatedspecialterms,updatedprice1000kwh,updatedprice500kwh,updatedprice2000kwh,updatedcontact_email,mydate,updateddate,
  updatedenrollment_productid,updatedproduct_batch_rate,updatedrating_logo,active)
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  return this.http.put(Config.api + 'dataup/'+ id , JSON.stringify({
  //  updatedserviceareaname,updatedtitle,updatedprofileurl,updatedprofile_logo,updatedproduct_name,updatedrate_type,updatedterms_month,updatedcustomer_type,
  //  updatedcancelation_fee,updatedcancelation_fee,updatedfact_sheet,updatedterms_of_service,updatedphone,updatedsign_up,updatedminimum_usage_fee,updatedrenewable,
  //  updatedspecialterms,updatedprice1000kwh,updatedprice500kwh,updatedprice2000kwh,updatedcontact_email,mydate,updateddate,updatedenrollment_productid,updatedproduct_batch_rate
    "serviceareaname": updatedserviceareaname,
    "title": updatedtitle,
    "profileurl": updatedprofileurl,
    "profile_logo": updatedprofile_logo,
    'product_name':updatedproduct_name,
    'rate_type':updatedrate_type,
    'terms_month':updatedterms_month,
    'customer_type':updatedcustomer_type,
    "cancelation_fee": updatedcancelation_fee,
    "fact_sheet": updatedfact_sheet,
    "terms_of_service":updatedterms_of_service,
    "phone": updatedphone,
    "sign_up": updatedsign_up,
    "minumum_usage_fee": updatedminimum_usage_fee,
    "renewable": updatedrenewable,
    "specialterms": updatedspecialterms,
    "price_1000_kwh": updatedprice1000kwh,
    "price_500_kwh": updatedprice500kwh,
    "price_2000_kwh": updatedprice2000kwh,
    "contact_email": updatedcontact_email,
 "rating_logo":updatedrating_logo,
    'publish_product_date': mydate,
    'product_inactive_date': updateddate,
    "enrollment_productid":updatedenrollment_productid,
    "product_batch_rate":updatedproduct_batch_rate,
    "check":false,
    "active":active
  
  }), 
  {headers: headers}).map((response: Response) => response.json());
  }
  Deactive_products(id,mydate,updateddate) {
    //mydate,updateddate,id,updatedtitle,updatedprofileurl,upactive,updatedprofile_logo,updatedrating_logo,updatedprice500kwh,updatedprice1000kwh,updatedprice2000kwh,updatedcancelation_fee,updatedfact_sheet,updatedterms_of_service,updatedphone,updatedsign_up,updatedproduct_name,updatedterms_month,updatedrenewable,updatedrate_type,updatedcustomer_type
    console.log(" service object",id,mydate,updateddate)
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(Config.api + 'Deactive/'+ id , JSON.stringify({
   
      'publish_product_date': mydate,
      'product_inactive_date': updateddate,
      // "check":false,
      "active":"None"
    }), 
    {headers: headers}).map((response: Response) => response.json());
    }
    Active_products(id) {
      //mydate,updateddate,id,updatedtitle,updatedprofileurl,upactive,updatedprofile_logo,updatedrating_logo,updatedprice500kwh,updatedprice1000kwh,updatedprice2000kwh,updatedcancelation_fee,updatedfact_sheet,updatedterms_of_service,updatedphone,updatedsign_up,updatedproduct_name,updatedterms_month,updatedrenewable,updatedrate_type,updatedcustomer_type
      console.log(" service object",id)
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.put(Config.api + 'Deactive/'+ id , JSON.stringify({
     
        // 'publish_product_date': mydate,
        // 'product_inactive_date': updateddate,
        // "check":false,
        "active":true
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
