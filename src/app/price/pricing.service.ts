import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Injectable} from '@angular/core';
import {Headers , Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpService } from './../serv/http-service';
import { Config } from '../Config';

@Injectable()
export class PricingService {
    currentUser;
    username;
    
constructor(private _http5: HttpService ) {
    this.currentUser=(localStorage.getItem('username'));
    
}

// loaded:boolean =false;
// login(username: string, password: string) {
//   const headers = new Headers();
//   headers.append('Content-Type', 'application/json');

//   return this._http5.post('https://apis.rfpgurus.com/user-token-auth/',
//     JSON.stringify({username: username, password: password }), {headers: headers})
//     .map((response: Response) => {
//       let user =  { username: username, token: response.json().token};

//       if (user && user.token) {
//         localStorage.setItem('currentUser', JSON.stringify(user));
//         console.log (localStorage.getItem('currentUser'))
//       }
//     });
// }


// login_authenticate(username){
//     return this._http5.post('https://apis.rfpgurus.com/ac_login/',{
//         'username':username
//     }).map((res: Response) => res.json() ) 
// }
// post_service(obj)
// {

// console.log('service');
// console.log(obj);

// return this._http5.post("https://apis.rfpgurus.com/register/",{
//     'obj':obj
// }).map((res: Response) => res.json());

// }
// activation_service(email){
//     console.log(email);
//     return this._http5.post("https://apis.rfpgurus.com/ac_code/",{
//         'email':email
//     }).map((res: Response) => res.json() ) 
// }

// authenticate_service(uid) {

//     let headers = new Headers();
//     headers.append('Content-Type', 'application/json');
//     return this._http5.get('https://apis.rfpgurus.com/activate/'+uid,
//     {headers: headers}).map((response: Response) => response.json());

// }
// forget_password(email){
   
//     return this._http5.post('https://apis.rfpgurus.com/forget_password/',{
//         'email':email
//     }).map((res: Response) => res.json() ) 
    
    
// }
// change_password(pass1,pass2,code){
//     return this._http5.post('https://apis.rfpgurus.com/change_password/',{
//         'pass1':pass1,
//         'pass2':pass2,
//         'code':code,
//     }).map((res: Response) => res.json() ) 
// }

Toatlpakkage_free(username,pkgdetail){
    let headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('token'));
    console.log('pofile', localStorage.getItem('token'));
    // let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
    headers.append('Content-Type', 'application/json');
   // if(pkgdetail.type == 'F') {
        return this._http5.post(Config.api+"payment/",
        JSON.stringify({            
            'user': username,  
            'package_type': pkgdetail.type,
            // console.log()
            // 'duaration': pkgdetail.dur     
        }),
        {headers: headers}).map((res: Response) => res.json())
   
}
package_free(pkgtype,pricepackage,cardname,cardnumber,expiry,ccv,card_type)
{
    let headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('token'));
    console.log('pofile', localStorage.getItem('token'));
    // let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
    headers.append('Content-Type', 'application/json');
     
        return this._http5.post(Config.api+"payment/",
        JSON.stringify({            
            // 'user': username,  
            // 'price': pkgdetail.price,
            // 'pkg_type': pkgdetail.type,
            // 'creditno': pkgdetail.credit ,
            // 'exp':pkgdetail.expdate,
            // 'ccv':pkgdetail.ccv  ,
            // "activeplan":true,
            // "is_subscribe":true

            // {
                "package_type":pkgtype,
                "amount":pricepackage,
                "cardname":cardname,
                "cardnumber":cardnumber,
                "expiry":expiry,
                "ccv":ccv,
                "card_type":card_type,
                "currency_code":"USD",
                "activeplan":true,
                "is_subscribe":true
            //     }

            


          
        }),
        {headers: headers}).map((res: Response) => res.json())
        
    

}
}