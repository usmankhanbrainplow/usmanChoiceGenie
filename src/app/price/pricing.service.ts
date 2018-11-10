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
        return this._http5.post("http://192.168.30.164:8000/paid_subscription/",
        JSON.stringify({            
            'user': username,  
            'pkg_type': pkgdetail.type,
            // console.log()
            // 'duaration': pkgdetail.dur     
        }),
        {headers: headers}).map((res: Response) => res.json())
   
}
package_free(username,pkgdetail)
{
    let headers = new Headers();
    headers.append('Authorization', 'JWT ' + localStorage.getItem('token'));
    console.log('pofile', localStorage.getItem('token'));
    // let headers = new Headers({'Authorization': 'JWT ' + this.currentUser.token});
    headers.append('Content-Type', 'application/json');
    // if(pkgdetail.type == 'F') {
    //     return this._http5.post("https://apis.rfpgurus.com/package/",
    //     JSON.stringify({            
    //         'username': username,  
    //         'pricepackage': pkgdetail.type,
    //         'duaration': pkgdetail.dur     
    //     }),
    //     {headers: headers}).map((res: Response) => res.json())
    // }
    // else{
        //this.username=(localStorage.getItem('username'));
        return this._http5.post(Config.api+"paid_subscription/",
        JSON.stringify({            
            'user': username,  
            'price': pkgdetail.price,
            'pkg_type': pkgdetail.type,
            'creditno': pkgdetail.credit ,
            'exp':pkgdetail.expdate,
            'ccv':pkgdetail.ccv  
            
            // 'username': username,  
            // 'pricepackage': pkgdetail.type,
            // 'duration': pkgdetail.dur,
            // 'creditno': pkgdetail.credit ,
            // 'exp':pkgdetail.expdate,
            // 'ccv':pkgdetail.ccv    
        }),
        {headers: headers}).map((res: Response) => res.json())
        
    

}
}