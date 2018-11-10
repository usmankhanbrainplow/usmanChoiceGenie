import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Http ,Headers , Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
// import { Router, RouterModule,NavigationEnd } from '@angular/router';
// import { AuthHttp, AuthConfig , JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import { NgForm } from "@angular/forms";
import { Config } from '../../Config';

@Injectable()
export class ResidentialService {

  constructor( private _http5: Http) { }
  loaded:boolean =false;
  login(username: string, password: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
  //return this.http.get(Config.api+'data_against_zipcode/'+id+'?page='+page).map((response: Response) => response.json());
    // return this._http5.post(Config.api+'user-token-auth/',
    return this._http5.put(Config.api+'login/',
      JSON.stringify({username: username, password: password }), {headers: headers})
      .map((response: Response) => {
        let user =  { username: username, token: response.json().token};
  
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          // console.log ("junaid",localStorage.getItem('currentUser'))
        }
      });
  }
  
  
  login_authenticate(username:string,password:string){
      return this._http5.put( Config.api+'login/',{
          'username':username,
          'password':password
      }).map((res: Response) => res.json() ) 
  }
  
  
  
  post_service(obj)
  {
  
  // console.log('service');
  // console.log(obj);
  
  return this._http5.post( Config.api+"signup1/",{
      'obj':obj
  }).map((res: Response) => res.json());
  
  }
  activation_service(email){
      console.log(email);
      return this._http5.post(Config.api+"authenticade_code/",{
          'email':email
      }).map((res: Response) => res.json() ) 
  }
  
  authenticate_service(uid) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this._http5.get(Config.api+'signup1/'+uid,
      {headers: headers}).map((response: Response) => response.json());
  
  }
  forget_password(email){
     
      return this._http5.post(Config.api+'forget_password/',{
          'email':email
      }).map((res: Response) => res.json() ) 
      
      
  }
  change_password(pass1,pass2,code){
      return this._http5.post(Config.api+'change_password/',{
          'pass1':pass1,
          'pass2':pass2,
          'code':code,
      }).map((res: Response) => res.json() ) 
  }
  
  
  }
  