import { Component, OnInit } from '@angular/core';
import { LibService } from './../../services/lib/lib.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  hide :boolean =true;
  
  constructor(private libService:LibService,private route:Router) { 

  }
  

  ngOnInit(): void {
    document.body.className = "selector";
    if (this.libService.isLoggedin()){
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

    if (this.libService.isLoggedin()){
        console.log("there is no user logged in")
        const log=await this.libService.logUser(login,pass,csrf)
        console.log(log)
    }else{
      let User=await this.libService.getCurrentUser()
        console.log(User)
    }
    
  

}
}
