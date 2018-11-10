import { Component, OnInit } from '@angular/core';
// import {FormControl, Validators} from '@angular/forms';
import { NgForm } from '@angular/forms';
// import {ContactUsService} from "./contact-us.service";
import { AgmCoreModule } from '@agm/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'

import { Config } from "../Config";
import { ActivatedRoute, Router } from "@angular/router";
import { SimpleGlobal } from 'ng2-simple-global';
import { ResponseContentType } from '@angular/http/src/enums';
import { FormBuilder, Validators, NgControl, RadioControlValueAccessor, FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import swal from 'sweetalert2';
import { MatSelect, MatDialog } from '@angular/material';
import { UpdateService } from './update.service';
import { DataService } from '../data.service';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  private authentication = localStorage.getItem('token');
  public username;
  state: any = [];
  city;
  confirmpassword;
  signupForm: FormGroup;
  private next: any;
  model: any = {};
  normalPattern = '[a-zA-Z0-9_.-]+?';
  digitsOnly = '^[0-9,-]+$';
  email = '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$';
  flag = true;
  status: boolean = true;
  date = new FormControl(new Date());
  emailexist: boolean = true;
  hide = true;
  data: any = [];

  profile: any = [];
  personal: any = [];
  local;
  uname;
  usernameexist;

  constructor(private https: Http, public router: Router, private fb: FormBuilder, private http: HttpClient,
    private route: ActivatedRoute, private sg: SimpleGlobal,
    private serve: UpdateService, private dialog: MatDialog, private dataa: DataService) {
    this.authentication = localStorage.getItem('token');


    //   if (localStorage.getItem('username')) {
    //     this.local = localStorage.getItem('username');
    //   // let pars = JSON.parse(this.local) ;
    //    this.uname = name
    //   this._serv.get_profile(this.uname).subscribe(
    //     data => {
    //       console.log(data);
    //       console.log(data.user)
    //       this.personal = data;
    //       this.profile = data.user;
    //           },
    //     error =>{
    //       // console.log(error);
    //     });
    //   }
    // }
  }


  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.fetchzip();
    this.signupForm = this.fb.group({
      'name': ['', Validators.compose([Validators.required])],
      'phone_no': ['', Validators.compose([Validators.required, Validators.pattern(this.digitsOnly)])],
      'service_address': ['', Validators.compose([Validators.required])],
      'service_state': ['', Validators.compose([Validators.required])],
      'service_city': ['', Validators.compose([Validators.required])],
      'service_zip': ['', Validators.compose([Validators.required])],
      'billing_address ': ['', Validators.compose([Validators.required])],
      'billing_city ': ['', Validators.compose([Validators.required])],
      'billing_state': ['', Validators.compose([Validators.required])],
      'billing_zip ': ['', Validators.compose([Validators.required])],
    },
      {
        //validator: PasswordValidation.MatchPassword // your validation method
      });
  }
  catagoryId = "";
  zipcode = "";
  utilityarea = "";
  // username = "";
  password = "";
  phone = "";
  // state = "";
  // email = "";
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
  editClick(updateid, updatename, updatecontact, updateserviceaddress, updateservicestate, updateservicecity, updateservicezipcode,
    updateauthenticationcode, updateacountactive, updateuserid) {
    console.log('edit' + updateid, updatename, updatecontact, updateserviceaddress, updateservicestate, updateservicecity, updateservicezipcode,
      updateauthenticationcode, updateacountactive, updateuserid);
    console.log("TS OBJECT", updateid, updatename, updatecontact, updateserviceaddress, updateservicestate, updateservicecity, updateservicezipcode,
      updateauthenticationcode, updateacountactive, updateuserid);
    //Calling Delete Service
    this.serve.editTodoList(updateid, updatename, updatecontact, updateserviceaddress, updateservicestate, updateservicecity, updateservicezipcode,
      updateauthenticationcode, updateacountactive, updateuserid).subscribe(data => {
        console.log(data);
        this.fetchzip();
        swal({
          type: 'success',
          title: 'Updated Your Profile',
          showConfirmButton: false,
          timer: 1500

        })



      }, error => {
      });
    // window.location.reload();

  }
  fetchzip() {
    console.log(this.username)
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'JWT ' + localStorage.getItem('token'));
    console.log('user_profile', localStorage.getItem('token'));
    this.https.get(Config.api + 'user_profile/' + this.username + '/', { headers: headers })

      .subscribe(Res => {
        this.data = Res.json();
        console.log(this.data);
      });

  }
}
