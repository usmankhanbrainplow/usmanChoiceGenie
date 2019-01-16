import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../environments/environment'

@Injectable()
export class EnrollmentService {
    private date = new BehaviorSubject<object>(null)
    currentDate = this.date.asObservable()
    constructor(private http: HttpClient) { }
    ip2 = "https://webenrollapi.smartixai.com/"
    myHeaders: any = new HttpHeaders().set('content-type', 'application/json')
    enrollUser(data) {
        return this.http.post(environment.webenrollurl + 'main/enrollProduct/', data, { headers: this.myHeaders, withCredentials: true })
    }
    enrollProcess(data) {
        return this.http.post(environment.webenrollurl + 'enroll/get-premise-By-zip-service-city/', data, { headers: this.myHeaders, withCredentials: true })
    }
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
    nextSessionStep(data) {
        return this.http.post(environment.webenrollurl + 'enroll/set-step-session/', data, { headers: this.myHeaders, withCredentials: true })
    }
    uaCheck() {
        return this.http.get(environment.url + 'enroll/product-enrollment-check/', { headers: this.myHeaders })
    }
    dccSubmit(data) {
        return this.http.post(environment.webenrollurl + 'pr/deposit-submission/', data, { headers: this.myHeaders, withCredentials: true })
    }
    dccFinalSubmit(data) {
        return this.http.post(environment.webenrollurl + 'pr/product-enrollment-submission/', data, { headers: this.myHeaders, withCredentials: true })
    }
    creditCheck(data) {
        return this.http.post(environment.webenrollurl + 'pr/pr-credit-check/', data, { headers: this.myHeaders, withCredentials: true })
    }
    Date(datee) {
        if (datee != null && datee != undefined && datee != "") {
            let date = new Date(datee)
            return (String((date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear()))
        } else return null
    }
    Date1(datee) {
        if (datee != null && datee != undefined && datee != "") {
            let date = new Date(datee)
            return (String(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()))
        } else return null
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