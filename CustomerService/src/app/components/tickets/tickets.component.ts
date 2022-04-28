import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LibService } from 'src/app/services/lib/lib.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  user :string="Default";
  role :String="Client";
  length:number[]=[];
  desc:string[]=[];
  cat:string[]=[];
  ticketIDS:string[]=[];
  closed:boolean[]=[];
  opened:boolean = true
  icon:string ="keyboard_backspace"
  tickets:any[]=[];
  Cats:any[]=[];
  Desc:any[]=[];
  resp:any[]=[];
  resp1:any[]=[];
  notLoading$:Observable<boolean>=of(true)

  constructor(private route:Router,private libService:LibService) {
   }

  async ngOnInit(): Promise<void> {
    this.notLoading$=of(false)
    const isloggedin = await this.libService.isLoggedin()
    if (isloggedin == false){
      this.route.navigate(['/login'])
    }else{
    const data=await this.libService.getCurrentUser()
    this.user=data.user.name
    if (data.user.role == "User") {this.role = "Client"}else {this.role = "Technicien"}
    }
    this.resp=await this.libService.getTickets()
    this.resp1=await this.libService.getCat()
    this.resp.map((items)=>{
      this.tickets.push(items)
    })
    this.resp1.map((items)=>{
      this.Cats.push(items)
    })
    let i=0;
    for (let t of this.tickets){
      this.length.push(i)
      i++
      for (let c of this.Cats){
        if(t.catID == c.id) {
          this.cat.push(c.name)
        }
      }
      this.ticketIDS.push(t.id)
      this.desc.push(t.disscusions[0].content)
      this.closed.push(t.closed)
    }
    console.log(this.tickets)
    this.notLoading$=of(true)
    
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

  reply(catID:string){
    this.route.navigate(['/user/discussion',catID])
  }


}
