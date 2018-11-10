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
import { DeletegetuserService } from './deletegetuser.service';
import { UpdategetuserService } from './updategetuser.service';
import { HttpService } from '../../serv/http-service';
 
 


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
  selector: 'app-supergetusers',
  templateUrl: './supergetusers.component.html',
  styleUrls: ['./supergetusers.component.scss']
})
export class SupergetusersComponent implements OnInit {

    constructor(private route: ActivatedRoute, private https: HttpClient,
    private fb: FormBuilder,  private router: Router, private http: Http, private pagerService: PagerService, private homeService: HomeService,
     private sg: SimpleGlobal, private obj: HomeService, private dialog: MatDialog, private dataa: DataService, private serve: UpdategetuserService,  private newService: DeletegetuserService) {

}
pageSizeOptions;
signupForm: FormGroup;
private allItems: any[];
pager: any = {};
home: any = {};
id: number;
page: any[];
queryString;

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
 
modal:any=[];
editdata: any = [];
result3:any=[];

data;
public username;
dataId = '';
list = 'Hello';
status: boolean = true;




 ngOnInit() {
   // this.showresult();

   this.premiseIdData(1);
   this.signupForm = this.fb.group({

    'status': ['', Validators.compose([])]
})
   //alert(  this.premiseIdData())

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
name;
email;
partername;
desc;
activepartner;

btnEditClick(id, val1, val2, val3, val4, val5) {
  //alert('data  '+id);

  this.catagoryId = id;
  this.name = val1;
  this.email = val2;
  this.partername = val3;
  this.desc = val4;
  this.activepartner = val5;
 


  console.log(val1, val2, val3, val4, val5 )
  console.log('id : ' + this.catagoryId);
}

//Event Binding of PopUp Delete Modal
// item.id,item.zipcode,item.utilityarea,item.title,item.Phone,item.state,item.country,item.status,item.user
editClick( updatedname,updatedemail,updatedpartnername,updateddesc,updatedactivepartner) {
  console.log('edit' + updatedname,updatedemail,updatedpartnername,updateddesc,updatedactivepartner);
  console.log("TS OBJECT",updatedname,updatedemail,updatedpartnername,updateddesc,updatedactivepartner);
  //Calling Delete Service
  //alert('no data  '+this.catagoryId);
  
  this.serve.editTodoList(this.catagoryId,updatedname,updatedemail,updatedpartnername,updateddesc,updatedactivepartner).subscribe(data => {
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
//http://192.168.30.52:9000/choice/partnerfilter/

premiseIdData(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //   this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
    this.http.get( Config.api + 'all_users_list/' + '?page=' + page, { headers: headers }).subscribe(Res => {
        console.log(Res);
        this.pager = this.pagerService.getPager(Res.json()['Total Result'], page, 10);
  
        this.data = Res.json()['Results']; 
         
  
  
    });
    // this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  // activepartner(page: number) {
  //   if (page < 1 || page > this.pager.totalPages) {
  //       return;
  //   }
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   //   this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
  //   this.http.get( 'http://192.168.30.193:9000/choice/inactivepartner/' + '?page=' + page, { headers: headers }).subscribe(Res => {
  //       console.log(Res);
  //       this.pager = this.pagerService.getPager(Res['Results'], page, 10);
  
  //       this.data = Res.json()['Results']; 
         
  
  
  //   });
  //   // this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  // }
}


