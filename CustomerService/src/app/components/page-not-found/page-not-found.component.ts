import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
  @Input() text1:string="404"
  @Input() text2:string="Page not Found"
  @Input() homeBTN:boolean=true

  constructor(private route:Router) { }

  ngOnInit(): void {
  }
  

  redirectHOME(){
    this.route.navigate(["/"])
  }
}
