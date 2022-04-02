import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LibService {

  constructor(private http:HttpClient) { }
  async getCsrf(){
    
    const res=await fetch("http://localhost:3000/api/User/auth/csrf",{credentials: 'include'})
    const data=await res.json()
    return data.csrfToken
  }
  async getCurrentUser(){
    const res=await fetch('http://localhost:3000/api/User/auth/session',{credentials: 'include'})
    const data=await res.json();
    return data
  }
  
  async isLoggedin() {
    let user =await  this.getCurrentUser();
    if (Object.keys(user).length === 0) {return false}else{return true}
  }

  async logUser(email:string,password:string,cs:string){
    const res1=await fetch('http://localhost:3000/api/User/auth/callback/credentials',{
      credentials: 'include',
      headers:{
        'Content-Type':'application/json'
      },
      method:"Post",
      body:JSON.stringify({
            csrfToken:cs,
            email: email,
            password: password
      })
    })
    const data1=await res1.json();
    

  }
  
  
 
}