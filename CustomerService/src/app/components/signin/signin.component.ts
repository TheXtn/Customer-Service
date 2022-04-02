import { Component, OnInit, } from '@angular/core';
import { LibService } from './../../services/lib/lib.service';
import {Router} from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { DataService } from 'src/app/services/data.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  hide :boolean =true;
  logtxt : string="";
  constructor(private data:DataService,private libService:LibService,private route:Router,private head:HeaderComponent) { 

  }
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  
  async ngOnInit(): Promise<void> {
    document.body.className = "selector";
    this.data.currentMessage.subscribe(message => this.logtxt = message);
    const isloggedin = await this.libService.isLoggedin()
    if (isloggedin){
      this.route.navigate(['/user/dashboard'])
    }
  }

  ngOnDestroy(){
    document.body.className="";
  }


  async login() {
  
      let login = (<HTMLInputElement>document.getElementById('login')).value
      let pass = (<HTMLInputElement>document.getElementById('pass')).value


    let csrf=await this.libService.getCsrf()
    const isloggedin = await this.libService.isLoggedin()
    if (isloggedin == false){
        console.log("there is no user logged in")
        const log=await this.libService.logUser(login,pass,csrf)
        if (log==404){
          alert("Email or password incorrect!")
        }else{
          this.data.changeLogtxt('Logout')
          this.route.navigate(['/user/dashboard'])
        }
        
        
        
    }else{
      let User=await this.libService.getCurrentUser()
        console.log(User)
    }
    
  

}
}
