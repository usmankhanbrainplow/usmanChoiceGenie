import { Injectable } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map'
import {Config} from "../../Config";
@Injectable()
export class DeleteService {

  constructor(private http: Http) { }
  objGlobalvariables;

DeleteTodoList(id) {
  console.log(id)
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  return this.http.delete(Config.api + 'deldata/'+ id ,
  {headers: headers}).map((response: Response) => response.json());
  }
  Deletederegulated(id) {
    console.log(id)
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.delete(Config.api + 'deregulated_edit_product/'+ id ,
    {headers: headers}).map((response: Response) => response.json());
    }
}