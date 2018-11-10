import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Injectable} from '@angular/core';
import {Http ,Headers , Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpService } from './../serv/http-service';
import { Config } from '../Config';

@Injectable()
export class HistorypurchaseService {
    currentUser;

    constructor(private _http5: HttpService ,private _http: Http ) {
        this.currentUser=(localStorage.getItem('username'));
        console.log(this.currentUser)
    }
    purchaseHistory() {
      let headers = new Headers();
      headers.append('Authorization', 'JWT ' + localStorage.getItem('token'));
      console.log('pofile', localStorage.getItem('token'));
      // let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
      headers.append('Content-Type', 'application/json');


        return this._http5.get(Config.api+'user_history/'+this.currentUser,
            {headers: headers}).map((response: Response) => response.json());

    }


    expirePackage(expDate){
        let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
        headers.append('Content-Type', 'application/json');
        return this._http5.post("https://apis.rfpgurus.com/payment/history/"+this.currentUser.username+"/",
            JSON.stringify({
                'pkgdate': expDate,

            }),
            {headers: headers}).map((res: Response) => res.json())
    }


    packageUpdate(pkgdetail)
    {

        let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
        headers.append('Content-Type', 'application/json');
        return this._http5.put("https://apis.rfpgurus.com/payment/history/"+this.currentUser.username+"/",
            JSON.stringify({
                'pricepackage': pkgdetail.type,
                'duration': pkgdetail.dur,
                'creditno': pkgdetail.credit ,
                'exp':pkgdetail.expdate,
                'ccv':pkgdetail.ccv
            }),
            {headers: headers}).map((res: Response) => res.json())

    }

}
