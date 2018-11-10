import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataloginService {
  private url: string = 'https://apis.choicegenie.com/';
  constructor(private http: Http) { }
  login(post): Observable<any> {

    console.log(post);
    const getLoginUrl = this.url + 'login/' + post['username'] + '/' + post['password'];
    return this.http
      .get(getLoginUrl, {})
      .map(
      res => {
        if (res.json().status == true) {
          localStorage.setItem('currentUser', JSON.stringify(res.json().data));
        }
        return res.json();
      },
      err => {
        return err;
      }
      )
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
 
}