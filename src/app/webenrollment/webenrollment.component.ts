import { Component, OnInit, Inject, ViewChild } from '@angular/core'
import { FormControl, FormGroup, Validators, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms'
import { EnrollmentService } from './enrollment.service'
import { MatRadioChange, ErrorStateMatcher } from '@angular/material'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { Router, ActivatedRoute } from '@angular/router'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-webenrollment',
  templateUrl: './webenrollment.component.html',
  styleUrls: ['./webenrollment.component.scss']
})
export class WebenrollmentComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private _formBuilder: FormBuilder, public dialog: MatDialog, private enrollment: EnrollmentService, private router: Router, private fb: FormBuilder) { }
  products = []
  summary = false
  checked = false
  check1 = false
  check2 = false
  check3 = false
  today = new Date()
  serviceAddresscheck = false
  billAddress
  checkCredit: boolean = true
  zip
  state
  State
  premiseInfo
  street
  city
  address
  premise_id
  currentdate = new Date()
  requestDate
  AutomaticBillPay = false
  provider_name
  date = this.currentdate.getDate() + "/" + (this.currentdate.getMonth() + 1) + "/" + this.currentdate.getFullYear()
  currentreq_date
  ReqDateResponse
  first_standard_date
  first_available_date
  end_date
  services = [
    "Move-in (New Service)",
    "Switching from another Energy Provider on Next Available Schedule Date",
    "Switching from another Energy Provider on a Specific Date"]
  creditCards = [
    "Check My Credit",
    "Dont Check Credit",
    "Waive Deposit",
  ]
  waivedeposit = [
    "I will submit a letter from my current provider showing timely payments for the last 12 months with no more than 1 late payment",
    "I am 65+ and can provide proof of timely payments to my current electric provider.",
    "I am a victim of family violence and will complete and return the required forms."
  ]
  states = [
    { viewValue: "Alabama", value: "AL" },
    { viewValue: "Alaska", value: "AK" },
    { viewValue: "Arizona", value: "AZ" },
    { viewValue: "Arkansas", value: "AR" },
    { viewValue: "California", value: "CA" },
    { viewValue: "Colorado", value: "CO" },
    { viewValue: "Connecticut", value: "CT" },
    { viewValue: "Delaware", value: "DE" },
    { viewValue: "District of Columbia", value: "DC" },
    { viewValue: "Florida", value: "FL" },
    { viewValue: "Georgia", value: "GA" },
    { viewValue: "Hawaii", value: "HI" },
    { viewValue: "Idaho", value: "ID" },
    { viewValue: "Illinois", value: "IL" },
    { viewValue: "Indiana", value: "IN" },
    { viewValue: "Iowa", value: "IA" },
    { viewValue: "Kansas", value: "KS" },
    { viewValue: "Kentucky", value: "KY" },
    { viewValue: "Louisiana", value: "LA" },
    { viewValue: "Maine", value: "ME" },
    { viewValue: "Maryland", value: "MD" },
    { viewValue: "Massachusetts", value: "MA" },
    { viewValue: "Michigan", value: "MI" },
    { viewValue: "Minnesota", value: "MN" },
    { viewValue: "Mississippi", value: "MS" },
    { viewValue: "Missouri", value: "MO" },
    { viewValue: "Montana", value: "MT" },
    { viewValue: "Nebraska", value: "NE" },
    { viewValue: "Nevada", value: "NV" },
    { viewValue: "New Hampshire", value: "NH" },
    { viewValue: "New Jersey", value: "NJ" },
    { viewValue: "New Mexico", value: "NM" },
    { viewValue: "New York", value: "NY" },
    { viewValue: "North Carolina", value: "NC" },
    { viewValue: "North Dakota", value: "ND" },
    { viewValue: "Ohio", value: "OH" },
    { viewValue: "Oklahoma", value: "OK" },
    { viewValue: "Oregon", value: "OR" },
    { viewValue: "Pennsylvania", value: "PA" },
    { viewValue: "Rhode Island", value: "RI" },
    { viewValue: "South Carolina", value: "SC" },
    { viewValue: "South Dakota", value: "SD" },
    { viewValue: "Tennessee", value: "TN" },
    { viewValue: "Texas", value: "TX" },
    { viewValue: "Utah", value: "UT" },
    { viewValue: "Vermont", value: "VT" },
    { viewValue: "Virginia", value: "VA" },
    { viewValue: "Washington", value: "WA" },
    { viewValue: "West Virginia", value: "WV" },
    { viewValue: "Wisconsin", value: "WI" },
    { viewValue: "Wyoming", value: "WY" },
    { viewValue: "American Samoa", value: "AS" },
    { viewValue: "Guam", value: "GU" },
    { viewValue: "Northern Mariana Islands", value: "MP" },
    { viewValue: "Puerto Rico", value: "PR" },
    { viewValue: "U.S. Virgin Islands", value: "VI" },
    { viewValue: "Micronesia", value: "FM" },
    { viewValue: "Marshall Islands", value: "MH" },
    { viewValue: "Palau", value: "PW" },
    { viewValue: "U.S. Armed Forces – Americas[d]", value: "AA" },
    { viewValue: "U.S. Armed Forces – Europe[e]", value: "AE" },
    { viewValue: "U.S. Armed Forces – Pacific[f]", value: "AP" },
    { viewValue: "Northern Mariana Islands", value: "CM" },
    { viewValue: "Panama Canal Zone", value: "CZ" },
    { viewValue: "Nebraska", value: "NB" },
    { viewValue: "Philippine Islands", value: "PI" },
    { viewValue: "Trust Territory of the Pacific Islands", value: "TT" },
  ]
  questions = [
    "PIN",
    "What school did you attend sixth grade",
    "In what city or town was your first job",
    "What was the name of your favorite teacher",
    "What was your mothers maiden name"
  ]
  credit_verification
  languages = [{ value: "Default", viewValue: "English" }, { value: "es.Default", viewValue: "Spanish" }]
  aboutUs = [
    { name: "Web", value: "01" },
    { name: "OutBound Call TeleMarketer", value: "02" },
    { name: "Inbound Call Internal", value: "03" },
    { name: "Mail", value: "04" }
  ]
  cards = ["Master", "Discover", "Visa"]
  providers = [
    "Altel",
    "Ameritech",
    "ATT Wireless",
    "Bell Canada",
    "Bellsouth",
    "Boost",
    "Cellular South",
    "CellularOne",
    "CellularOne MMS",
    "Centennial WireLess",
    "Cincinnati Bell",
    "Cingular",
    "Cricket",
    "Edge Wireless",
    "Metro PCS",
    "Nextel",
    "O2",
    "Orange",
    "Qwest",
    "Rogers WireLess",
    "Spint PCS",
    "Suncom",
    "T-Mobile",
    "Teleflip",
    "Tellus Mobility",
    "U.S. Cellular",
    "Verizon",
    "Virgin Mobile"
  ]
  waiveDeposite: string
  CreditVerification: string = "Check My Credit"

  myForm = new FormGroup({
    source: new FormControl(''),
    plan_group: new FormControl('R1'),
    request_date: new FormControl(''),
    enrol_type: new FormControl(''),
    ssn: new FormControl(''),
    cust_firstname: new FormControl(''),
    cust_lastname: new FormControl(''),
    company_name: new FormControl(''),
    cust_mi: new FormControl(''),
    phone1: new FormControl(''),
    cm_address2: new FormControl(''),
    cm_address1: new FormControl(''),
    cm_address3: new FormControl(''),
    cm_city: new FormControl(''),
    cm_state: new FormControl(''),
    cm_zip: new FormControl(''),
    email_address: new FormControl(''),
    life_support: new FormControl(''),
    waiver_notice: new FormControl(''),
    cust_dob: new FormControl(''),
    cust_drl_expire: new FormControl(''),
    cust_drl_nbr: new FormControl(''),
    cust_drl_state: new FormControl(''),
    offcycle_switch_date: new FormControl(''),
    enroll_product: new FormControl(''),
    current_rate: new FormControl(''),
    contract_term: new FormControl(''),
    auth_representative: new FormControl(''),
    personal_pin: new FormControl(''),
    personal_ref_code: new FormControl(''),
    cust_bill_type: new FormControl(''),
    phone2: new FormControl(''),
    cust_sms_provider: new FormControl(''),
    aboutus: new FormControl(''),
    referred_by: new FormControl('06'),
  })

  myFilter = (d: Date): boolean => {
    const day = d.getDay()
    const date = d.getDate()
    const month = d.getMonth()
    const holiday1 = month !== 10 || date !== 22
    const holiday2 = month !== 10 || date !== 23
    return day !== 0 && day !== 6 && holiday1 && holiday2
  }

  firstFormGroup: FormGroup
  secondFormGroup: FormGroup
  thirdFormGroup: FormGroup
  fourFormGroup: FormGroup
  startFormGroup: FormGroup

  goToTop() {
    window.scrollTo(0, 0)
  }

  productDetails

  ngOnInit() {
    this.startFormGroup = this.formBuilder.group({
      goNext: ['', Validators.required]
    })
    this.firstFormGroup = this.formBuilder.group({
      enrol_type: ['Move-in (New Service)'],
      request_date: ['', Validators.required],
    })
    this.secondFormGroup = this.formBuilder.group({
      cust_firstname: [''],
      cust_mi: [''],
      cust_lastname: [''],
      cust_dob: [''],
      auth_representative: [''],
      ssn: ['', [Validators.pattern("[0-9]+"), Validators.minLength(9)]],
      cust_drl_nbr: ['', Validators.pattern("[0-9]+")],
      personal_pin: [''],
      cust_drl_state: [''],
      personal_ref_code: [''],
      cust_drl_expire: [''],
    })
    this.thirdFormGroup = this.formBuilder.group({
      cm_address2: [''],
      cm_city: [''],
      cm_state: ['TX'],
      cm_zip: ['', Validators.pattern("[0-9]+")],
      phone1: ['', Validators.pattern("[0-9]+")],
      phone2: ['', Validators.pattern("[0-9]+")],
      cust_sms_provider: [''],
      cust_bill_type: ['Default'],
      email_address: ['', Validators.email],
      referred_by: [''],
    })
    this.fourFormGroup = this.formBuilder.group({
      life_support: ['']
    })
    window.scrollTo(0, 0)
    this.products.push(JSON.parse(localStorage.getItem('productSummary')))
    this.billAddress = JSON.parse(localStorage.getItem('bill-address'))
    // let post = {
    //   tdsp_duns: this.billAddress.DUNS,
    //   req_date: this.date
    // }
    // this.enrollment.requestDate(post).subscribe(res => {
    //   this.requestDate = new Date(res['first_available_date'])
    // }) 
  }
  creditCardString = '';
  CraditCardNo
  mychange(event) {
    console.log(event)
    console.log(this.CraditCardNo)
    console.log(this.myForm.controls.cust_firstname.value)
    if (event == 51 || event == 52 || event == 53 || event == 54 || event == 55 || event == 56) {
      console.log('MasterCard')
      this.creditCardString = 'MasterCard';
    } else if (event == 6) {
      this.creditCardString = 'Discover/Diners Club';
      console.log('Discover/Diners Club')
    } else if (event == 3) {
      this.creditCardString = 'American Express/Diners Club';
      console.log('American Express/Diners Club')
    } else if (event == '') {
      this.creditCardString = ''
    }
    console.log(this.creditCardString)
  }
  requestDateValidation() {
    console.log("Date Function is executed")
    this.enrollment.dataa.subscribe(res => {
      console.log(res)
      this.ReqDateResponse = res['DATES']['row']
      this.ReqDateResponse.map(value => {
        this.first_standard_date = value.first_standard_date
        this.first_available_date = value.first_available_date
        this.end_date = value.end_date
      })
      this.startFormGroup.controls.goNext.setValue('asdasd')
      this.first_standard_date = this.first_standard_date.slice(0, 10)
      this.first_available_date = this.first_available_date.slice(0, 10)
      this.end_date = this.end_date.slice(0, 10)
      this.firstFormGroup.controls.request_date.setValue(this.first_standard_date)
    })
    this.enrollment.dataa1.subscribe(res => {
      if (res != null && res != undefined) {
        this.premiseInfo = res
      }
    })
  }

  autoBill() {
    if (this.AutomaticBillPay == false) {
      this.AutomaticBillPay = true
    }
    else {
      this.AutomaticBillPay = false
    }
  }

  showSummary() {
    if (this.summary == false) {
      this.summary = true
    }
    else {
      this.summary = false
    }
  }

  Checked() {
    console.log(this.myForm.controls.life_support.value)
  }

  SameAsServiceAddress() {
    console.log(this.premiseInfo)
    this.enrollment.dataa.subscribe(res => {
      console.log(res)
    })
    if (this.premiseInfo != null || this.premiseInfo != undefined) {
      if (this.serviceAddresscheck) {
        this.thirdFormGroup.controls.cm_address2.setValue(this.premiseInfo.address1)
        this.thirdFormGroup.controls.cm_city.setValue(this.premiseInfo.city)
        this.thirdFormGroup.controls.cm_state.setValue(this.premiseInfo.state)
        this.thirdFormGroup.controls.cm_zip.setValue(this.premiseInfo.zip)
      }
      else {
        this.thirdFormGroup.controls.cm_address2.reset()
        this.thirdFormGroup.controls.cm_city.reset()
        this.thirdFormGroup.controls.cm_state.reset()
        this.thirdFormGroup.controls.cm_zip.reset()
      }
    }
  }

  flow_status
  deposit_plan
  deposit_amount

  radioChangeCreditVerification(event: MatRadioChange) {
    this.creditvalue = event.value
    if (event.value == "Check My Credit") {
      this.flow_status = '-102'
      this.deposit_plan = 'PNSYSDEPOSIT'
      this.deposit_amount = '300'
      this.checkCredit = true
    } else if (event.value == "Dont Check Credit") {
      this.flow_status = '-104'
      this.deposit_plan = 'PNSYSDEPOSIT'
      this.deposit_amount = '300'
      this.checkCredit = false
    } else if (event.value == "Waive Deposit") {
      this.flow_status = '-229'
      this.deposit_plan = 'PNSYSDEPOSIT'
      this.deposit_amount = '300'
      this.checkCredit = true
    }
  }

  radioChangeCreditVerificationsub(event) {
    if (this.creditvalue == 'Waive Deposit' && event.value == 'I will submit a letter from my current provider showing timely payments for the last 12 months with no more than 1 late payment') {
      this.flow_status = '-229'
      this.deposit_plan = 'PNSYSDEPOSIT'
      this.deposit_amount = '300'
    } else if (this.creditvalue == 'Waive Deposit' && event.value == 'I am 65+ and can provide proof of timely payments to my current electric provider.') {
      this.flow_status = '-228'
      this.deposit_plan = 'PNSYSDEPOSIT'
      this.deposit_amount = '300'
    } else if (this.creditvalue == 'Waive Deposit' && event.value == 'I am a victim of family violence and will complete and return the required forms.') {
      this.flow_status = '-227'
      this.deposit_plan = 'PNSYSDEPOSIT'
      this.deposit_amount = '300'
    }
  }

  submitBtn
  enroll() {
    this.submitBtn = true
    if (this.check1 == true && this.check2 == true && this.check3 == true) {
      let obj = this.myForm.getRawValue()
      // obj.service_address = this.oneFormGroup.controls.service_address.value
      // obj.city = this.oneFormGroup.controls.city.value
      // obj.zip_code = this.oneFormGroup.controls.zip_code.value
      obj.enrol_type = this.firstFormGroup.controls.enrol_type.value
      obj.cust_firstname = this.secondFormGroup.controls.cust_firstname.value
      obj.cust_mi = this.secondFormGroup.controls.cust_mi.value
      obj.cust_lastname = this.secondFormGroup.controls.cust_lastname.value
      obj.auth_representative = this.secondFormGroup.controls.auth_representative.value
      obj.ssn = this.secondFormGroup.controls.ssn.value
      obj.cust_drl_nbr = this.secondFormGroup.controls.cust_drl_nbr.value
      obj.personal_pin = this.secondFormGroup.controls.personal_pin.value
      obj.cust_drl_state = this.secondFormGroup.controls.cust_drl_state.value
      obj.personal_ref_code = this.secondFormGroup.controls.personal_ref_code.value
      obj.cm_address2 = this.thirdFormGroup.controls.cm_address2.value
      obj.cm_city = this.thirdFormGroup.controls.cm_city.value
      obj.cm_state = this.thirdFormGroup.controls.cm_state.value
      obj.cm_zip = this.thirdFormGroup.controls.cm_zip.value
      obj.phone1 = this.thirdFormGroup.controls.phone1.value
      obj.phone2 = this.thirdFormGroup.controls.phone2.value
      obj.cust_sms_provider = this.thirdFormGroup.controls.cust_sms_provider.value
      obj.cust_bill_type = this.thirdFormGroup.controls.cust_bill_type.value
      obj.email_address = this.thirdFormGroup.controls.email_address.value
      obj.referred_by = this.thirdFormGroup.controls.referred_by.value
      obj.life_support = this.fourFormGroup.controls.life_support.value
      this.productDetails = JSON.parse(localStorage.getItem('productSummary'))
      console.log(this.productDetails)
      obj.enroll_product = this.productDetails.product_id
      obj.promo_code = JSON.parse(localStorage.getItem('promotionCode'))
      obj.rate = this.productDetails.rate
      obj.batch_rate = this.productDetails.batch_rate
      obj.contract_term = this.productDetails.display_term
      // let obj = (this.oneFormGroup.getRawValue(), this.firstFormGroup.getRawValue(), this.secondFormGroup.getRawValue(), this.thirdFormGroup.getRawValue(), this.fourFormGroup.getRawValue()) 
      // let premiseDetails = JSON.parse(localStorage.getItem('enroll'))
      if (this.myForm.controls.life_support.value == true) { obj.life_support = "Y" }
      if (this.myForm.controls.life_support.value == false) { obj.life_support = "N" }
      obj.cust_firstname = this.secondFormGroup.controls.cust_firstname.value
      obj.cust_dob = this.enrollment.Date(this.secondFormGroup.controls.cust_dob.value)
      obj.request_date = this.enrollment.Date(this.firstFormGroup.controls.request_date.value)
      obj.cust_drl_expire = this.enrollment.Date(this.secondFormGroup.controls.cust_drl_expire.value)
      obj.plan_group = 'R3'
      obj.source = "WEB Lite"
      obj.priority_code = localStorage.getItem('priorityCode')
      obj.offcycle_switch_date = obj.request_date
      obj['premise_id'] = this.premiseInfo['premise_id']
      obj['promo_code'] = ''
      obj['flow_status'] = this.flow_status
      obj['pm_address2'] = this.premiseInfo['address1']
      obj['pm_city'] = this.premiseInfo['city']
      obj['pm_country'] = ''
      obj['pm_duns'] = this.premiseInfo['provider_id']
      obj['pm_state'] = this.premiseInfo['state']
      obj['pm_zip'] = this.premiseInfo['zip']
      obj['pm_county'] = this.premiseInfo['countyname']
      // obj['referred_by'] = ''
      // obj['cust_sms_provider'] = ''
      // obj['personal_pin'] = ''
      // obj['personal_ref_code'] = ''

      if (this.checked == true) {
        obj.life_support = 'Y'
      }
      else {
        obj.life_support = 'N'
      }
      obj.waiver_notice = 'Y'
      if (obj.enrol_type == 'Move-in (New Service)') {
        obj.enrol_type = 'M'
      }
      else {
        obj.enrol_type = 'S'
      }
      console.log(obj)
      this.enrollment.enrollUser(obj).subscribe(res => {
        console.log(res)
        if (res['main_error'] == false || res['main_error'] == '' || res['main_error'] == null || res['main_error'] == undefined) {
          this.submitBtn = false
          if (res['status'] == true) {
            console.log("Condition 1")
            this.enrollment.changeData(res)
            this.router.navigate(['enrollsuccess'])
          }
          if (res['deposit_status'] == true) {
            console.log("Condition 2")
            let depositDialog = this.dialog.open(DespositPopup, {
              data: obj
            })
            depositDialog.afterClosed().subscribe(res => { })
          }
          if (res['deposit_status'] == false) {
            console.log("Condition 3")
            this.enrollment.changeData(res)
            this.router.navigate(['enrollsuccess'])
          }
        }
        else if (res["status"] == false && res["redirect_url"] != null && res["redirect_url"] != undefined && res["redirect_url"] != '') {
          Swal('Oops!', 'Your session has expired. Please refresh the page and try again', 'error').then((value) => {
            this.submitBtn = false
            this.router.navigate(['' + res["redirect_url"]])
          })
        }
        else {
          console.log("Condition 4")
          this.submitBtn = false
          let myMessage
          for (let x in res['message']) {
            myMessage = myMessage + (x + ": " + res['message']["" + x] + "<br>")
          }
          Swal('Oops!', myMessage, 'error')
        }
      })
    }
  }

  disable_requestDate() {
    this.firstFormGroup.controls.request_date.disable()
  }

  enable_requestDate() {
    this.firstFormGroup.controls.request_date.enable()
  }

  creditverification = {}
  creditvalue = ''

  radioChange(event: MatRadioChange) {
    if (event.value == 'Switching from another Energy Provider on Next Available Schedule Date') {
      this.firstFormGroup.controls.request_date.disable()
      this.ReqDateResponse.map(value => {
        this.first_standard_date = value.first_standard_date
        this.first_available_date = value.first_available_date
      })
      this.first_standard_date = this.first_standard_date.slice(0, 10)
      this.first_available_date = this.first_available_date.slice(0, 10)
      this.firstFormGroup.controls.request_date.setValue(this.first_standard_date)
    }
    else if (event.value == 'Switching from another Energy Provider on a Specific Date') {
      this.ReqDateResponse.map(value => {
        this.firstFormGroup.controls.request_date.enable()
        this.first_standard_date = value.first_standard_date
        this.first_available_date = value.first_available_date
      })
      this.first_standard_date = this.first_standard_date.slice(0, 10)
      this.first_available_date = this.first_standard_date
      this.firstFormGroup.controls.request_date.setValue(this.first_standard_date)
    }
    else {
      this.firstFormGroup.controls.request_date.enable()
      this.ReqDateResponse.map(value => {
        this.first_standard_date = value.first_standard_date
        this.first_available_date = value.first_available_date
      })
      this.first_standard_date = this.first_standard_date.slice(0, 10)
      this.first_available_date = this.first_available_date.slice(0, 10)
      this.firstFormGroup.controls.request_date.setValue(this.first_standard_date)
    }
  }
}

@Component({
  selector: 'confirmationpopup',
  templateUrl: './depositpopup.component.html',
  styleUrls: ['./depositpopup.component.scss']
})
export class DespositPopup {
  constructor(private router: Router, private enrollment: EnrollmentService, public dialog: MatDialog, public dialogRef: MatDialogRef<WebenrollmentComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    dialogRef.disableClose = true
  }
  years = []
  username
  months = [
    { value: "01", viewValue: "January" },
    { value: "02", viewValue: "February" },
    { value: "03", viewValue: "March" },
    { value: "04", viewValue: "April" },
    { value: "05", viewValue: "May" },
    { value: "06", viewValue: "June" },
    { value: "07", viewValue: "July" },
    { value: "08", viewValue: "August" },
    { value: "09", viewValue: "September" },
    { value: "10", viewValue: "October" },
    { value: "11", viewValue: "November" },
    { value: "12", viewValue: "December" },
  ]
  cards = ['Master', 'Discover', 'Visa']
  message
  btnDisabled: boolean = false

  // sendingData = {
  //   cardType: "",
  //   cardNo: "",
  //   securityCode: "",
  //   expDateM: "",
  //   expDateY: "",
  //   depositCharge: "Y",
  //   autoPay: false,
  //   flowStatus: "-121"
  // }

  sendingData = new FormGroup({
    deposit_card_type: new FormControl('', [Validators.required]),
    deposit_cc_no: new FormControl('', [Validators.required]),
    deposit_security_code: new FormControl('', [Validators.required]),
    deposit_expiry_MM: new FormControl('', [Validators.required]),
    deposit_expiry_YYYY: new FormControl('', [Validators.required]),
    deposit_charge: new FormControl('Y'),
    deposit_autopay: new FormControl(false, [Validators.required]),
  })

  ngOnInit() {
    let currentYear = new Date().getFullYear()
    this.years[0] = currentYear
    for (let index = 1; index < 20; index++) {
      this.years[index] = this.years[index - 1] + 1
    }
  }

  submit() {
    console.log(this.data)
    console.log(this.sendingData.value)
    if (this.sendingData.valid == true) {
      this.btnDisabled = true
      let obj = this.data
      obj.deposit_pay_amount = "300"
      obj.deposit_amount = "300"
      obj.deposit_plan = "PNSYSDEPOSIT"
      obj.deposit_pay_type = "C"
      obj.deposit_acct_type = "ccard"
      obj.deposit_charge = this.sendingData.controls.deposit_charge.value
      obj.deposit_expiry_MM = this.sendingData.controls.deposit_expiry_MM.value
      obj.deposit_expiry_YYYY = String(this.sendingData.controls.deposit_expiry_YYYY.value)
      obj.deposit_security_code = this.sendingData.controls.deposit_security_code.value
      obj.deposit_card_type = this.sendingData.controls.deposit_card_type.value
      obj.deposit_cc_no = this.sendingData.controls.deposit_cc_no.value
      obj.deposit_autopay = this.sendingData.controls.deposit_autopay.value
      obj.flow_status = "-104"
      obj.priority_code = localStorage.getItem('priorityCode')
      obj.pay_later = false
      console.log(obj)
      this.enrollment.enrollUser(obj).subscribe(res => {
        console.log(res)
        if (res['main_error'] == false || res['main_error'] == '' || res['main_error'] == null || res['main_error'] == undefined) {
          if (res['status'] == true) {
            console.log("Step 1")
            this.btnDisabled = false
            this.dialogRef.close()
            this.enrollment.changeData(res)
            this.router.navigate(['enrollsuccess'])
          }
          else {
            console.log("Step 2")
            this.btnDisabled = false
            Swal('Oops!', res['message'], 'error')
          }
        }
        else if (res["status"] == false && res["redirect_url"] != null && res["redirect_url"] != undefined && res["redirect_url"] != '') {
          console.log("Step 3")
          this.btnDisabled = false
          Swal('Oops!', 'Your session has expired. Please refresh the page and try again', 'error').then((value) => {
            this.dialogRef.close()
            this.router.navigate(['' + res["redirect_url"]])
          })
        }
        else {
          console.log("Step 4")
          this.btnDisabled = false
          Swal('Oops!', 'Some error occurred', 'error')
        }
      })
    }
  }

  cancel() {
    this.btnDisabled = true
    let obj = this.data
    obj.deposit_pay_amount = "300"
    obj.deposit_amount = "300"
    obj.deposit_plan = "PNSYSDEPOSIT"
    obj.deposit_pay_type = ""
    obj.deposit_acct_type = ""
    obj.deposit_charge = "N"
    obj.deposit_expiry_MM = ""
    obj.deposit_expiry_YYYY = ""
    obj.deposit_security_code = ""
    obj.deposit_card_type = ""
    obj.deposit_cc_no = ""
    obj.flow_status = "-104"
    obj.priority_code = localStorage.getItem('priorityCode')
    obj.pay_later = true
    console.log(obj)
    this.enrollment.enrollUser(obj).subscribe(res => {
      console.log(res)
      if (res['main_error'] != true) {
        if (res['status'] == true) {
          this.btnDisabled = false
          this.dialogRef.close()
          this.enrollment.changeData(res)
          this.router.navigate(['enrollsuccess'])
        }
        else {
          this.btnDisabled = false
          Swal('Oops!', res['message'], 'error')
        }
      }
      else if (res["status"] == false && res["redirect_url"] != null && res["redirect_url"] != undefined && res["redirect_url"] != '') {
        this.btnDisabled = false
        Swal('Oops!', 'Your session has expired. Please refresh the page and try again', 'error').then((value) => {
          this.router.navigate(['' + res["redirect_url"]])
        })
      }
      else {
        this.btnDisabled = false
        Swal('Oops!', 'Some error occurred', 'error')
      }
    })
  }
}

@Component({
  selector: 'search-plan',
  templateUrl: './search-plan.html',
  styleUrls: ['./main.component.scss']
})
export class PlanSearchComponent {
  constructor(public router: Router, private route: ActivatedRoute, private enrollment: EnrollmentService) { }
  matcher = new errorMatcher()
  showSpinner: boolean = false
  showPlans: boolean = true
  showTdsp: boolean = false
  showError: boolean = false
  submitBtnDisabled: boolean = false
  promoC
  para
  image
  ZipCode = localStorage.getItem('zip')
  promoCode = localStorage.getItem('promoCode')
  zip_code = new FormControl('', [Validators.pattern('^[0-9,-]+$'), Validators.required])
  abc = [
    { "market_id": "" },
    { "promo_code": `${this.promoCode}` },
    { "vendor_id": "" },
    { "vendor_group": "" },
    { "pm_duns": "" },
    { "plan_group": "" },
    { "plan_id": "" },
    { "plan_group_type": "POS" }
  ]
  Array1 = []
  Array2 = []
  promoCodeArray = []
  products
  tdsps
  error
  x
  ngOnInit() {
    this.products = []
    this.tdsps = []
    window.scrollTo(0, 0)
    this.route.params.subscribe(res => {
      if (res.PromoCode != null && res.PromoCode != "" && res.PromoCode != undefined) {
        this.promoCode = res.PromoCode
      }
    })
  }
  Errors = false
  errormessage


  searchPlansByTdsps(value) {
    console.log(value)
    this.showTdsp = false
    this.showSpinner = null
    this.x = setTimeout(() => {
      if (this.showSpinner == null) { this.showSpinner = true }
    }, 1500)
    let data = {
      provider_id: value,
      promo_code: this.promoCode
    }
    this.enrollment.searchPlanByTdsp(data).subscribe(res => {
      console.log(res)
      if (res["status"] == false) {
        this.Errors = true
        this.errormessage = res["Error"]
      }
      if (res["status"] == true) {
        this.showSpinner = false
        this.Errors = false
        this.showPlans = true
        this.products = res["message"]
        localStorage.removeItem('zip')
      }
      else if (res["status"] == false) {
        this.showSpinner = false
        this.showError = true
        this.showPlans = false
        this.error = res["message"]
        localStorage.removeItem('zip')
      }
    }, error => {
      this.showSpinner = false
      this.Errors = true
      this.errormessage = "Could not connect to server, please try again"
    })
  }

  submit() {
    this.showSpinner = null
    this.showPlans = false
    this.showTdsp = false
    this.showError = false
    this.Errors = false
    if (((this.ZipCode != null || this.promoCode != null) && this.zip_code.errors == null) && ((this.ZipCode != "" || this.promoCode != "") && this.zip_code.errors == null)) {
      this.submitBtnDisabled = true
      this.x = setTimeout(() => {
        if (this.showSpinner == null) { this.showSpinner = true }
      }, 1500)
      if (this.promoCode == null) { this.promoCode = "" }
      let data = {
        zip_code: this.ZipCode,
        promo_code: "" + this.promoCode,
        client: "WattGenie"
      }
      this.enrollment.searchPlan(data).subscribe(res => {
        console.log(res)
        if (res["status"] == false) {
          this.Errors = true
          this.errormessage = res["Error"]
          this.submitBtnDisabled = false
        }
        if (res["status"] == true) {
          this.showSpinner = false
          this.Errors = false
          this.submitBtnDisabled = false
          if (res["tdsp_status"] == false) {
            this.showPlans = true
            this.products = res["message"]
            localStorage.setItem('promotionCode', JSON.stringify(res['promo_code']))
            localStorage.removeItem('zip')
            this.submitBtnDisabled = false
          }
          else {
            this.showTdsp = true
            this.tdsps = res['message']['row']
            console.log(res)
            this.submitBtnDisabled = false
          }
        }
        else if (res["status"] == false) {
          this.showSpinner = false
          this.showError = true
          this.showPlans = false
          this.error = res["message"]
          localStorage.removeItem('zip')
          this.submitBtnDisabled = false
        }
      }, error => {
        this.showSpinner = false
        this.Errors = true
        this.submitBtnDisabled = false
        this.errormessage = "Could not connect to server, please try again"
      })
    }
  }

  selectProductBtnDisabled: boolean = false
  enroll(i) {
    this.selectProductBtnDisabled = true
    let data = {
      enroll_product: this.products[i].product_id,
      rate: this.products[i].rate,
      batch_rate: this.products[i].batch_rate,
      contract_term: this.products[i].term,
    }
    console.log(data)
    this.enrollment.sendProductDataForSession(data).subscribe(res => {
      console.log(res)
      if (res['status'] == true) {
        this.selectProductBtnDisabled = false
        localStorage.setItem('zip', this.ZipCode)
        this.router.navigate(['/enroll'])
        localStorage.setItem('productSummary', JSON.stringify(this.products[i]))
      }
      if (res["status"] == false && res["redirect_url"] != null && res["redirect_url"] != undefined && res["redirect_url"] != '') {
        Swal('Oops!', 'Your session has expired. Please refresh the page and try again', 'error').then((value) => {
          this.selectProductBtnDisabled = false
          this.ngOnInit()
        })
      }
      else {
        this.selectProductBtnDisabled = false
      }
    }, error => {
      this.selectProductBtnDisabled = false
    })
  }
}

@Component({
  selector: 'enroll-process',
  templateUrl: './enroll-process.html',
  styleUrls: ['./main.component.scss']
})
export class EnrollProcessComponent {
  @ViewChild('premises') target: any
  products = []
  errorMessagee
  len
  multiplePremise
  showSpinner: boolean = false
  enrollProcessForm = new FormGroup({
    service_address: new FormControl("", [Validators.required]),
    city: new FormControl("", [Validators.required]),
    zip_code: new FormControl({ value: localStorage.getItem('zip'), disabled: true }),
    premise_id: new FormControl("", [Validators.required])
  })
  constructor(public obj: EnrollmentService, public router: Router, private enrollment: EnrollmentService, private enrollmentComponent: WebenrollmentComponent) { }
  ngOnInit() {
    if (localStorage.getItem('zip') == "" || localStorage.getItem('zip') == null || localStorage.getItem('zip') == undefined) {
      this.router.navigate(['/search-plan'])
    }
    window.scrollTo(0, 0)
    this.products.push(JSON.parse(localStorage.getItem('productSummary')))
  }
  ESID
  summary = false
  showSummary() {
    if (this.summary == false) {
      this.summary = true
    }
    else {
      this.summary = false
    }
  }
  saveData() {
    this.errorMessagee = null
    this.multiplePremise = []
    console.log(this.enrollProcessForm)
    if (this.enrollProcessForm.valid == true) {
      this.showSpinner = null
      setTimeout(() => {
        if (this.showSpinner == null) { this.showSpinner = true }
      }, 1500)
      let date = new Date()
      let req_date = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear()
      let obj = this.enrollProcessForm.value
      let zip = localStorage.getItem('zip')
      obj['zip_code'] = zip
      let tdsp = ''
      this.obj.enrollProcess(this.enrollProcessForm.value).subscribe(res => {
        console.log(res)
        if (res["status"] == true) {
          this.showSpinner = false
          if (res['message'].length > 1) {
            this.multiplePremise = res['message']
            this.len = res['message'].length
            window.scrollTo(0, 600)
          }
          else {
            this.multiplePremise = res['message']
            this.len = res['message'].length
            this.SelectPremise(this.len - 1)
          }
          let value = res['message']
          let tdsp = value['provider_id']
          let dateDetails = { req_date: req_date, tdsp_duns: tdsp, expedited: true }
          this.obj.savedateDetail(dateDetails)
          localStorage.setItem('bill-address', JSON.stringify(res["message"]))
          this.router.navigate(['/enroll'])
        }
        else if (res["status"] == false && res["redirect_url"] != null && res["redirect_url"] != undefined && res["redirect_url"] != '') {
          Swal('Oops!', 'Your session has expired. Please refresh the page and try again', 'error').then((value) => {
            this.router.navigate(['' + res["redirect_url"]])
          })
        }
        else {
          this.showSpinner = false
          this.errorMessagee = res["message"]
        }
      })
    }
  }

  submit() {
    this.multiplePremise == []
    if (this.enrollProcessForm.controls.premise_id.value == "" || this.enrollProcessForm.controls.premise_id.value == null || this.enrollProcessForm.controls.premise_id.value == undefined) {
      console.log('Condition 1')
      this.enrollProcessForm.controls.premise_id.clearValidators()
      this.enrollProcessForm.controls.premise_id.setValue("")
      this.multiplePremise == []
      this.len = null
      this.saveData()
    }
    else {
      console.log('Condition 2')
      this.enrollProcessForm.controls.service_address.clearValidators()
      this.enrollProcessForm.controls.city.clearValidators()
      this.enrollProcessForm.controls.service_address.setValue("")
      this.enrollProcessForm.controls.city.setValue("")
      this.multiplePremise == []
      this.len = null
      this.saveData()
    }
  }

  get controls() {
    return this.enrollProcessForm.controls
  }

  getDates(premise) {
    let date = new Date()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let day = date.getDate()
    let req_date = month + '/' + day + '/' + year
    let currentreq_date = {
      req_date: req_date,
      tdsp_duns: premise.provider_id,
      expedited: true,
    }
    console.log(currentreq_date)
    document.getElementById('nextBtn').click()
    window.scrollTo(0, 0)
    this.enrollment.requestforDate(currentreq_date).subscribe(res => {
      console.log(res)
      localStorage.setItem('priorityCode', res['DATES'].row[0].priority_code)
      this.enrollment.changeDataa(res)
      this.enrollmentComponent.requestDateValidation()
    })
  }
  selectProductBtnDisabled: boolean = false
  SelectPremise(index) {
    this.selectProductBtnDisabled = true
    this.enrollmentComponent.startFormGroup.controls.goNext.setValue("asdasd")
    let premise = this.multiplePremise[index]
    this.enrollment.changeDataa1(premise)
    let data = {
      provider_id: premise.provider_id,
      premise_id: premise.premise_id,
      city: premise.city,
      address1: premise.address1,
      countyname: premise.countyname
    }
    this.enrollment.sendPremiseDataForSession(data).subscribe(res => {
      console.log(res)
      if (res['status'] == true) {
        this.selectProductBtnDisabled = true
        this.getDates(premise)
      }
      else this.selectProductBtnDisabled = true
    }, error => { this.selectProductBtnDisabled = true })
  }
}

export class errorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted))
  }
}