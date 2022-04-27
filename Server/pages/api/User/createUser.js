import { CreateUser } from "../../../prisma/User"
import {hashpassword} from "../../../lib/auth"

export default async function handler(req, res) {
    if (req.method!="POST"){
        res.status(302).json({
            "Error":"Request Not Allowed"
        })
        return
    }
    const {name,email,password}=req.body
    const hashedpwd=await hashpassword(password)
    const resa=await CreateUser({
        name:name,
        email:email,
        password:hashedpwd,
        role:"User"
    })
    res.status(200).json(resa)
  }
  