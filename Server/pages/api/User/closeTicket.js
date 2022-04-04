import { CreateTicket, UpdateTicket, UserCloseTicket } from "../../../prisma/Ticket"
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
    const {ticketID}=req.body
    const resa=await UserCloseTicket(ticketID,session.user.userID)
    res.status(200).json(resa)
}