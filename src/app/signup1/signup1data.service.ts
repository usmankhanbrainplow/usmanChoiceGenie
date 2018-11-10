import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Injectable} from '@angular/core';
import {Http ,Headers , Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
// import { Router, RouterModule,NavigationEnd } from '@angular/router';
// import { AuthHttp, AuthConfig , JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import { NgForm } from "@angular/forms";
//import { HttpService } from '../ser/http-service';
@Injectable()
export class signupuserdata {
  
  constructor(private _http1: Http ) { }
//   email_exist(email){
//     return this._http1.post('http://ns520442.ip-158-69-23.net:6002/email_exist/',{ist
//      'email':email
//     }).map((res: Response) => res.json() )
// }
 
}
