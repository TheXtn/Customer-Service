import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export const CreateTicket=async (TicketObject)=>{
    const res=await prisma.ticket.create({
            data:TicketObject
    }) 
    return res
}
export const UpdateTicket=async (TicketObject)=>{
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
    const ticket=await prisma.ticket.findUnique({
        where:{
            id:ticketID
        },
        
    })
    if (ticket.authorID!==authorID){
        return {
            message:"You are not the author"
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
    const res=await prisma.user.findUnique({
        where:{
            id:UserObject.id,
            email:UserObject.email
        },
        include: {
            tickets: true,
          },
    })
    return res
}