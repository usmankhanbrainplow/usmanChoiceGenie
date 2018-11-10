import { Component, OnInit } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { Config } from "../../Config";
import { ActivatedRoute, Router } from "@angular/router";
import { SimpleGlobal } from 'ng2-simple-global';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { HttpService } from '../../serv/http-service';
declare const $: any;
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(private https: HttpService, public router: Router, private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private sg: SimpleGlobal) { }
  data: any = [];
  content;
  con;
  private authentication: string | any;
  ngOnInit() {
    this.profile();
    
  }
  profile() {

    const headers = new Headers();
    // headers.append('Authorization', 'JWT ' + localStorage.getItem('token'));
    // console.log('blog', localStorage.getItem('token'));
    headers.append('Content-Type', 'application/json');
    this.https.get(Config.api + 'gettingblog_all/', { headers: headers })
      .subscribe(Res => {
        this.data = Res.json();
    //     // this.content= this.data.content1
    //     this.content=Res.json()[0]['content1'];
    //  this.con=(this.content).replace(/<[^>]+>/gm, '')
    //     // $('#myDiv').html(this.content);
    //     console.log(this.content);
        
      });

  }
//  link='/blog/';
 
  fun(heading){
    this.router.navigate(['/' + heading.split(' ').join('-')]);
    localStorage.setItem('heading', heading);
  }
}