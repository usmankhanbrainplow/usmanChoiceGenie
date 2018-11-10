import { Injectable } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map'
import {Config} from "../../Config";
@Injectable()
export class EditreviewService {

  constructor(private http: Http) { }
  

editTodoList(id,uprate,upproid,upstatus,upzip,upcomt,upuser,updateduser) {
  
  console.log(" service object",id,uprate,upproid,upstatus,upzip,upcomt,upuser,updateduser)
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  return this.http.put(Config.api + 'reviewchangestatus/'+ id , JSON.stringify({
   
    "id":id,
      "rate": uprate,
      "productid": upproid,
      "zipcode": upzip,
      "comment": upcomt,
      "username": upuser,
      "reviewactive": upstatus,
  "user":updateduser
  }), 
  {headers: headers}).map((response: Response) => response.json());
  }

}
