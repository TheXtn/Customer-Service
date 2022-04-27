import { AnimationDriver } from '@angular/animations/browser';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,Params } from '@angular/router';
import { LibService } from 'src/app/services/lib/lib.service';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {
  opened:boolean = true
  user :string="Default";
  role :String="Client";
  icon:string ="keyboard_backspace"

  ticketID:any
  resp:any
  tickets:any[]=[];
  discussion:any[]=[];
  ticket:any
  found:boolean=false;
  constructor(private Aroute:ActivatedRoute,private libService:LibService,private route:Router) { }

  async ngOnInit(): Promise<void> {
    let id=this.Aroute.snapshot.paramMap.get("id")
    this.ticketID=id

    const isloggedin = await this.libService.isLoggedin()
    if (isloggedin == false){
      this.route.navigate(['/login'])
    }else{
    const data=await this.libService.getCurrentUser()
    this.user=data.user.name
    if (data.user.role == "User") {this.role = "Client"}else {this.role = "Technicien"}
    }

    this.resp = await this.libService.getTickets()
    this.resp.map((items:any)=>{
      this.tickets.push(items)
    })

    for (let i of this.tickets){
      if (this.ticketID == i.id){
        this.ticket=i
        this.found = true
        break
      }
    }
    this.ticket.disscusions.map((items:any)=>{this.discussion.push(items)})
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
