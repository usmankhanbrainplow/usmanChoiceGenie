import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from './enrollment.service'

@Component({
  selector: 'app-enrollment-success-page',
  templateUrl: './enrollment-success-page.component.html',
  styleUrls: ['./enrollment-success-page.component.scss']
})
export class EnrollmentSuccessPageComponent implements OnInit {
  response = null;

  constructor(private service: EnrollmentService) { }

  ngOnInit() {
    window.scrollTo(0, 0)
    this.service.data.subscribe(res => {
      this.response = res;
    });
  }
}