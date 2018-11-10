import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { Config } from "../Config";
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from "@angular/router";
import { HomeService } from "../home/home.service";
import { ErrorStateMatcher, MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material";
import { NgForm, FormControl, Validators, FormGroupDirective } from "@angular/forms";
import { SimpleGlobal } from 'ng2-simple-global';
import { DataService } from '../data.service';
import * as _ from 'underscore';
import { PagerService } from '../pager.service';
import { Pipe, PipeTransform } from "@angular/core";
import { Headers, Http, Response } from '@angular/http';
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { NeutronRatingModule } from 'neutron-star-rating';
import { PageEvent } from '@angular/material';
import { HttpService } from '../serv/http-service';
import swal from 'sweetalert2';
@Component({
    selector: 'app-getreview',
    templateUrl: './getreview.component.html',
    styleUrls: ['./getreview.component.scss']
})
export class GetreviewComponent implements OnInit {
    rev: any = [];
    id;
    sort;
    data: any = [];
    user;
    hit: any = [];
    rate: any = [];
    total: any = [];
    pro = null;
    plan: any = [];
    deproduct = null;
    public customer;
    public zip_code;
    public title;
    private Sub: Subscription;
    totalrev: any = [];
    ratee = '';
    avrage: any = [];
    score: any = [];
    ave: any = [];
    constructor(private router: Router, private route: ActivatedRoute, private http: Http, private https: HttpService) { }

    ngOnInit() {
        this.title = localStorage.getItem('company');
        this.customer = localStorage.getItem('username')
        this.zip_code = localStorage.getItem('zip');
        this.getreview()
        this.totalreview()
        this.avereview()
        this.route.params.subscribe(params => {

            this.product(params['id'])
            this.deregulatedproduct(params['id'])
            this.hitcount(params['id'])
        });

        this.Sub = this.route.params.subscribe(params => {
            this.id = +params['id'];

        });
    }
    checked_login() {
        if (localStorage.getItem('username')) {
            let local = localStorage.getItem('username');
            return true;
        }
        else {
            return false;
        }
    }

    sortby(sort) {
        console.log(sort)
        if (sort == "newest") {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json')
            this.http.get(Config.api + 'reviewsnewest/' + this.title, { headers: headers })

                .subscribe(Res => {
                    console.log(Res);
                    this.rev = Res.json();
                    console.log(this.rev)
                });
        }
        else if (sort == "oldest") {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json')
            this.http.get(Config.api + 'reviewsoldest/' + this.title, { headers: headers })

                .subscribe(Res => {
                    console.log(Res);
                    this.rev = Res.json();
                    console.log(this.rev)
                });
        }
    }
    hitcount(id) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json')
        this.http.get(Config.api + 'counthitsperproduct/' + id, { headers: headers })

            .subscribe(Res => {
                console.log(Res);
                this.hit = Res.json()['Result'][0].hits;
                console.log(this.hit)
            });
    }
    profile() {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.get(Config.api + 'users_profile/' + this.customer + '/', { headers: headers })

            .subscribe(Res => {
                this.data = Res.json();
                console.log(this.data);
                this.user = this.customer;
                
                // this.user = this.data['user']
            });

    }

    getreview() {
        this.title = localStorage.getItem('company');
        console.log(localStorage.getItem('company'))
        console.log(this.title, 'jjjjjjjjj')
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.https.get(Config.api + 'getallreviews/' + this.title, { headers: headers })
            .subscribe(Res => {
                this.rev = Res.json()['Results'];
                this.total = Res.json()['Total Result'];
                console.log(this.total)
                console.log(this.rev)


            });

    }

    product(id) {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.https.get(Config.api + 'dataup/' + id, { headers: headers })
            .subscribe(Res => {
                this.pro = Res.json();
                console.log(this.pro)
                this.plan = this.pro.plan_information.split(',,', 3000);
                console.log(this.plan)

            });

    }
    deregulatedproduct(id) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.get(Config.api + 'deregulated_edit_product/' + id, { headers: headers })
            .subscribe(Res => {
                this.deproduct = Res.json();
                console.log(this.pro)
                console.log(this.plan)

            });

    }

    totalreview() {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.https.get(Config.api + 'totalreviews/' + this.title, { headers: headers })

            .subscribe(Res => {
                this.totalrev = Res.json()['Total Reviews'];

                console.log(this.totalrev);

            });

    }
    avereview() {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.get(Config.api + 'reviewsperproduct/' + this.title, { headers: headers })

            .subscribe(Res => {
                this.avrage = Res.json();
                console.log(this.avrage);
                this.score = this.avrage['Product Score'];
                console.log(this.score)
                this.ave = this.avrage['Avg Reviews Per Product']
            });

    }

    get(rating) {
        this.ratee = rating;
    }
    reviews(ratee, comt, id) {
        if (localStorage.getItem('username')) {
            console.log(id)
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            this.http.post(Config.api + 'reviews/' + this.zip_code + '/' + this.user, JSON.stringify({

                "zipcode": this.zip_code,
                "productid": id,
                "user": this.user,
                "rate": this.ratee,
                "comment": comt
            }

            ), { headers: headers })
                .subscribe(Res => {
                    console.log(Res)
                    swal({
                        type: 'success',
                        title: 'Rewiew Added Successfully',
                        showConfirmButton: false,
                        timer: 1500

                    })

                })

        }
        else {
            swal(
                'Invalid',
                'User must login First!',
                'error'
            )
            this.router.navigate(['/userlogin/']);
        }
    }
}
