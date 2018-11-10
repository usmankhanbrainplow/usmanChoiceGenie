import { Component, OnInit, OnDestroy, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
// import { NavItem, NavItemType } from '../../md/md.module';
import { Subscription } from 'rxjs/Subscription';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import 'rxjs/add/operator/filter';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

declare const $: any;

@Component({
  selector: 'app-layout',
  templateUrl: './normal-layout.component.html'
})

export class NormalLayoutComponent implements OnInit, AfterViewInit {
    // public navItems: NavItem[];
    private _router: Subscription;
    url: string;
    location: Location;

    @ViewChild('sidebar') sidebar: any;
    @ViewChild(NavbarComponent) navbar: NavbarComponent;
    constructor( private router: Router, location: Location ) {
      this.location = location;
    }
    ngOnInit() {
      
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
     
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }
}
