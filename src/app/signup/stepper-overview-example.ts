import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

/**
 * @title Stepper overview
 */
@Component({
    selector: 'stepper-overview-example',
    templateUrl: 'stepper-overview-example.html'
})
export class StepperOverviewExample {
    isLinear = true;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;

    constructor(private _formBuilder: FormBuilder) { }

    ngOnInit() {
        this.firstFormGroup = this._formBuilder.group({
            firstName: ['', Validators.compose([Validators.required,Validators.pattern('[a-zA-Z0-9_.]+?')])],
            lastName: ['', Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required]
        });
    }
}