import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { LibService } from 'src/app/services/lib/lib.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

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
  notLoading$:Observable<boolean>=of(true)
  error:string="";
  isWrong:boolean=false


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
    this.notLoading$=of(false)
    document.body.className = "selector";
    const isloggedin = await this.libService.isLoggedin()
    if (isloggedin){
      this.route.navigate(['/user/dashboard'])
    }
    this.notLoading$=of(true)
  }

  async Register() {
    let name = (<HTMLInputElement>document.getElementById('firstN')).value;
    let LastName = (<HTMLInputElement>document.getElementById('lastN')).value;
    let email = (<HTMLInputElement>document.getElementById('login')).value;
    let pass1 = (<HTMLInputElement>document.getElementById('pass1')).value;
    let pass2 = (<HTMLInputElement>document.getElementById('pass2')).value;

    let ok = true;
    if (name == ''){ok = false;this.isWrong=true;this.error="Name is required!"}
    else if ((this.email.hasError('email')) || (email=='')){ok = false;this.isWrong=true;this.error="Invalid Email!"}
    else if (pass1 ==''){ok = false;this.isWrong=true;this.error="Password is Required!"}
    else if (pass1 != pass2){ok=false;this.isWrong=true;this.error="Passwords do not match!"}
    if(LastName != ''){ name = name+' '+LastName}

    if(ok == true){
      this.notLoading$=of(false)
      const reg = await this.libService.RegisterUser(name,email,pass1);
      this.route.navigate(['/login'])
    }
    
  }

}
