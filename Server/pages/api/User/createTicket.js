import { CreateTicket } from "../../../prisma/Ticket"
import { getSession } from "next-auth/react"
export default async function handler(req, res) {
    if (req.method!="POST"){
        res.status(302).json({
            message:"Request Not Allowed"
        })
        return
    }
    const session=await getSession({req})
    if (!session){
        res.status(403).json({
            message:"Not Logged In !"
        })
        return
    }
    const {cat,desc}=req.body
    const resa=await CreateTicket({
        catID:cat,
        authorID:session.user.userID,
        disscusions:[{authorEmail:session.user.email,content:desc}],
        closed:false
    })
    res.status(200).json(resa)
  }
  