import { Component, OnInit, } from '@angular/core';
import { LibService } from './../../services/lib/lib.service';
import {Router} from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { DataService } from 'src/app/services/data.service';
import {FormControl, Validators} from '@angular/forms';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  hide :boolean =true;
  logtxt : string="";
  Role :string='';
  notLoading$:Observable<boolean>=of(true)
  error:string="";
  isWrong:boolean=false
  constructor(private data:DataService,private libService:LibService,private route:Router,private head:HeaderComponent) { 

  }
  email = new FormControl('', [Validators.required, Validators.email]);
  
  pass1 = new FormControl('',Validators.required);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  getErrorMessagePass1() {
    return this.pass1.hasError('required') ? 'You must enter a password!' : '';
  }
  
  async ngOnInit(): Promise<void> {
    this.notLoading$=of(false)
    document.body.className = "selector";
    this.data.currentMessage.subscribe(message => this.logtxt = message);
    const isloggedin = await this.libService.isLoggedin()
    if (isloggedin){
      this.route.navigate(['/user/dashboard'])
    }
    this.notLoading$=of(true)
  }

  ngOnDestroy(){
    document.body.className="";
  }

  
  async login() {
  
      let login = (<HTMLInputElement>document.getElementById('login')).value
      let pass = (<HTMLInputElement>document.getElementById('pass1')).value


    let csrf=await this.libService.getCsrf()
    const isloggedin = await this.libService.isLoggedin()

    if (isloggedin == false){

        let ok = true;
        if ((this.email.hasError('email')) || (login=='')){ok = false;this.error="Invalid Email";this.isWrong=true}
        else if (pass ==''){ok = false;this.error="Password is required";this.isWrong=true}
        
        if (ok==true){

            if (this.Role =="Customer") {
              this.notLoading$=of(false)
            const log=await this.libService.logUser(login,pass,csrf)
            console.log(log)
            if (log==404){
              this.isWrong=true
              this.error="Email or password incorrect!";
              this.notLoading$=of(true)
            }else{
              this.data.changeLogtxt('Logout')
              this.route.navigate(['/user/dashboard'])
            }
          }else if (this.Role =="Technicien") {
            this.notLoading$=of(false)
            const log=await this.libService.logTech(login,pass,csrf)
            if (log==404){
              this.notLoading$=of(true)
              this.isWrong=true
              this.error="Email or password incorrect!";
            }else{
              this.data.changeLogtxt('Logout')
              this.route.navigate(['/user/dashboard'])
            }
          }else {
            this.isWrong=true
            this.error="Login as a Customer or a Technicien ?";
          }
        }
        
        
        
        
        
    }else{
      let User=await this.libService.getCurrentUser()
        console.log(User)
    }
    
  

}
}
