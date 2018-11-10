import { Injectable } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map'
import {Config} from "../../Config";
@Injectable()
export class SuperupdateService {

  constructor(private http: Http) { }
editTodoList(id,updatedrepname,updatedrepcertificateid,updatedcontactname,updatedcontactphone,updatedmarket,updatedstatus,updateduser,updatedcontact_email) {
  console.log('Approve user');
  console.log(" service object",id,updatedrepname,updatedrepcertificateid,updatedcontactname,updatedcontactphone,updatedmarket,updatedstatus,updateduser,updatedcontact_email)
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  return this.http.put(Config.api + 'dashboardstatus/'+ id , JSON.stringify({   
 "id":id,
  "REP_name": updatedrepname,
  "REP_certificate_id": updatedrepcertificateid,
  "Contact_Name": updatedcontactname,
  "Contact_Phone": updatedcontactphone,
  "Market": updatedmarket,
  "status": updatedstatus,
  "user": updateduser  ,
  "contact_email":updatedcontact_email 
  }), 
  {headers: headers}).map((response: Response) => response.json());
  }

}
