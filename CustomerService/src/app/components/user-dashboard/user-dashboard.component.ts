import { Component, OnInit } from '@angular/core';
import { LibService } from 'src/app/services/lib/lib.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  User : Object={};
  constructor(private libService:LibService) { }

  async ngOnInit(): Promise<void> {
    const data=await this.libService.getCurrentUser
  }

}
