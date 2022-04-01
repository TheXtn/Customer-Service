import { CreateTicket, ShowAllUserTickets } from "../../prisma/Ticket"
import { getSession } from "next-auth/react"
export default async function handler(req, res) {
    if (req.method!="GET"){
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
    const result=await ShowAllUserTickets(session.user)
    res.status(200).json(result)
  
  }
  