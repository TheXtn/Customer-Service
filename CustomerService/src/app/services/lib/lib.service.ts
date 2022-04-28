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
    return res1.status
    

  }

  async logTech(email:string,password:string,cs:string){
    const res1=await fetch('http://localhost:3000/api/Technician/auth/callback/credentials',{
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
    return res1.status
  }

  async SignOut(csrf:string){
    const res1=await fetch('http://localhost:3000/api/User/auth/signout',{
      credentials: 'include',
      headers:{
        'Content-Type':'application/json'
      },
      method:"Post",
      body:JSON.stringify({
            csrfToken:csrf
      })
    })
    const data1=await res1.json();
  }
  async RegisterUser(name:string,email:string,password:string){
    const config={
      headers:{
        'Content-Type':'application/json'
      },
      method:"Post",
      body:JSON.stringify({
        "email": email,
        "name": name,
        "password": password
      })
    }
    const res=await fetch("http://localhost:3000/api/User/createUser",config)
    const data=res.json()
    return data
  }

  async CreateTicket(cat:string,desc:string){
    const res=await fetch("http://localhost:3000/api/User/createTicket",{
      credentials: 'include',
      headers:{
        'Content-Type':'application/json'
      },
      method:"Post",
      body:JSON.stringify({
        "cat": cat,
        "desc": desc
      })
    })
    const data=res.json()
    return data
  }

  async getTickets(){
    const res=await fetch('http://localhost:3000/api/User/showTickets',{credentials: 'include'})
    const data=await res.json();
    return data
  }

  async getCat(){
    const res=await fetch('http://localhost:3000/api/getCats',{credentials: 'include'})
    const data=await res.json();
    return data
  }

  async sendMessage(ticketID:string,desc:string){
    const res=await fetch("http://localhost:3000/api/User/updateTicket",{
      credentials: 'include',
      headers:{
        'Content-Type':'application/json'
      },
      method:"Post",
      body:JSON.stringify({
        "ticketID": ticketID,
        "desc": desc
      })
    })
    const data=res.json()
    return data
  }
  async CloseTicket(ticketID:string){
    const res=await fetch("http://localhost:3000/api/User/closeTicket",{
      credentials: 'include',
      headers:{
        'Content-Type':'application/json'
      },
      method:"Post",
      body:JSON.stringify({
        "ticketID": ticketID
      })
    })
    const data=res.json()
    return data
  }
  
 
}
