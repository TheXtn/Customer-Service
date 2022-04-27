import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryScale } from 'chart.js';
import { LibService } from 'src/app/services/lib/lib.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  user :string="Default";
  role :String="Client";
  cat:string=""
  Cat:string[]=[];
  length:number[]=[];
  desc:string=""
  Desc:string[]=[];
  opened:boolean = true
  icon:string ="keyboard_backspace"
  tickets:any[]=[];

  constructor(private route:Router,private libService:LibService) {
   }

  async ngOnInit(): Promise<void> {
    const isloggedin = await this.libService.isLoggedin()
    if (isloggedin == false){
      this.route.navigate(['/login'])
    }else{
    const data=await this.libService.getCurrentUser()
    this.user=data.user.name
    if (data.user.role == "User") {this.role = "Client"}
    }
    this.tickets=await this.libService.getTickets()
    const cat=await this.libService.getCat()
    console.log(this.tickets)
    console.log(cat)
    for (let t=0;t<this.tickets.length+1;t++){
      for (let c=0;c<cat.length+1;c++){
        if (this.tickets[t].catID == cat[c].id) {
          this.Cat.push(cat[c].name)
          break;
        }
      }
      this.Desc.push(this.tickets[t].disscusions[0].content)
      console.log(this.desc)
    }
    this.length = Array(5).map((x,i)=>i);
    
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

  redirectCT() {
    this.route.navigate(["/user/create-ticket"])
  }


}
