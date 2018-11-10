import { Injectable } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map'
import {Config} from "../Config";
@Injectable()
export class UnsubscribeService {

  constructor(private http: Http) { }
  unsub(uid) {
    console.log(uid)
    let headers = new Headers();
    return this.http.delete(Config.api + 'unsubscribe/' + uid, { headers: headers }).map((response: Response) => response.json());
}
getunsub(uid) {
  console.log(uid)
  let headers = new Headers();
  return this.http.get(Config.api + 'unsubscribe/' + uid, { headers: headers }).map((response: Response) => response.json());
}
}
