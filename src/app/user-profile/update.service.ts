import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { Config } from "../Config";
@Injectable()
export class UpdateService {
  public username;
  private authentication = localStorage.getItem('token');
  constructor(private http: Http) {
    this.username = localStorage.getItem('username');
  }

  // item.id,item.zipcode,item.utilityarea,item.title,item.Phone,item.state,item.country,item.status,item.user
  //id,updatedrepname,updatedrepcertificateid,updatedcontactname,updatedcontactphone,updatedmarket,updatedstate,updateduser
  editTodoList(updateid, updatename, updatecontact, updateserviceaddress, updateservicestate, updateservicecity, updateservicezipcode,
    updateauthenticationcode, updateacountactive, updateuserid) {
    console.log('Approve user');
    console.log(" service object", updateid, updatename, updatecontact, updateserviceaddress, updateservicestate, updateservicecity, updateservicezipcode,
      updateauthenticationcode, updateacountactive, updateuserid)
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'JWT ' +  this.authentication);
    headers.append('Authorization', 'JWT ' + localStorage.getItem('token'));
    console.log("userupdate", localStorage.getItem('token'));
    return this.http.put(Config.api + 'user_profile/' + this.username + '/', JSON.stringify({


      "id": updateid,
      "Name": updatename,
      "phone_no": updatecontact,
      "service_address": updateserviceaddress,
      "service_state": updateservicestate,
      "service_city": updateservicecity,
      "service_zip": updateservicezipcode,
      // "billing_address": updatebillingaddress,
      // "billing_city": updatebillingcity,
      // "billing_state": updatebillingstate,
      // "billing_zip": updatebillingZipcode,
      "authentication_code": updateauthenticationcode,
      "AcountActive": updateacountactive,
      "user": updateuserid




    }),
      { headers: headers }).map((response: Response) => response.json());
  }

}
