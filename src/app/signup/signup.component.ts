import { Component, Directive, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, NgControl, RadioControlValueAccessor } from '@angular/forms';
import { Config } from "../Config";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { SimpleGlobal } from 'ng2-simple-global';
import { Headers, Http, Response } from '@angular/http';
import { FormControl, FormGroup } from '@angular/forms';
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';
import { ActivatedRoute,Router } from '@angular/router';
// import swal from 'sweetalert2';  

@Component({
    selector: 'app-signup',
    templateUrl: 'signup.component.html'
})

export class SignupComponent implements OnInit {
    zip_code;
    next;
    questions;
    premiseID;
    product_id;
    isLinear = true;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    thirdFormGroup: FormGroup;
    fourthFormGroup: FormGroup;
    fifthFormGroup: FormGroup;

    normalPattern = '[a-zA-Z0-9_.-]+?';
    digitsOnly = '^[0-9,-]+$';
    email = '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$';

    flag = true;
    date = new FormControl(new Date());

    billingAddress = [
        {
            staddress: '17250 Knoll Trail Dr Apt 1401',
            city: 'Dallas',
            state: 'Texas',
            zip_code: '752481155'
        }
    ];

    aprtName; staddress; city; state; zip;
    signupAddress = 1;

    sQuestion = [
        { value: 'Security Question 1' },
        { value: 'Security Question 2' },
        { value: 'Security Question 3' },
        { value: 'Security Question 4' },
        { value: 'Security Question 5' }
    ];

    constructor(public router: Router,private _formBuilder: FormBuilder, private http: HttpClient, private route: ActivatedRoute) {
       
    }
    model = {};
    serviceType;
    signup;
    firstname;
    middle_name;
    dob;
    last_name;
    //serviceType;
    serviceTypeDate;
    auth_rep;
    productID;
    billing_address;
    address;
    appartment;
    zipcode;
    // Second_Address;
    social_security_number;
    driver_license;
    license_state;
    licence_expired_date;
    security_question;
    sequrity_answer;
    life_support;
    automatic_bill_pay;
    credit_verification;


    ngOnInit() {

        this.qu();
        this.billingAddress =  JSON.parse(localStorage.getItem("signupDetails"));
        this.firstFormGroup = this._formBuilder.group({
            serviceType: ['', Validators.compose([Validators.required])],
        });

        this.secondFormGroup = this._formBuilder.group({
            fName: ['', Validators.compose([Validators.required, Validators.pattern(this.normalPattern)])],
            mName: ['', Validators.compose([Validators.pattern(this.normalPattern)])],
            lName: ['', Validators.compose([Validators.required, Validators.pattern(this.normalPattern)])],
            authRepresent: ['', Validators.compose([Validators.pattern(this.normalPattern)])],
            dateofbirth: ['', Validators.compose([Validators.required])],

            aprtName: ['', Validators.compose([Validators.pattern(this.normalPattern)])],
            staddress: [this.billingAddress[0].staddress, Validators.compose([Validators.required])],
            city: [this.billingAddress[0].city, Validators.compose([Validators.required, Validators.pattern(this.normalPattern)])],
            state: [this.billingAddress[0].state, Validators.compose([Validators.required, Validators.pattern(this.normalPattern)])],
            zip: [this.billingAddress[0].zip_code, Validators.compose([Validators.required, Validators.pattern(this.digitsOnly)])],
        });

        this.thirdFormGroup = this._formBuilder.group({
            SSN: ['', Validators.compose([Validators.required, Validators.pattern(this.digitsOnly)])],
            driverLisence: ['', Validators.compose([Validators.pattern(this.digitsOnly)])],
            lisenceState: ['', Validators.compose([Validators.pattern(this.normalPattern)])],
            security_answer: ['', Validators.compose([Validators.pattern(this.normalPattern)])],
            


        });

        this.fourthFormGroup = this._formBuilder.group({

        });

        this.fifthFormGroup = this._formBuilder.group({
            choosingLLC: ['', Validators.compose([Validators.required])],
            authPerson: ['', Validators.compose([Validators.required])],
            readDocs: ['', Validators.compose([Validators.required])],
        });

    }
    sweetalertsignup() {
        // swal({
        //     text: "Signup Successflluy!",
        //     title: "Choice Genie",
        //     type: "success",
        //     showConfirmButton: false,
        //     //     confirmButtonColor: "#DD6B55",
        //     timer: 1200,
        //     confirmButtonText: "OK",

        // })
        //     this.router.navigate(['/pages/login'])
        // {

        //     // swal("Login Successflluy!", "Choice Genie", "success", ).then(function () {
        //     //     this.router.navigate(['/home'])
        //     // });


        //     // this.router.navigate(['/home'])  

        // };
    }
    check() {
        console.log(this.model)
    }
   
    signupdata() {
        // alert(this.premiseID.toString().length)//
        // alert('hello');
        // if(this.premiseID&&this.premiseID.toString().length===17) {//
        let headers = new HttpHeaders();
        // let premiseAddress = JSON.parse(localStorage.getItem("signupDetails"))[0];//
        
        // console.clear();//
        // if (this.signupAddress) {//
        //     this.model['billing_address'] = 'same'//
        // }
        console.log(this.model);
        this.model['licence_expired_date'] = Date.now();
        for (let val in this.billingAddress[0]) {
            this.model[val] = this.billingAddress[0][val];

        }

        this.model['premiseID'] = this.billingAddress[0]["ESID"];
        this.model['productID'] = this.route.snapshot.params['id'];
        this.model['billing_address'] = 'same';
        this.model['zipcode'] =  this.model['zip_code']
        this.model['auth_rep'] = "";
        this.model['life_support'] = "";
        this.model['automatic_bill_pay'] = "";
        this.model['credit_verification'] = "";
        headers.append('Content-Type', 'application/json');
        // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),//
        this.http.post(Config.api + 'signup/',
            this.model,
            // {//
            //     "first_name": this.firstname, "middle_name": this.middle_name,//
            //     "last_name": this.last_name, "dob": this.dob, "serviceType": this.serviceType,//
            //     "serviceTypeDate": this.serviceTypeDate, "auth_rep": this.auth_rep,//
            //      "premiseID": this.premiseID,//
            //      "productID": this.productID,//
            //      "billing_address": this.billing_address, "state": this.state,//
            //       "city": this.city, "address": this.address, "appartment": this.appartment, //
            //       "zipcode": this.zipcode, "social_security_number": this.social_security_number, //
            //       "driver_license": this.driver_license, "license_state": this.license_state,//
            //        "licence_expired_date": Date.now(),//
            //         "security_question": this.security_question, //
            //         "sequrity_answer": this.sequrity_answer, "life_support": this.life_support,//
            //          "automatic_bill_pay": this.automatic_bill_pay,//
            //           "credit_verification": this.credit_verification//

            // },//
            { headers: headers })

            // this.http.post(Config.api + 'signup/'+this.premiseID+'',{headers: headers})//
            // this.http.post(Config.api + 'signup/'+ this.zip_code +'', {"premiseid": this.premiseID +'', {headers: headers})//
            .subscribe(Res => {
                console.log(Res);
                this.next = Res[0].next;
                localStorage.setItem("signupDetails", JSON.stringify(Res));
                localStorage.setItem("signedupcompanyid", this.product_id);
                //    this.state = Res[0].state;//
                // this.sg['products'] = Res.json()['Results'];//
                // this.data.changeProducts(this.sg['products']);//

            });
        //}//
    }

    ifChecked(e) {
        if (e.target.checked) {
            console.log('checked');
            this.signupAddress = 0;
        } else {
            console.log('un-checked');
            this.signupAddress = 1;
        }
    }
    qu() {
        // alert(this.premiseID.toString().length)
        //  alert('hello');
        // if(this.premiseID&&this.premiseID.toString().length===17) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
        this.http.get(Config.api + 'question/', { headers: headers })

            //  this.http.get(Config.api + 'signup/'+ this.zip_code +'', {headers: headers})
            .subscribe(Res => {
                console.log(Res);
                //  this.sQuestion = Res[0].sQuestion;
                // this.state = Res[0].state;
                this.questions = Res;

                // this.data.changeProducts(this.sg['products']);

            });
    }

    onSubmit(f) {

    }
}