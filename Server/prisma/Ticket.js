import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export const CreateTicket=async (TicketObject)=>{
    const res=await prisma.ticket.create({
            data:TicketObject
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