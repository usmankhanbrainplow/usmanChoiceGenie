import { Injectable } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map'
import {Config} from "../Config";
@Injectable()
export class SideBarService {

  months:any[];
  constructor(private http: Http) { }

  searchProducts(zip_code) {
    return this.http.get(Config.api+'data_against_zipcode/' + zip_code ).map((response: Response) => response.json());
    // return this.http.get('http://192.168.30.52:9000/choice/zipcodedata/'+id+'?page='+page).map((response: Response) => response.json());
  }


}
