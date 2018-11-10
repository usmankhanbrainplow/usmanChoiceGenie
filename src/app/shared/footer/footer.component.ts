import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { Config } from "../../Config";
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from "@angular/router";
import { ErrorStateMatcher, MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material";
import { NgForm, FormControl, Validators, FormGroupDirective } from "@angular/forms";
import { SimpleGlobal } from 'ng2-simple-global';
import * as _ from 'underscore';
import { Pipe, PipeTransform } from "@angular/core";
// import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Headers, Http, Response } from '@angular/http';

// import {Config} from "../Config";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import swal from 'sweetalert2';

@Component({
    selector: 'app-footer-cmp',
    templateUrl: 'footer.component.html'
})

export class FooterComponent {
    constructor( private route: ActivatedRoute,private http: Http,) { }

    test: Date = new Date();
    email;
    emailexist;
    subs;
    subscribe() {

      
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
        this.http.post(Config.api + 'subscribe/', JSON.stringify({

            "email": this.email
        }
        ), { headers: headers })

            .subscribe(data => {
                console.log(data)
                this.emailexist = data.json().message;
                console.log(data.json().message);
                if(this.emailexist=="Already Exists..!!!"){
                 swal({
                 text: "Already Exists..!!!",
                 title: "Choice Genie",
                 type: "error",
                 showConfirmButton: true,
                 //     confirmButtonColor: "#DD6B55",
                // timer: 1200,
                 confirmButtonText: "OK",
       
               })
              
            }
               else if(this.emailexist=="Successfully Subscribed...!!!"){
                swal({
                text: "SUCCESSFULLY SUBSCRIBED...!!!",
                title: "Choice Genie",
                type: "success",
                showConfirmButton: true,
                //     confirmButtonColor: "#DD6B55",
                timer: 1200,
                confirmButtonText: "OK",
      
              })
              this.email = null;
            }
              
              });
         
        
    }
}
