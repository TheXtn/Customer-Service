import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  hide1 :boolean =true;
  hide2 :boolean =true;
  pass2Color :string="primary";
  passErrorMessage :string='';
  constructor() { }
  Fname = new FormControl('',Validators.required);
  Lname = new FormControl('',Validators.required);
  pass1 = new FormControl('',Validators.required);
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessageMail() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessageFName() {
    return this.Fname.hasError('required') ? 'You must enter a first name!' : '';
  }
  getErrorMessageLName() {
    return this.Lname.hasError('required') ? 'You must enter a Last name!' : '';
  }
  getErrorMessagePass1() {
    return this.Lname.hasError('required') ? 'You must enter a password!' : '';
  }


  passCheck(){
    let pass1 = (<HTMLInputElement>document.getElementById('pass1')).value;
    let pass2 = (<HTMLInputElement>document.getElementById('pass2')).value;
    if(pass1 != pass2){
      this.pass2Color = 'warn';
      this.passErrorMessage = 'Password Not Matching!';
    }
  }

  ngOnInit(): void {
    document.body.className="selector";
  }

}
