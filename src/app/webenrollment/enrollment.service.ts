import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { environment } from '../../environments/environment'


@Injectable()
export class EnrollmentService {
    private date = new BehaviorSubject<object>(null)
    currentDate = this.date.asObservable()
    constructor(private http: HttpClient) { }
    ip2 = "https://webenrollapi.smartixai.com/"
    // url2 = ''
    myHeaders: any = new HttpHeaders().set('content-type', 'application/json')
    // Enrollment API - Enrollment Form
    enrollUser(data) {
        return this.http.post(environment.webenrollurl + 'main/enrollProduct/', data, { headers: this.myHeaders, withCredentials: true })
    }
    // submit zip-city-address
    // enrollProcess(data) {
    //     return this.http.get('http://192.168.29.183:8000/products/get-premise-by-zip-address-city/zip-code' + data)
    // }
    enrollProcess(data) {
        return this.http.post(environment.webenrollurl + 'enroll/get-premise-By-zip-service-city/', data, { headers: this.myHeaders, withCredentials: true })
    }
    // submit esid
    // enrollByEsid(data) {
    //     return this.http.get(url + 'products/get-premise-by-esid/es-id' + data + '/')
    // }
    // requested date
    requestDate(data) {
        return this.http.post(environment.backendurl + 'products/get-next-enroll-date-from-isigma/', data)
    }
    requestforDate(obj) {
        return this.http.post(environment.webenrollurl + 'main/next-enroll-date/', obj)
    }
    sendPremiseDataForSession(obj) {
        return this.http.post(environment.webenrollurl + 'enroll/set-premise-session-api/', obj, { headers: this.myHeaders, withCredentials: true })
    }
    sendProductDataForSession(obj) {
        return this.http.post(environment.webenrollurl + 'enroll/set-product-session-api/', obj, { headers: this.myHeaders, withCredentials: true })
    }
    savedateDetail(obj) {
        this.date.next(obj)
    }
    searchPlan(para) {
        return this.http.post(environment.webenrollurl + 'enroll/products-with-zipcode/', para, { headers: this.myHeaders, withCredentials: true })
    }
    searchPlanByTdsp(tdsp) {
        return this.http.post(environment.webenrollurl + 'enroll/multiple-duns-on-zip/', tdsp, { headers: this.myHeaders, withCredentials: true })
    }
    // testing(obj) {
    //     return this.http2.post(environment.webenrollurl + 'main/testing/', obj, { withCredentials: true })
    // }
    // Service ofr Date
    Date(datee) {
        if (datee != null && datee != undefined && datee != "") {
            let date = new Date(datee)
            return (String((date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear()))
        } else return ''
    }
    Date1(datee) {
        if (datee != null && datee != undefined && datee != "") {
            let date = new Date(datee)
            return (String(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()))
        } else return ''
    }
    private datas = new BehaviorSubject<any>(null);
    data = this.datas.asObservable();
    changeData(dataa: any) {
        this.datas.next(dataa);
    }
    private datass = new BehaviorSubject<any>(null);
    dataa = this.datass.asObservable();
    changeDataa(dataa: any) {
        this.datass.next(dataa);
    }
    private datass1 = new BehaviorSubject<any>(null);
    dataa1 = this.datass1.asObservable();
    changeDataa1(dataa1: any) {
        this.datass1.next(dataa1);
    }
}