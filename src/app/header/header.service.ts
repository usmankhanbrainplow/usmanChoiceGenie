import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { Config } from "../Config";
import { HttpService } from '../serv/http-service';
@Injectable()
export class HeaderService {
  public username;
  months: any[];
  constructor(private http: HttpService, private _http5: Http) {
  }
  // searchrecord(search) {

  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   // return this._http5.post(Config.api + 'search/',
  //   return this._http5.get(Config.api + 'zipcodewith_country_city/' + search,
  //     { headers: headers }).map((response: Response) => response.json());
  // }
  searchrecord(search) {
     
       console.log(search)
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http5.post(Config.api+'search/' , JSON.stringify({
          "search": search }), 
        {headers: headers}).map((response: Response) => response.json());
        }
  searchProducts(id, page) {
    console.log(id)
    return this.http.get(Config.api + 'zipcodedata/' + id + '?page=' + page + '/').map((response: Response) => response.json());
  }
  inactiveproduct(title, page) {
    console.log(title)
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'JWT ' +  this.authentication);
    headers.append('Authorization', 'JWT ' + localStorage.getItem('token'));
    console.log('pofile', localStorage.getItem('token'));
    return this.http.get(Config.api + 'inactive/' + this.username + '?page=' + page + '/', { headers: headers }).map((response: Response) => response.json());
  }
}
