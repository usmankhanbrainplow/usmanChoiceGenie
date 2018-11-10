import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { Config } from "../../Config";
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from "@angular/router";
import { HomeService } from "../../home/home.service";
import { ErrorStateMatcher, MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material";
import { NgForm, FormControl, Validators, FormGroupDirective } from "@angular/forms";
import { SimpleGlobal } from 'ng2-simple-global';
import { DataService } from '../../data.service';
import * as _ from 'underscore';
import { PagerService } from '../../pager.service';
import { Pipe, PipeTransform } from "@angular/core";
// import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Headers, Http, Response } from '@angular/http';

// import {Config} from "../Config";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { jsonpCallbackContext } from '@angular/common/http/src/module';
// import { ValueUnwrapper } from '@angular/core/src/change_detection/change_detection_util';
//import { Http } from '@angular/http/src/http';
import { PageEvent } from '@angular/material';
// import { SSL_OP_NO_TICKET } from 'constants';
import { EditreviewService } from './editreview.service';
import { DeletereviewService } from './deletereview.service';

import swal from 'sweetalert2'; 
@Component({
  selector: 'app-superreviews',
  templateUrl: './superreviews.component.html',
  styleUrls: ['./superreviews.component.scss']
})
export class SuperreviewsComponent implements OnInit {
  private allItems: any[];
  pager: any = {};
  home: any = {};
  pagedItems;
  page: any[];
  rev:any=[];
  id;
  private Sub: Subscription;
    constructor( private pagerService: PagerService,private route: ActivatedRoute,private http: Http,private newService: DeletereviewService,private serve:EditreviewService) { }
  ngOnInit() {
    this.getreview(1)
  }
  getreview(page:number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
  }
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.get(Config.api +'getallreviewssuperdashboard/'+'?page=' + page, { headers: headers })
    .subscribe(Res => {
    this.rev=Res.json()['Results'];
    console.log(this.rev)
// this.rate=this.rev['rate'];
//     console.log(this.rate);
//this.pager = this.pagerService.getPager(Res['Results'],Res['Total Pages']);
this.pager = this.pagerService.getPager(Res.json()['Total Result'], page, 10);
    });
    
    }
    dataId = '';
    btnDeleteClick(id) {
      this.dataId = id;
      console.log('id : ' + this.dataId);
  }

  //Event Binding of PopUp Delete Modal

  deleteClick(dataId) {
      console.log('delete' + this.dataId);

      //Calling Delete Service
      this.newService.Delete(this.dataId).subscribe(data => {
          console.log(data);
          swal({
              type: 'success',
              title: 'Successfully deleted',
              showConfirmButton: false,
              timer: 1500
            })
       
              this. getreview(1)

             
      }, error => {
      });
   //   window.location.reload();

  }
  comt = '';
  btncomtClick(id) {
    this.comt = id;
    console.log('id : ' + this.comt);
}

//Event Binding of PopUp Delete Modal


 
  catagoryId:'';
  rate:"";
  productid: "";
  zipcode: "";
  comment: "";
  username: "";
  reviewactive:'';
  user:'';
  
  btnactiveClick(id,rate,proid,zip,comt,user,status,User) {
    this.catagoryId=id
  this.rate=rate;
     this.productid=proid;
     this.zipcode=zip;
     this.comment=comt;
     this.username=user;
     this.reviewactive=status;
   this.user=User;
    console.log(id,rate,proid,zip,comt,user,status,User)
    console.log('id : ' + this.catagoryId );
}

//Event Binding of PopUp Delete Modal
data;
activeClick(uprate,upproid,upstatus,upzip,upcomt,upuser,updateduser) {
    console.log('edit' +uprate,upproid,upstatus,upzip,upcomt,upuser,updateduser);
console.log("TS OBJECT",uprate,upproid,upstatus,upzip,upcomt,upuser,updateduser);
    //Calling Delete Service
    this.serve.editTodoList( this.catagoryId,uprate,upproid,true,upzip,upcomt,upuser,updateduser).subscribe(data => {
        console.log(data);
        this.data=data['res'];
        console.log(this.data,'rewiwwwwww');
        swal({
            type: 'success',
            title: 'Successfully updated',
            showConfirmButton: false,
            timer: 1500
          })
         
          this.getreview(1)
    }, error => {
    });
  //  window.location.reload();

}
}
