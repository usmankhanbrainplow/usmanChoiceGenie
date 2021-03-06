import { Component, OnInit, Inject } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import { DOCUMENT } from '@angular/platform-browser';
// import { CookieService } from 'ngx-cookie-service';
declare const $: any;

@Component({
    selector: 'app-my-app',
    templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
    private _router: Subscription;

    constructor(private router: Router, @Inject(DOCUMENT,) private document: any) {}

    ngOnInit() {
        // $('html, body').animate({scrollTop:0},800);
        // $('html, body').animate({ scrollTop: 0 });
        window.onbeforeunload = function () {
            $(this).scrollTop(0);
          }

        window.onbeforeunload = function() {
            if(localStorage.getItem('signed')){
            localStorage.clear();
            return '';
        }
       
          };
       
        
        //   if(document.cookie.split(";")){
        //    // localStorage.clear();
        //    alert('fatttttt')
        //   }
        
        $.material.options.autofill = true;
        $.material.init();
        this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
            if (window.outerWidth > 991) {
                window.document.children[0].scrollTop = 0;
            }else{
                window.document.activeElement.scrollTop = 0;
            }
        });
    }
   
}
