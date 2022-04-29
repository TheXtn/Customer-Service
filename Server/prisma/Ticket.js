import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export const CheckForClosedTicket=async (ticketID)=>{
    const res=await prisma.ticket.findUnique({
        where:{
            id:ticketID
        }
    })
    return res.closed

}
export const CreateTicket=async (TicketObject)=>{
    const res=await prisma.ticket.create({
            data:TicketObject
    }) 
    return res
}
export const UpdateTicket=async (TicketObject)=>{
    if (await CheckForClosedTicket(TicketObject.ticketID)){
        return{
            Error:"Ticket is closed !"
        }
    }
    const ticketdiscs=await prisma.ticket.findUnique({
        where:{
            id:TicketObject.ticketID
        },
        select:{
            disscusions:true,
        }
    })
    const res=await prisma.ticket.update({
        where:{
            id:TicketObject.ticketID
        },
        data:{
            disscusions:{
                set:[...ticketdiscs.disscusions,{authorEmail:TicketObject.authorEmail,content:TicketObject.desc}]
            }
        }
    })
    return res
}
export const UserCloseTicket=async(ticketID,authorID)=>{
    if (await CheckForClosedTicket(ticketID)){
        return{
            Error:"Ticket Already closed !"
        }
    }
  
    const res=await prisma.ticket.update({
        where:{
            id:ticketID
        },
        data:{
            closed:true
        }
    })
    return res
}
export const ShowAllUserTickets=async(UserObject)=>{
    const res=await prisma.ticket.findMany({
        where:{
            authorID:UserObject.userID,
        },
    })
    return res
}