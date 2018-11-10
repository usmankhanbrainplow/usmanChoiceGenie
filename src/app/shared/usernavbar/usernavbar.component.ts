import { Component, OnInit, Renderer, ViewChild, ElementRef, Directive } from '@angular/core';
import { ROUTES } from '../../sidebar/sidebar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
 
import { ErrorStateMatcher, MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material";
import { NgForm, FormControl, Validators, FormGroupDirective } from "@angular/forms";
import { Pipe, PipeTransform } from "@angular/core";
// import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Headers, Http, Response } from '@angular/http';
 
import { ResponseContentType } from '@angular/http/src/enums';
import { Console } from '@angular/core/src/console';
// import {Config} from "../Config";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { jsonpCallbackContext } from '@angular/common/http/src/module';
 
import { SimpleGlobal } from 'ng2-simple-global';
// import { ValueUnwrapper } from '@angular/core/src/change_detection/change_detection_util';
//import { Http } from '@angular/http/src/http';
import { PageEvent } from '@angular/material';
 
declare const $: any;
const misc: any = {
    navbar_menu_visible: 0,
    active_collapse: true,
    disabled_collapse_init: 0,
};


@Component({
  selector: 'app-usernavbar',
  templateUrl: './usernavbar.component.html',
  styleUrls: ['./usernavbar.component.scss']
})
export class UsernavbarComponent implements OnInit {
    private listTitles: any[];
    // location: Location;
     private nativeElement: Node;
     private toggleButton: any;
     private sidebarVisible: boolean;
     public username :any;
 
     @ViewChild('app-usernavbar') button: any;
     constructor(private route: ActivatedRoute, private https: HttpClient, 
         private location: Location, private router: Router, private http: Http,    
         public sg: SimpleGlobal,  private dialog: MatDialog, private element: ElementRef  ) {
 
    // }
 //    constructor(location: Location, private renderer: Renderer, private element: ElementRef) {
         this.location = location;
         this.nativeElement = element.nativeElement;
         this.sidebarVisible = false;
     }
     check_login() {
         if (localStorage.getItem('username')) {
           let local = localStorage.getItem('username');
           return true;
         }
           else {
           return false;    }
       }
       move(){
         this.router.navigate(['/userprofile/']);
       }
     logout(){
         localStorage.clear();
         this.router.navigate(['/']);
       //  console.log("logout"); 
       }
     ngOnInit() {
         this.username = localStorage.getItem('username')
         console.log(this.username);
 
         this.listTitles = ROUTES.filter(listTitle => listTitle);
 
         const navbar: HTMLElement = this.element.nativeElement;
         this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
         if ($('body').hasClass('sidebar-mini')) {
             misc.sidebar_mini_active = true;
         }
         if ($('body').hasClass('hide-sidebar')) {
             misc.hide_sidebar_active = true;
         }
         $('#minimizeSidebar').click(function() {
             if (misc.sidebar_mini_active === true) {
                 $('body').removeClass('sidebar-mini');
                 misc.sidebar_mini_active = false;
 
             } else {
                 setTimeout(function() {
                     $('body').addClass('sidebar-mini');
 
                     misc.sidebar_mini_active = true;
                 }, 300);
             }
 
             // we simulate the window Resize so the charts will get updated in realtime.
             const simulateWindowResize = setInterval(function() {
                 window.dispatchEvent(new Event('resize'));
             }, 180);
 
             // we stop the simulation of Window Resize after the animations are completed
             setTimeout(function() {
                 clearInterval(simulateWindowResize);
             }, 1000);
         });
         $('#hideSidebar').click(function() {
             if (misc.hide_sidebar_active === true) {
                 setTimeout(function() {
                     $('body').removeClass('hide-sidebar');
                     misc.hide_sidebar_active = false;
                 }, 300);
                 setTimeout(function () {
                     $('.sidebar').removeClass('animation');
                 }, 600);
                 $('.sidebar').addClass('animation');
 
             } else {
                 setTimeout(function() {
                     $('body').addClass('hide-sidebar');
                     // $('.sidebar').addClass('animation');
                     misc.hide_sidebar_active = true;
                 }, 300);
             }
 
             // we simulate the window Resize so the charts will get updated in realtime.
             const simulateWindowResize = setInterval(function() {
                 window.dispatchEvent(new Event('resize'));
             }, 180);
 
             // we stop the simulation of Window Resize after the animations are completed
             setTimeout(function() {
                 clearInterval(simulateWindowResize);
             }, 1000);
         });
     }
     isMobileMenu() {
         if ($(window).width() < 991) {
             return false;
         }
         return true;
     };
     sidebarOpen() {
         const toggleButton = this.toggleButton;
         const body = document.getElementsByTagName('body')[0];
         setTimeout(function(){
             toggleButton.classList.add('toggled');
         }, 500);
         body.classList.add('nav-open');
 
         this.sidebarVisible = true;
     };
     sidebarClose() {
         const body = document.getElementsByTagName('body')[0];
         // this.toggleButton.classList.remove('toggled');
         this.sidebarVisible = false;
         body.classList.remove('nav-open');
     };
     sidebarToggle() {
         // const toggleButton = this.toggleButton;
         // const body = document.getElementsByTagName('body')[0];
         if (this.sidebarVisible === false) {
             this.sidebarOpen();
         } else {
             this.sidebarClose();
         }
     };
 
     getTitle() {
         let titlee: any = this.location.prepareExternalUrl(this.location.path());
         for (let i = 0; i < this.listTitles.length; i++) {
             if (this.listTitles[i].type === "link" && this.listTitles[i].path === titlee) {
                 return this.listTitles[i].title;
             } else if (this.listTitles[i].type === "sub") {
                 for (let j = 0; j < this.listTitles[i].children.length; j++) {
                     let subtitle = this.listTitles[i].path + '/' + this.listTitles[i].children[j].path;
                     if (subtitle === titlee) {
                         return this.listTitles[i].children[j].title;
                     }
                 }
             }
         }
         return 'Dashboard';
     }
     getPath() {
         return this.location.prepareExternalUrl(this.location.path());
     }
}
