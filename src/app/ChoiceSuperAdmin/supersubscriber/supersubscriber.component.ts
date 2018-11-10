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

import { Headers, Http, Response } from '@angular/http';
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { jsonpCallbackContext } from '@angular/common/http/src/module';

import { PageEvent } from '@angular/material';
@Component({
  selector: 'app-supersubscriber',
  templateUrl: './supersubscriber.component.html',
  styleUrls: ['./supersubscriber.component.scss']
})
export class SupersubscriberComponent implements OnInit {
  pager: any = {};
  subs;
  pagedItems;
  constructor( private pagerService: PagerService,private route: ActivatedRoute,private http: Http) { }

  ngOnInit() {
    this.getreview(1)
  }
  getreview(page:number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
  }
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.get(Config.api+'subscribeusers/'+'?page=' + page, { headers: headers })
    .subscribe(Res => {
    this.subs=Res.json()['Results'];
    console.log(this.subs)
// this.rate=this.rev['rate'];
//     console.log(this.rate);
//this.pager = this.pagerService.getPager(Res['Results'],Res['Total Pages']);
this.pager = this.pagerService.getPager(Res.json()['Total Result'], page, 10);
    });
    
    }
}
