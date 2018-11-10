import { Injectable } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map'
import {Config} from "../../Config";
@Injectable()
export class UpdategetuserService {

  constructor(private http: Http) { }
   // item.id,item.zipcode,item.utilityarea,item.title,item.Phone,item.state,item.country,item.status,item.user
//id,updatedrepname,updatedrepcertificateid,updatedcontactname,updatedcontactphone,updatedmarket,updatedstate,updateduser
editTodoList(id,updatedname,updatedemail,updatedpartnername,updateddesc,updatedactivepartner) {
  console.log('Approve user');
  console.log(" service object",id,updatedname,updatedemail,updatedpartnername,updateddesc,updatedactivepartner)
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  // return this.http.put('http://192.168.30.193:9000/choice/dashboardstatus/'+ id , JSON.stringify({
  return this.http.put(Config.api + 'partner/'+ id , JSON.stringify({
 // return this.http.put(Config.api+'dataup/'+ id , JSON.stringify({
   
  // "id": 59,
  // "name": "hamza",
  // "email": "hamza@gmail.com",
  // "partnername": "ihasni",
  // "desc": "gdudud",
  // "activepartner": trueupdatedname,updatedemail,updatedpartnername,updateddesc,updateduser
// "id":id,
  "name": updatedname,
  "email":updatedemail,
  "partnername": updatedpartnername,
  "desc": updateddesc,
  "activepartner": updatedactivepartner


 
    
  }), 
  {headers: headers}).map((response: Response) => response.json());
  }

}
