import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import swal from "sweetalert2";

@Injectable()
export class Authgaurd3Service {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('currentadmin')) {
// logged in so return true
      return true;
    }

// not logged in so redirect to login page with the return url
    this.router.navigate(['/adminlogin'], { queryParams: { returnUrl: state.url }});
    // swal("Please Login First", "", "warning")
    return false;
  }
}
