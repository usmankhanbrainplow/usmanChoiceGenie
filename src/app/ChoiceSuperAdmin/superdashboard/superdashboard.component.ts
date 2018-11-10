import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { Config } from "../../Config";
import { Subscription } from 'rxjs/Subscription';
import { CompanyService } from "../../company.service";
import { ErrorStateMatcher, MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material";

import { Pipe, PipeTransform } from "@angular/core";
// import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Headers, Http, Response } from '@angular/http';

import { HomeService } from "../../home/home.service";
import { PagerService } from '../../pager.service';
import { ResponseContentType } from '@angular/http/src/enums';
import { Console } from '@angular/core/src/console';
// import {Config} from "../Config";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { ActivatedRoute, Router } from '@angular/router';
import { SimpleGlobal } from 'ng2-simple-global';
// import { ValueUnwrapper } from '@angular/core/src/change_detection/change_detection_util';
//import { Http } from '@angular/http/src/http';
import { PageEvent } from '@angular/material';
// import { DeleteService } from './delete.service';
import { DataService } from '../../data.service';
// import { EditService } from './edit.service';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl, AbstractControl, FormGroupDirective, RadioControlValueAccessor } from '@angular/forms';

import swal from 'sweetalert2';
import { NgControl } from '@angular/forms';

import { SuperupdateService } from './superupdate.service';
import { DeletesuperdashboardService } from './deletesuperdashboard.service';


// import { SuperuserService } from './superuser.service';



declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare const $: any;

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }


}



@Component({
    selector: 'app-superdashboard',
    templateUrl: './superdashboard.component.html',
    styleUrls: ['./superdashboard.component.scss']
})
export class SuperdashboardComponent implements OnInit {
    constructor(private route: ActivatedRoute, private https: HttpClient,
        private fb: FormBuilder, private router: Router, private http: Http, private pagerService: PagerService,
        private sg: SimpleGlobal, private newService: DeletesuperdashboardService, private serve: SuperupdateService,  private dialog: MatDialog, private dataa: DataService) {

    }

    // pageSizeOptions;
    signupForm: FormGroup;
    private allItems: any[];
    pager: any = {};
    home: any = {};
    id: number;
    page: any[];

    // paged items
    pagedItems: any[];
    private sub: Subscription;
    private zip: any;
    prod_loaded = false;
    prods_loaded = false;
    localVar;
    public products: any;
    rating;
    closeResult: string;

    modal: any = [];
    editdata: any = [];
    result3: any = [];
    status: boolean = true;
    statuss:boolean= false;

    data;
    // public username;
    dataId = '';
    list = 'Hello';




    private Sub: Subscription;
    form;
    updataForm: FormGroup;
    ngOnInit() {
        // this.showresult();
        //  this.setPage(1);
        this.premiseIdData(1);
        this.signupForm = this.fb.group({

            'status': ['', Validators.compose([])]
        })
        // alert(this.premiseIdData(1))

    }
    btnDeleteClick(id) {
        this.dataId = id;
        console.log('id : ' + this.dataId);
    }
    deleteClick(id) {
        console.log('delete' + id);

        //Calling Delete Service
        this.newService.DeleteTodoList(id).subscribe(data => {
            console.log(data);
            this.premiseIdData(1);

        },
            error => {
            });
        //   window.location.reload();

    }

    catagoryId = "";
    zipcode = "";
    utilityarea = "";
    username = "";
    password = "";
    phone = "";
    state = "";
    email = "";
    country = "";
   // status="";



    btnEditClick(id, val9, val2, val3, val4, val5, val6, val7, val8, val1) {
        this.catagoryId = id;
        this.zipcode = val1;
        this.utilityarea = val2;
        this.username = val3;
        this.password = val4;
        this.phone = val5;
        this.state = val6;
        this.email = val7;
        this.country = val8;
        this.status = val9;
        

        console.log(val1, val2, val3, val4, val5, val6, val7, val8, val9)
        console.log('id : ' + this.catagoryId);
    }

    //Event Binding of PopUp Delete Modal
    // item.id,item.zipcode,item.utilityarea,item.title,item.Phone,item.state,item.country,item.status,item.user
    editClick(updatedrepname,updatedrepcertificateid,updatedcontactname,updatedcontactphone,updatedmarket,updatedstatus,updateduser,updatedcontact_email) {
        console.log('edit' + updatedrepname,updatedrepcertificateid,updatedcontactname,updatedcontactphone,updatedmarket,updatedstatus,updateduser,updatedcontact_email);
        console.log("TS OBJECT",updatedrepname,updatedrepcertificateid,updatedcontactname,updatedcontactphone,updatedmarket,updatedstatus,updateduser,updatedcontact_email);
        //Calling Delete Service
        this.serve.editTodoList(this.catagoryId,updatedrepname,updatedrepcertificateid,updatedcontactname,updatedcontactphone,updatedmarket,updatedstatus,updateduser,updatedcontact_email).subscribe(data => {
            console.log(data);
            swal({
                type: 'success',
                title: 'Updated Your Profile',
                showConfirmButton: false,
                timer: 1500

            })
            this.premiseIdData(1);


        }, error => {
        });
        //  window.location.reload();
     
    }
    updateeditClick(updatedrepname,updatedrepcertificateid,updatedcontactname,updatedcontactphone,updatedmarket,updatedstatus,updateduser,updatedcontact_email) {
        console.log('edit' + updatedrepname,updatedrepcertificateid,updatedcontactname,updatedcontactphone,updatedmarket,updatedstatus,updateduser,updatedcontact_email);
        console.log("TS OBJECT",updatedrepname,updatedrepcertificateid,updatedcontactname,updatedcontactphone,updatedmarket,updatedstatus,updateduser,updatedcontact_email);
        //Calling Delete Service
        alert("unapprove");
        this.serve.editTodoList(this.catagoryId,updatedrepname,updatedrepcertificateid,updatedcontactname,updatedcontactphone,updatedmarket,updatedstatus,updateduser,updatedcontact_email).subscribe(data => {
            console.log(data);
         
            swal({
                type: 'success',
                title: 'UnApproved  Profile',
                showConfirmButton: false,
                timer: 1500

            })
            this.premiseIdData(1);


        }, error => {
        });
        //  window.location.reload();
     
    }
    premiseIdData(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        //   this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
        this.http.get(Config.api + 'dashboard/' + '?page=' + page, { headers: headers }).subscribe(Res => {
            console.log(Res);
            this.pager = this.pagerService.getPager(Res.json()['Total Result'], page, 10);

            this.data = Res.json()['Results'];




        });
        // this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }


}
