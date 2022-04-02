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

  ngOnInit(): void {
    if (this.libService.isLoggedin()){this.logtxt="Logout"}else{this.logtxt="Login"}
  }
}
