import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router, RouterModule, NavigationExtras } from "@angular/router";

import * as JWT from 'jwt-decode';

import 'rxjs/add/operator/map';
import { NgForm } from "@angular/forms";
import { Config } from '../../Config';
//import { HttpService } from './../serv/http-service';
@Injectable()
export class LoginService {

    constructor(private _nav: Router, private _http5: Http) { }
    hel: any = [];
    tit: any = [];
    word;
    loaded: boolean = false;
    currentUser;
    massage;

    private authentication: string | any;
    // asa


    login(username: string, password: string) {
        const headers = new Headers();

        headers.append('Content-Type', 'application/json');

        return this._http5.post(Config.api + 'loginCompany/',
            JSON.stringify({ username: username, password: password }), { headers: headers })
            .map((response: Response) => {

                let decoded = JWT(response.json().token);
                let decodedToken = { email: decoded.email, token: response.json().token, userid: decoded.id };
                if (decodedToken && decodedToken.token) {
                    // if (isPlatformBrowser(this.platformId)) {
                    localStorage.setItem('currentUser', JSON.stringify(decodedToken));
                    // }
                }

                // this.gettoken = JSON.parse(localStorage.getItem('currentUser'));

                // console.log("Email: ", this.gettoken.email);

                console.log(response.json()['Results']);
                this.hel = response.json()['Results'];
                this.massage = response.json()['Message'];
                localStorage.setItem('massage', this.massage);
                console.log(this.massage);
                this.tit = this.hel[0];
                console.log(this.tit);
                this.word = this.tit.title;
                console.log(this.word);
                localStorage.setItem('user', this.word);
                localStorage.setItem('username', this.word.trim());
                localStorage.setItem('token', response.json()['token']);

                if (this.massage == "Successfully Login As Not Deregulatedstate vendor") {
                    this._nav.navigate(['/dashboard/' + username]);
                    localStorage.setItem('change', username);
                    localStorage.setItem('username', this.word.trim());
                }
                else if (this.massage == "Successfully Login As Deregulatedstate vendor") {
                    this._nav.navigate(['/dashboards/' + username]);
                    localStorage.setItem('change', username);
                    localStorage.setItem('username', username);

                    localStorage.setItem('username', this.word);
                }
                let user = response.json().token;

                if (user) {
                    localStorage.setItem('currentUser', JSON.stringify(user));

                    // console.log ("junaid",localStorage.getItem('currentUser'))
                }
            });
    }


    login_authenticate(username: string, password: string) {
        return this._http5.post(Config.api + 'loginCompany/', {
            'username': username,
            'password': password,
            // 'title': title
        }).map((res: Response) => res.json())
    }

    activate(uid) {
        console.log(uid)
        let headers = new Headers();
        return this._http5.get(Config.api + 'activate/' + uid, { headers: headers }).map((response: Response) => response.json());

    }
    isactivated(username) {
        console.log(username)
        return this._http5.get(Config.api + 'isactivated/' + username).map((response: Response) => response.json());

    }
}