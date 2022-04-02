import { Component, OnInit } from '@angular/core';
import { LibService } from './../../services/lib/lib.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  logtxt : string ='';
  constructor(private libService:LibService) { }

  async ngOnInit(): Promise<void> {
    const isloggedin = await this.libService.isLoggedin()
    if (isloggedin){this.logtxt="Logout"}else{this.logtxt="Login"}
  }
}
