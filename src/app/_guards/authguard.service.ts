
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import swal from "sweetalert2";

@Injectable()
export class AuthguardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('username')) {
// logged in so return true
      return true;
    }

// not logged in so redirect to login page with the return url
    this.router.navigate(['/userlogin'], { queryParams: { returnUrl: state.url }});
    // swal("Please Login First", "", "warning")
    return false;
  }
}