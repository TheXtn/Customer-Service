export default async function handler2(req,res) {
    async function getCsrf(){
    
        const res=await fetch("http://localhost:3000/api/User/auth/csrf",{credentials: 'include'})
        const data=await res.json()
        return data.csrfToken
      }
    if (req.method!="POST"){
        res.status(302).json({
            "Error":"Request Not Allowed"
        })
        return
    }
    const {email,password}=req.body
    const csrf=await getCsrf()
    const config=
        {
            headers:{
                'Content-Type':'application/json'
              }, 
          method:"Post",
          body:JSON.stringify({
                csrfToken:csrf,
                email: "islem@admin.tn",
                password: "islem"
          })
        }
    console.log(csrf)
    const res1=await fetch('http://localhost:3000/api/User/auth/callback/credentials',config)
    const cookies = res1.headers['set-cookie']
    console.log(cookies)
    const data1=await res1.json();
    res.status(200).json(data1)
  }
  