import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LibService } from 'src/app/services/lib/lib.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user :string="Default";
  mail:string="Default@mail.tn"
  role:string="Client"
  opened:boolean = true
  icon:string ="keyboard_backspace"

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
    this.mail=data.user.email
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
  updateINFO() {
    
  }

  updatePASS() {

  }
}
