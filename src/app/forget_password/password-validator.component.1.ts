import { AbstractControl } from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
       const pass1 = AC.get('pass1').value; // to get value in input tag
       const pass2 = AC.get('pass2').value; // to get value in input tag
        if (pass1 !== pass2) {
            AC.get('pass2').setErrors( {MatchPassword: true} );
        }
         else {
            return null;
        }
    }
}
