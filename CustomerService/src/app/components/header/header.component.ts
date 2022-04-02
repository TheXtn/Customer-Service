import { Component, OnInit } from '@angular/core';
import { LibService } from './../../services/lib/lib.service';
import {Data, Router} from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  logtxt : string ='';
  constructor(private libService:LibService,private route:Router,private data:DataService) { }

  async ngOnInit(): Promise<void> {
    this.data.currentMessage.subscribe(message => this.logtxt = message);
    const isloggedin = await this.libService.isLoggedin()
    if (isloggedin){this.data.changeLogtxt('Logout')}else{this.data.changeLogtxt('Login')}
  }

  async redirect() {
    if(this.logtxt == "Login") {
      this.route.navigate(['/login'])
    } else {
      let csrf=await this.libService.getCsrf()
      
      const out= await this.libService.SignOut(csrf)
      this.route.navigate(['/'])
      this.data.changeLogtxt('Login')
     
    }
  }
}
