import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
    selector: 'app-lock-cmp',
    templateUrl: './lock.component.html'
})

export class LockComponent implements OnInit {
    test: Date = new Date();
    ngOnInit() {
        setTimeout(function() {
            $('.card').removeClass('card-hidden');
        }, 700);
    }
}
