import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-commercial',
  templateUrl: './commercial.component.html'
})
export class CommercialComponent implements OnInit {

    foods = [
        {value: 'building-0', viewValue: 'Building'},
        {value: 'restaurant-1', viewValue: 'Restaurant'},
        {value: 'store-2', viewValue: 'Store'},
        {value: 'manufacturing-plant-2', viewValue: 'Manufacturing Plant'},
        {value: 'office-2', viewValue: 'Office'},
        {value: 'other-2', viewValue: 'Other'}
    ];

  constructor() { }

  ngOnInit() {
  }

}
