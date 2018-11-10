import { Injectable } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map'
@Injectable()
export class HomeService {
  constructor(private http: Http) { }

  signUpProduct(moveIn, reqDate, fName, mName, lName, DOB, authRep, aprtName, stAddress, city, state, zip, SSN, dLisence, LisenceState,
                expDate, securityQ, securityA, lifeSupport, autoBill, creditVeri, check1, check2, check3) {
      return this.http.post('http://192.168.29.185:8000/customers/signup',{
        
      });
  }
}
