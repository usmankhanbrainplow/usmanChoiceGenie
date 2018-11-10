import { AbstractControl } from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
       const password = AC.get('password').value; // to get value in input tag
       const confirmpassword = AC.get('confirmpassword').value; // to get value in input tag
        if (password !== confirmpassword) {
            AC.get('confirmpassword').setErrors( {MatchPassword: true} );
        } else {
            return null;
        }
    }
}
