import { Component, OnInit } from '@angular/core';
import { LibService } from './../../services/lib/lib.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  logtxt : string ='';
  constructor(private libService:LibService,private route:Router) { }

  async ngOnInit(): Promise<void> {
    const isloggedin = await this.libService.isLoggedin()
    if (isloggedin){this.logtxt="Logout"}else{this.logtxt="Login"}
  }

  async redirect() {
    if(this.logtxt == "Login") {
      this.route.navigate(['/login'])
    } else {
      let csrf=await this.libService.getCsrf()
      
      const out= await this.libService.SignOut(csrf)
      this.route.navigate(['/'])
      this.logtxt="Login"
     
    }
  }
}
