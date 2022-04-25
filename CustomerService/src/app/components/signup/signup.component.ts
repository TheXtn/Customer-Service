import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { LibService } from 'src/app/services/lib/lib.service';
import { Router } from '@angular/router';

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


  constructor(private libService:LibService,private route:Router) { }


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
  getErrorMessagePass1() {
    return this.pass1.hasError('required') ? 'You must enter a password!' : '';
  }


  passCheck(){
    let pass1 = (<HTMLInputElement>document.getElementById('pass1')).value;
    let pass2 = (<HTMLInputElement>document.getElementById('pass2')).value;
    if(pass1 != pass2){
      this.pass2Color = 'warn';
      this.passErrorMessage = 'Password Not Matching!';
    }
  }

  async ngOnInit(): Promise<void> {
    document.body.className = "selector";
    const isloggedin = await this.libService.isLoggedin()
    if (isloggedin){
      this.route.navigate(['/user/dashboard'])
    }
  }

  async Register() {
    let name = (<HTMLInputElement>document.getElementById('firstN')).value;
    let LastName = (<HTMLInputElement>document.getElementById('lastN')).value;
    let email = (<HTMLInputElement>document.getElementById('login')).value;
    let pass1 = (<HTMLInputElement>document.getElementById('pass1')).value;
    let pass2 = (<HTMLInputElement>document.getElementById('pass2')).value;

    let ok = true;
    if (name == ''){ok = false;alert('Name is required')}
    else if ((this.email.hasError('email')) || (email=='')){ok = false;alert('Invalid E-mail!')}
    else if (pass1 ==''){ok = false;alert('Password is required')}
    else if (pass1 != pass2){ok=false;alert('Passwords not matching!')}
    if(LastName != ''){ name = name+LastName}

    if(ok == true){
      const reg = await this.libService.RegisterUser(name,email,pass1);
      this.route.navigate(['/login'])
    }
    
  }

}
