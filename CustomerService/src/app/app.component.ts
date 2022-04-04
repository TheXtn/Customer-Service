import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'CustomerService';
  sidebar :string ='';
  logtxt : string ='';
  constructor(private head:HeaderComponent) { }

  ngOnInit(): void{
    if (this.head.logtxt == 'Login'){
      this.sidebar='sidebar works!'
    }else{this.sidebar=''}
  }


}
