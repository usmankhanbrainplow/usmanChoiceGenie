import { Component, OnInit } from '@angular/core';
// import {FormControl, Validators} from '@angular/forms';
import {NgForm} from '@angular/forms';
// import {ContactUsService} from "./contact-us.service";
import { AgmCoreModule } from '@agm/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'

import { Config } from "../../Config";
import { ActivatedRoute, Router } from "@angular/router";
import { SimpleGlobal } from 'ng2-simple-global';
import { ResponseContentType } from '@angular/http/src/enums';
import { FormBuilder, Validators, NgControl, RadioControlValueAccessor, FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
 import swal from 'sweetalert2'; 
 import { DeleteBlogService } from './delete-blog.service';
 import { EditBlogService } from './edit-blog.service';
 declare const $: any;
import { MatSelect } from '@angular/material'; 
@Component({
  selector: 'app-blog3',
  templateUrl: './blog3.component.html',
  styleUrls: ['./blog3.component.scss']
})
export class Blog3Component implements OnInit {

  dataId;
  onSubmit;
  constructor(private serve:EditBlogService,private newService:DeleteBlogService,private https:Http,public router: Router, private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private sg: SimpleGlobal) { }
  data:any=[];
  myDiv;
  save;
  heading1;
    ngOnInit() {
      this. profile();
    }
    
    fun(heading){
      this.router.navigate(['/' + heading.split(' ').join('-')]);
      localStorage.setItem('heading', heading);
    }
    profile() {
      
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.https.get(Config.api+'gettingblog_all/' , { headers: headers })
      
      .subscribe(Res => {
      this.data=Res.json();
      console.log(this.data);
      });
      
      }
      id='';
      btnDeleteClick(id,heading,blog_image) {
        this.id = id;
        this.heading=heading;
        this.blog_image=blog_image;
        console.log('id : ' + this.id);
    }
      deleteClick(id) {
        console.log('delete' + id);

        //Calling Delete Service
        this.newService.DeleteTodoList(this.id).subscribe(data => {
            console.log(data);
            swal({
                type: 'success',
                title: 'Successfully deleted',
                showConfirmButton: false,
                timer: 1500
              })
         
              this. profile();

               
        }, error => {
        });
     //   window.location.reload();

    }
    heading='';
    content1='';
    blog_image='';
   
    blogId='';
    btnEditClick(id,heading,content1,blog_image) {
      this.blogId = id;
      
      this.heading=heading;
    this.content1=content1;
   
    $('#myDiv').html(this.content1);
    this.blog_image=blog_image;
   
     
      console.log(this.blogId,heading,content1,blog_image)
      console.log('id : ' + this.blogId );
  }

  //Event Binding of PopUp Delete Modal

  editClick(updatedheading,updatedcontent1,updatedblog_image,) {
      console.log('edit' +updatedheading,updatedcontent1,updatedblog_image);
console.log("TS OBJECT",updatedheading,updatedcontent1,updatedblog_image);
      //Calling Delete Service
      this.serve.editTodoList(this.blogId,updatedheading,updatedcontent1,updatedblog_image).subscribe(data => {
          console.log(data);
          swal({
              type: 'success',
              title: 'Successfully updated',
              showConfirmButton: false,
              timer: 1500
            })
            this. profile();

      }, error => {
      });
    //  window.location.reload();

  }
  }


