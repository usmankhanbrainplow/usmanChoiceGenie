import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Headers, Http, Response } from '@angular/http';
import { HttpService } from '../../serv/http-service';
import { Config } from '../../Config';
declare const $: any;
@Component({
  selector: 'app-blog1',
  templateUrl: './blog1.component.html',
  styleUrls: ['./blog1.component.scss']
})

export class Blog1Component implements OnInit {

  data: any = [];
  constructor(private route: ActivatedRoute, private http: Http,private https: HttpService) { }
  private Sub: Subscription;
  public heading1;

  heading;
  text;
  image;
  ngOnInit() {
    this.fetchProducts();
    this.route.params.subscribe(params => {

    });
    this.Sub = this.route.params.subscribe(params => {
      this.heading1 = +params['heading1'];
      console.log(this.heading1)
    });
  }
  fetchProducts() {
    this.heading = localStorage.getItem('heading');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.https.get(Config.api +'gettingblog_html/'+this.heading+'/', { headers: headers })
      .subscribe(Res => {
        this.data = Res.json()[0].content1;
        this.image=Res.json()[0].blog_image;
        
        console.log(this.image);
     $('#myDiv').html(this.data);
        
      });
    
  }
}
