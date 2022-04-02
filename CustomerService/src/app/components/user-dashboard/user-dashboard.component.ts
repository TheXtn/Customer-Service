import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LibService } from 'src/app/services/lib/lib.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(private route:Router,private libService:LibService) { }

  async ngOnInit(): Promise<void> {
    const isloggedin = await this.libService.isLoggedin()
    if (isloggedin == false){
      this.route.navigate(['/login'])
    }
  }

}
