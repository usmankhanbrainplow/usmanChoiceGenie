// import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ResidentialDialog2Component} from "./residential-dialog2/residential-dialog2.component";
import { ErrorStateMatcher } from '@angular/material/core';
// import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

// import { Subscription } from 'rxjs/Subscription';
// import { Http, Response, Headers } from '@angular/http';
import { applyRedirects } from "@angular/router/src/apply_redirects";
// import { Router } from "@angular/router";
// import { Config } from "../Config";
// import { ActivatedRoute, RouterModule } from "@angular/router";
// import { SimpleGlobal } from 'ng2-simple-global';
// import { DataService } from '../data.service';
import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { Config } from "../Config";
import { Subscription } from 'rxjs/Subscription';
import { HomeService } from "../home/home.service";
// import { ErrorStateMatcher, MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material";
import { NgForm, FormControl, Validators, FormGroupDirective } from "@angular/forms";
import { SimpleGlobal } from 'ng2-simple-global';
import { DataService } from '../data.service';
import * as _ from 'underscore';
import { PagerService } from '../pager.service';
import { Pipe, PipeTransform } from "@angular/core";
// import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Headers, Http, Response } from '@angular/http';
import { ActivatedRoute, Router, RouterModule } from "@angular/router";

// import {Config} from "../Config";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { jsonpCallbackContext } from '@angular/common/http/src/module';
// import { ValueUnwrapper } from '@angular/core/src/change_detection/change_detection_util';
//import { Http } from '@angular/http/src/http';
import { PageEvent } from '@angular/material';
// import { SSL_OP_NO_TICKET } from 'constants';

import swal from 'sweetalert2';
import { error } from 'util';
// import { ICarouselConfig, AnimationConfig } from 'angular4-carousel';
/**
 * @title Dialog Overview
 */
export class errorMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}
@Component({
    selector: 'dialog-overview-example',
    templateUrl: 'residential.component.html'
})

export class DialogOverviewExample {

    name: string;
  

    constructor(public dialog: MatDialog, private router: Router,private route: ActivatedRoute, private sg: SimpleGlobal, private data: DataService, private Http: Http) {}
//  constructor(private obj: HomeService, private router: Router, private route: ActivatedRoute, private sg: SimpleGlobal, private data: DataService, private Http: Http) {
      
//}

    openDialog(): void {
        let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
            // width: '300px',
            //data: { name: this.name, animal: this.animal }
           
            
        });

        dialogRef.afterClosed().subscribe(result => {
            //console.log('The dialog was closed');
            //this.animal = result;
        });
    }
  
    openDialog2(): void {
        let dialogRef = this.dialog.open(ResidentialDialog2Component, {
           //width: '400px',
            //data: { name: this.name, animal: this.animal }
        });

        dialogRef.afterClosed().subscribe(result => {
            //console.log('The dialog was closed');
            //this.animal = result;
        });
    }

}

@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'residential-dialog.html',
})

export class DialogOverviewExampleDialog {
    zipCode = '';
    state;
    zipcodeexist;
    constructor(private http: Http,private router: Router,
        public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    // onNoClick(): void {
    //     this.dialogRef.close();
    // }
    Checkzipcode() {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.get(Config.api + 'zipcodecheck/' + this.zipCode, { headers: headers })
            .subscribe(data => {
                console.log(data);
                this.state = data.json()['state'];
                console.log(this.state);
                localStorage.setItem('state', this.state);
                this.zipcodeexist = data.json()['message']
                if (this.zipcodeexist == "InValid Zipcode") {
                    swal({
                      text: "InValid Zipcode",
                      title: "Choice Genie",
                      type: "error",
                      showConfirmButton: false,
                      timer: 1200,
                      confirmButtonText: "OK",
          
                    })
                    this.dialogRef.close();
                  }
                  else if (this.state == "deregulatedstate") {
                    this.dialogRef.close();
                    this.router.navigate(['/product/' + this.zipCode]);
                    localStorage.setItem('zip', this.zipCode)
                    
                  }
                  else if(this.state == "notderegulatedstate"){
                    this.dialogRef.close();
                    this.router.navigate(['/products/' + this.zipCode]);
                    localStorage.setItem('zip', this.zipCode);
                   
                  }
         
            });
        }
    onSubmit() {
        this.router.navigate(['/products/' + this.zipCode]);
        localStorage.setItem('zip', this.zipCode);
        this.dialogRef.close();
    }
        digitsOnly = '^[0-9,-]+$';
        //  public model: any = {};
       
    
        zip_code = new FormControl('', [
            Validators.pattern(this.digitsOnly)
        ]);
}
