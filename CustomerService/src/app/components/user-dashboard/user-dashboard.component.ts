import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LibService } from 'src/app/services/lib/lib.service';
import {Chart} from 'node_modules/chart.js'
import {registerables} from 'chart.js'; 
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { OverlayDialogService } from 'src/app/services/overlay-dialog.service';
import { MatOverlayComponent } from '../mat-overlay/mat-overlay.component';

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
  tickets:any[]=[];
  Cats:any[]=[];  
  ticketIDS:string[]=[];
  Desc:any[]=[];
  resp:any[]=[];
  resp1:any[]=[];
  desc:string[]=[];
  cat:string[]=[];
  closed:boolean[]=[];
  length:number[]=[];
  notLoading$:Observable<boolean>=of(true)

  //Propre dahsboard
  openTicketsCount:string = "N/A";
  closedTicketsCount:string = "N/A";
  dataOpen:number=50;
  dataClosed:number=50;

  private dialogOverlay:OverlayDialogService ;

  constructor(private route:Router,private libService:LibService,private dialog:MatDialog) { }

  async ngOnInit(): Promise<void> {
    this.notLoading$=of(false)
    const isloggedin = await this.libService.isLoggedin()
    if (isloggedin == false){
      this.route.navigate(['/login'])
    }else{
    const data=await this.libService.getCurrentUser()
    this.user=data.user.name
    console.log(data)
    if (data.user.role == "User") {this.role = "Client"} else {this.role = "Technicien"}
    }
    if (this.role == "Client"){this.resp=await this.libService.getTickets()}
    else {this.resp=await this.libService.getTicketsTech()}
    this.resp1=await this.libService.getCat()
    this.resp.map((items)=>{
      this.tickets.push(items)
    })
    this.resp1.map((items)=>{
      this.Cats.push(items)
    })
    let i=0;
    let j=0;
    for (let t of this.tickets){
      if (j<=4){
        this.length.push(i)
        i++
        if (t.closed==false){
          j++
        }        
      }
      for (let c of this.Cats){
        if(t.catID == c.id) {
          this.cat.push(c.name)
        }
      }
      this.ticketIDS.push(t.id)
      this.desc.push(t.disscusions[0].content)
      this.closed.push(t.closed)
    }
    console.log(this.closed)
    this.notLoading$=of(true)
    let closedCount = 0;
    let openCount=0;
    for (let i of this.closed){if (i==true){closedCount++}else[openCount++]}
    this.dataClosed = ((closedCount/this.closed.length)*100)
    this.dataOpen = ((openCount/this.closed.length)*100)
    this.closedTicketsCount = closedCount.toString()
    this.openTicketsCount = openCount.toString()

    Chart.register(...registerables);
    var data = [{
      data: [this.dataOpen, this.dataClosed],
      labels: ["Closed Tickets", "Open Tickets"],
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

  reply(ID:string){
    this.route.navigate(['/user/discussion',ID])
  }
  close(ID:string){
      this.dialog.open(MatOverlayComponent,{
        width: '300px',
        disableClose: true,
        data:{TID:ID}
      })
  }

}
