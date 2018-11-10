import { Injectable } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map'
import {Config} from "./Config";
@Injectable()
export class ChangepasswordService {
  private authentication=localStorage.getItem('token');
  username;

 
  constructor(private http: Http) { }
  // username;
  // username = localStorage.getItem('username')

  changepsd(username,oldpass,pass1,pass2) {
   this.username = localStorage.getItem('username')
    console.log(" service object",username,oldpass,pass1,pass2,this.authentication)
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'JWT ' +  this.authentication.toString());
    return this.http.put(Config.api+'change_password/'+ this.username
    +'/' , JSON.stringify({
     
      "currentPassword":oldpass,
      "newPassword":pass1, 
      "newPassword2":pass2
      
    }), 
    {headers: headers}).map((response: Response) => response.json());
    }
  
  }

  



  