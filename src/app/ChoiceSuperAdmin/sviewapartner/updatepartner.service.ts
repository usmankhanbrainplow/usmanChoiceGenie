import { Injectable } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Config} from "../../Config";
@Injectable()
export class UpdatepartnerService {

  constructor(private http: Http) { }
editTodoList(id,updatedname,updatedemail,updatedpartnername,updateddesc,updatedactivepartner) {
  console.log('Approve user');
  console.log(" service object",id,updatedname,updatedemail,updatedpartnername,updateddesc,updatedactivepartner)
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  return this.http.put(Config.api + 'partner/'+ id , JSON.stringify({
  "name": updatedname,
  "email":updatedemail,
  "partnername": updatedpartnername,
  "desc": updateddesc,
  "activepartner": updatedactivepartner    
  }), 
  {headers: headers}).map((response: Response) => response.json());
  }

}
