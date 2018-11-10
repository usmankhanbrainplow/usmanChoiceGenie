import { Component, OnInit } from '@angular/core';
import { Config } from "../../Config";
import { Subscription } from 'rxjs/Subscription';
import { CompanyService } from "../../company.service";
import { ErrorStateMatcher, MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material";

import { Pipe, PipeTransform } from "@angular/core";
// import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Headers, Http, Response } from '@angular/http';

import { HomeService } from "../../home/home.service";
import { PagerService } from '../../pager.service';
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
import { NgForm,FormBuilder, FormGroup, Validators, FormControl, AbstractControl,FormGroupDirective,RadioControlValueAccessor } from '@angular/forms';

import swal from 'sweetalert2';
import {NgControl} from '@angular/forms';
 
import { HttpService } from '../../serv/http-service';
 
 


declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
  selector: 'app-superipuser',
  templateUrl: './superipuser.component.html',
  styleUrls: ['./superipuser.component.scss']
})
export class SuperipuserComponent implements OnInit {

  constructor(private route: ActivatedRoute, private https: HttpClient,
    private fb: FormBuilder,  private router: Router, private http: Http, private pagerService: PagerService, private homeService: HomeService,
     private sg: SimpleGlobal, private obj: HomeService, private dialog: MatDialog, private dataa: DataService) {

     }

     data;
     
     
     
     
     ngOnInit() {
      this.premiseIdData();
    }
  
premiseIdData() {
  // if (page < 1 || page > this.pager.totalPages) {
  //     return;
  // }
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  //   this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
  this.http.get( Config.api + 'hits_with_comp_fields/' , { headers: headers }).subscribe(Res => {
      console.log(Res);
      //this.pager = this.pagerService.getPager(Res.json()['Total Result'], page, 10);

      this.data = Res.json()['Results']; 
       


  });

}

}
