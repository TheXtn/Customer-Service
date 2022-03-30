import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  signin() {
    console.log('login');
  }
  discover() {
    console.log('discover');
  }
  FQ () {
    console.log('F&Q');
  }
}
