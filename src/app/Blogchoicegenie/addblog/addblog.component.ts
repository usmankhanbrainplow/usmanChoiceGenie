import { Component, OnInit } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { Config } from "../../Config";
import { ActivatedRoute, Router } from "@angular/router";
import { SimpleGlobal } from 'ng2-simple-global';
import { ResponseContentType } from '@angular/http/src/enums';
import { FormBuilder, Validators, NgControl, RadioControlValueAccessor, FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import swal from 'sweetalert2';
import { MatSelect } from '@angular/material';

@Component({
  selector: 'app-addblog',
  templateUrl: './addblog.component.html',
  styleUrls: ['./addblog.component.scss']
})
export class AddblogComponent implements OnInit {
  state;
  city;
  save;
  username;
  confirmpassword;
  signupForm: FormGroup;
  private next: any;
  model: any = {};
  normalPattern = '[a-zA-Z0-9_.-]+?';
  digitsOnly = '^[0-9,-]+$';
  email = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  usernameOnly = '[a-zA-Z0-9_.]+';
  flag = true;
  date = new FormControl(new Date());
  hide = true;
  emailexist: boolean = true;
  usernameexist: boolean = true;
  result: any = [];
  url: any = 'JPG, GIF, PNG';
  blog_image;
  
   
  constructor( public router: Router, private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private sg: SimpleGlobal) { }
  ngOnInit() {
  
    this.signupForm = this.fb.group({
      'blog_image': ['', Validators.compose([Validators.required])],
      'heading': ['', Validators.compose([Validators.required])],
      'content1': ['', Validators.compose([Validators.required])],
     
    });
  }
 
  onChange(event: EventTarget) {
    this.blog_image = new FormData();
    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    this.blog_image.append('fileToUpload', target.files[0]);
    console.log(this.blog_image);
    alert(this.blog_image);
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.url = e.target.result;
        console.log(this.url);
      };
    
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  upload() {
    this.http.post(
      Config.Imageurlupload,
      this.blog_image, { responseType: 'text' }).subscribe(data => {
        if (data === "Sorry, not a valid Image.Sorry, only JPG, JPEG, PNG & GIF files are allowed.Sorry, your file was not uploaded.") {
        }
        else {

          
          console.log(data);
          alert(data);
          this.model.blog_image = data;
        
          this.signupuserdata();
        }
      });



  }

  signupuserdata() {
    console.log("CHOICE GENIE", this.model.blog_image);
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.http.post(Config.api+'postingblog/', this.model, { headers: headers })
      .subscribe(Res => {
        console.log(Res);
        console.log(this.model);
        swal({
          text: "Blogs Save  Successflluy!",
          title: "Choice Genie",
          type: "success",
          showConfirmButton: false,
          timer: 1200,
          confirmButtonText: "OK",

        })
        //  f.resetForm();

      },
        error => {
          console.log(error);

        });

  }


}
