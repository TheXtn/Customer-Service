import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Log(props){
    const router=useRouter()
    async function getcsrfdata(){
        const getcsrf=await fetch("http://localhost:3000/api/User/auth/csrf")
        const csrf=await getcsrf.json()
        return csrf.csrfToken
    }

    async function handlelogin(){
        const csrf=await getcsrfdata()
        console.log(csrf)
        let headersList = {
            "Content-Type": "application/json"
           }
           
           let bodyContent = JSON.stringify({
             "csrfToken": csrf,
             "email": "islem@admin.tn",
             "name": "admin",
             "password": "islem"
           });
        const config={
            method: "POST",
            body: bodyContent,
            headers: headersList
        }
        const res=await fetch("http://localhost:3000/api/User/auth/callback/credentials",config)
        router.push("/login")
    }
    async function handlelogout(){
        const csrf=await getcsrfdata()
        let headersList = {
            "Content-Type": "application/json"
           }
           
           let bodyContent = JSON.stringify({
             "csrfToken": csrf,
           });
        const config={
            method: "POST",
            body: bodyContent,
            headers: headersList
        }
        await fetch("http://localhost:3000/api/User/auth/signout",config)
        router.push('/login')
    }
    const session=props.session
    if (Object.entries(session).length === 0){
        return(
            <button onClick={handlelogin}>LogIn</button>
        )
        
    }
    else{
        return (
            <div>
            <h1>Welcome {session.user.name}</h1>
            <button onClick={handlelogout}>LogOut</button>
             
            
        </div>
        )
    }
   
       
           
        
    
}
export async function getServerSideProps(context) {
    const cookies = context.req.headers.cookie;
    const res=await fetch("http://localhost:3000/api/User/auth/session",{
        headers: {
            'Cookie': cookies // This is missing from request
          }
    })
    const session=await res.json()
    return {
      props: {session},
    };
  }