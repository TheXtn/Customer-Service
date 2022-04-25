import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LibService } from 'src/app/services/lib/lib.service';
import {Chart} from 'node_modules/chart.js'
import {registerables} from 'chart.js'; 

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  //SideBar
  user :string="Default";
  role :string="Client"
  opened:boolean = true
  icon:string ="keyboard_backspace"
  tickets:any;

  //Propre dahsboard
  openTicketsCount:string = "N/A";
  closedTicketsCount:string = "N/A";

  constructor(private route:Router,private libService:LibService) { }

  async ngOnInit(): Promise<void> {
    Chart.register(...registerables);
    var data = [{
      data: [35, 65],
      labels: ["Open Tickets", "Closed Tickets"],
      backgroundColor: [
          "rgba(255, 0, 0, 0.8)", //red
          "rgba(9, 133, 5, 0.8)", //green
      ],
      borderColor: "#fff"
  }];
  
  var pieChart = new Chart('pieChart', {
      type: 'pie',
      data: {
          datasets: data
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
      }
  });
    const isloggedin = await this.libService.isLoggedin()
    if (isloggedin == false){
      this.route.navigate(['/login'])
    }else{
    const data=await this.libService.getCurrentUser()
    this.user=data.user.name
    if (data.user.role == "User") {this.role = "Client"}
    }

    const resp=await this.libService.getTickets()
    resp.subscribe((data:any)=>this.tickets)

  }
  toggleSide(){
    this.opened = !this.opened
    if (this.opened == true) {
      this.icon = "keyboard_backspace"
    }else{
      this.icon = "clear_all"
    }
  }
  redirectACC() {
    this.route.navigate(["/user/profile"])
  }
  redirectTICK() {
    this.route.navigate(["/user/tickets"])
  }

  redirectDASH() {
    this.route.navigate(["/user/dashboard"])
  }

}
