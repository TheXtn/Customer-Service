import { Component, OnInit } from '@angular/core';
import { LibService } from 'src/app/lib.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  hide :boolean =true;
  
  constructor(private libService:LibService) { 

  }
  

  ngOnInit(): void {
    document.body.className = "selector";
  }

  ngOnDestroy(){
    document.body.className="";
  }


  async login() {
  
      let login = (<HTMLInputElement>document.getElementById('login')).value
      let pass = (<HTMLInputElement>document.getElementById('pass')).value


    let csrf=await this.libService.getCsrf()
    console.log(csrf)
    let User=await this.libService.getCurrentUser()
    let NoUser=Object.keys(User).length === 0
    if (NoUser){
        console.log("there is no user logged in")
    }else{
        console.log(User)
    }
    const log=await this.libService.logUser(login,pass,csrf)
    console.log(log)
  

}
}
