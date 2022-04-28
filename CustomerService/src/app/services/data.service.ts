import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject<string>("Login");
  currentMessage =this.messageSource.asObservable();
  constructor() { }
  
  changeLogtxt(txt:string) {
    
    this.messageSource.next(txt);
  }
}
