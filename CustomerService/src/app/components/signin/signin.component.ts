import { Component, OnInit } from '@angular/core';
import { LibService } from './../../services/lib/lib.service';
import {Router} from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  hide :boolean =true;
  
  constructor(private libService:LibService,private route:Router,private head:HeaderComponent) { 

  }
  
  async ngOnInit(): Promise<void> {
    document.body.className = "selector";
    const isloggedin = await this.libService.isLoggedin()
    if (isloggedin){
      this.route.navigate(['/user/:id/dashboard'])
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
        this.head.logtxt="Logout"
        this.route.navigate(['/user/dashboard'])
        
    }else{
      let User=await this.libService.getCurrentUser()
        console.log(User)
    }
    
  

}
}
