import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject<string>("Default message");
  currentMessage =this.messageSource.asObservable();
  constructor() { }
  
  changeLogtxt(txt:string) {
    
    this.messageSource.next(txt);
  }
}
