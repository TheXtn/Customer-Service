import {hashpassword} from "../../../lib/auth"
import { CreateTech } from "../../../prisma/Technician"

export default async function handler(req, res) {
    if (req.method!="POST"){
        res.status(302).json({
            "Error":"Request Not Allowed"
        })
        return
    }
    const {name,email,password,cat}=req.body
    const hashedpwd=await hashpassword(password)
    const resa=await CreateTech({
        name:name,
        email:email,
        password:hashedpwd,
        catID:"624578c5a3adb4bbc4cb8cd9",
        role:"Tech"
    })
    res.status(200).json(resa)
  }
  