import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { ReactiveSignup } from './reactiveSignup';
import { debounceTime } from 'rxjs/operators';

// Custom reactive form validation
function ratingRange(c: AbstractControl): { [key: string]: boolean } | null {
  if (c.value !== null && (isNaN(c.value) || c.value < 1 || c.value > 5)) {
    return { 'range': true };
  }
  return null;
}

// Custom reactive form validator with Parameters
function myValidatorWithParam(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return { 'range': true };
    }
    return null;
  }
}

// Cross Control Validation of Reactive Form, Like Email Confirmation
function emailCompare(c: AbstractControl): { [key: string]: boolean } | null {
  let email = c.get('email');
  let confirmEmail = c.get('confirmEmail');
  if (email.pristine || confirmEmail.pristine)
    return null;

  if (email.value !== confirmEmail.value) {
    return { 'match': true };
  }
  return null;
}

@Component({
  selector: 'app-reactive-sign-up',
  templateUrl: './reactive-sign-up.component.html',
  styleUrls: ['./reactive-sign-up.component.css']
})
export class ReactiveSignUpComponent implements OnInit {
  emailMessage: string;
  customerForm: FormGroup;
  signup = new ReactiveSignup();
  
  get addresses(): FormArray {
    return this.customerForm.get('addresses') as FormArray;
  }

  private validationMessages = {
    required: 'Please enter your email address.',
    email: 'Please enter a valid email address.'
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],

      phone: [''],
      notification: ['email'],
      sendCatalog: true,
      //rating: [null, ratingRange] // custom validaton without parameter, see above
      rating: [null, myValidatorWithParam(1, 5)], // custom validaton with parameter, see above
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', Validators.required]
      }, { validators: emailCompare }),

      addresses: this.fb.array([this.buildAddress()])
    });

    // this.customerForm = new FormGroup({
    //   firstName: new FormControl(),
    //   lastName:new FormControl(),
    //   email: new FormControl(),
    //   sendCatalog:new FormControl(true)
    // });

    this.customerForm.get('notification').valueChanges.subscribe(
      value => this.setNotification(value),
    );

    //Customize error message
    const emailControl = this.customerForm.get('emailGroup.email');
    emailControl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      value => this.setMessage(emailControl)
    );
    
  }

  addAddress(): void {
    this.addresses.push(this.buildAddress());
  }

  buildAddress(): FormGroup {
    return this.fb.group({
      addressType: 'home',
      street1: ['', Validators.required],
      street2: '',
      city: '',
      state: '',
      zip: ''
    });
  }
  
  save() {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }

  populateTestData() {
    // this.customerForm.setValue({
    //   firstName: 'Anand',
    //   lastName: 'Dubey',
    //   email : 'anand@gmail.com ',
    //   sendCatalog: false
    // })
    this.customerForm.patchValue({
      firstName: 'Anand',
      lastName: 'Dubey',
      //email : 'anand@gmail.com ',
      sendCatalog: false
    })
  }

  setNotification(vrf: string): void {
    const phoneControl = this.customerForm.get('phone');
    if (vrf === 'text') {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }

  setMessage(c: AbstractControl): void {
    this.emailMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors).map(
        key => this.validationMessages[key]).join(' ');
    }
  }

}
