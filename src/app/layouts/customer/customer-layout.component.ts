import { Component, OnInit, OnDestroy, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
// import { NavItem, NavItemType } from '../../md/md.module';
import { Subscription } from 'rxjs/Subscription';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import 'rxjs/add/operator/filter';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import {HomeService} from "../../home/home.service";

declare const $: any;

@Component({
  selector: 'app-layout',
  templateUrl: './customer-layout.component.html'
})

export class CustomerLayoutComponent implements OnInit, AfterViewInit {
    // public navItems: NavItem[];
    private _router: Subscription;
    url: string;
    location: Location;
    status;

    navbarClass() {
      this.status = !this.status;
    }

    @ViewChild('sidebar') sidebar: any;
    @ViewChild(NavbarComponent) navbar: NavbarComponent;
    constructor( private router: Router, location: Location, private route: ActivatedRoute) {
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
