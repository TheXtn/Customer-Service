import { CreateTicket, UpdateTicket } from "../../../prisma/Ticket"
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
    const {ticketID,desc}=req.body
    const resa=await UpdateTicket({
        ticketID:ticketID,
        desc:desc,
        authorEmail:session.user.email
    })
    res.status(200).json(resa)
}