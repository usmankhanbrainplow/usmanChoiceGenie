import { Injectable } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map'
import {Config} from "../../Config";
@Injectable()
export class DeletegetuserService {

  constructor(private http: Http) { }
  objGlobalvariables;

DeleteTodoList(id) {
 // console.log('mmmmmmmmmmmmmmmmmmmmm');
  console.log(id)
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  // return this.http.delete('http://192.168.30.193:9000/choice/partnersdel/'+ id ,
  return this.http.delete(Config.api+'partnersdel/'+ id ,
  {headers: headers}).map((response: Response) => response.json());
  }
}