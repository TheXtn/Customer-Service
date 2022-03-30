import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-matbutton',
  templateUrl: './matbutton.component.html',
  styleUrls: ['./matbutton.component.css']
})
export class MatbuttonComponent implements OnInit {
  @Input() color : string ="";
  @Input() text : string ="";

  constructor() { }

  ngOnInit(): void {
  }

}
