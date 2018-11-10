import { Component, OnInit, OnDestroy, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
// import { NavItem, NavItemType } from '../../md/md.module';
import { Subscription } from 'rxjs/Subscription';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import 'rxjs/add/operator/filter';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { UsernavbarComponent } from '../../shared/usernavbar/usernavbar.component';
declare const $: any;

@Component({
  selector: 'app-consumeradmin',
  templateUrl: './consumeradmin.component.html',
  styleUrls: ['./consumeradmin.component.scss']
})
export class ConsumeradminComponent implements OnInit {

 // public navItems: NavItem[];
 private _router: Subscription;
 url: string;
 location: Location;
//  w3_close;

 @ViewChild('sidebar') sidebar: any;
 @ViewChild(NavbarComponent) navbar: NavbarComponent;
 constructor( private router: Router, location: Location ) {
   this.location = location;
 }
 w3_open;
 w3_close;
 ngOnInit() {
     const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
     const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');

     this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
       this.navbar.sidebarClose();
     });

 }
 ngAfterViewInit() {
     this.runOnRouteChange();
 }
 public isMap() {
     if (this.location.prepareExternalUrl(this.location.path()) === '/maps/fullscreen') {
         return true;
     } else {
         return false;
     }
 }
 runOnRouteChange(): void {
   if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
     const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
   
   }
 }
 isMac(): boolean {
     let bool = false;
     if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
         bool = true;
     }
     return bool;
 }
}
