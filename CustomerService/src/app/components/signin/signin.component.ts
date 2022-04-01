import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  hide :boolean =true;
  
  constructor() { }


  ngOnInit(): void {
    document.body.className = "selector";
  }

  ngOnDestroy(){
    document.body.className="";
  }


  async login() {
    var credentials =JSON.stringify({
      login : (<HTMLInputElement>document.getElementById('login')).value,
      pass : (<HTMLInputElement>document.getElementById('pass')).value,
    });
    console.log(credentials);
    const res=await fetch('http://localhost:3000/api/User/auth/session')
    const data=await res.json();
    console.log(data);
  }

}
