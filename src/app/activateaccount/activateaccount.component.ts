import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Headers, Response, Http } from "@angular/http"
import { LoginService } from "../pages/login/login.service";
import swal from 'sweetalert2';
@Component({
  selector: 'app-activateaccount',
  templateUrl: './activateaccount.component.html',
  styleUrls: ['./activateaccount.component.scss']
})
export class ActivateaccountComponent implements OnInit {
  sub;
  constructor( private _serv: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private http5: Http) { }
  ngOnInit() {
    this.sub = this.route.params.subscribe ( params => {
      this.authenticate(params['query1']) 
  });
  }
  authenticate(uid) {
    this._serv.activate(uid)
      .subscribe(
        data => {
          swal({
            type: 'success',
            title: 'Verify Your Account',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['/userlogin']);
        },
        error => {
          alert(error)
          this.router.navigate(['/userlogin']);
        });
  }

}
