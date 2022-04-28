import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LibService } from 'src/app/services/lib/lib.service';

@Component({
  selector: 'app-crt-ticket',
  templateUrl: './crt-ticket.component.html',
  styleUrls: ['./crt-ticket.component.css']
})
export class CrtTicketComponent implements OnInit {

  opened:boolean=true
  icon:string="keyboard_backspace"

  user: string="Default"
  role:String="Client"
  length:number[]=[];
  Category:string=''
  Cat:any[]=[];
  Cats:any[]=[];
  catNames:string[]=[];
  catIDS:string[]=[];

  constructor(private route:Router,private libService:LibService) { }

  async ngOnInit(): Promise<void> {
    const isloggedin = await this.libService.isLoggedin()
    if (isloggedin == false){
      this.route.navigate(['/login'])
    }else{
    const data=await this.libService.getCurrentUser()
    this.user=data.user.name
    if (data.user.role == "User") {this.role = "Client"}else {this.role = "Technicien"}
    }

    this.Cat = await this.libService.getCat()
    this.Cat.map((items)=>{this.Cats.push(items)})
    let i=0
    for (let c of this.Cats){
      this.catNames.push(c.name)
      this.catIDS.push(c.id)
      this.length.push(i)
      i++
    }
    console.log(this.length)

  }

  toggleSide(){
    this.opened = !this.opened
    if (this.opened == true) {
      this.icon = "keyboard_backspace"
    }else{
      this.icon = "clear_all"
    }
  }

  async submit(){
    if (this.Category == ""){
      alert("Please choose a category.")
    }else{
      let desc = (<HTMLInputElement>document.getElementById('Desc')).value;
      const reg = await this.libService.CreateTicket(this.Category,desc);
      this.route.navigate(['/user/tickets'])
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
    this.route.navigate(["/user/create"])
  }

}
