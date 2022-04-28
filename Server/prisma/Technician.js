import { PrismaClient } from '@prisma/client'
import { verif } from '../lib/auth'
const prisma = new PrismaClient()
export const getTechTickets=async (TechObject)=>{
    const tech=await prisma.technician.findUnique({
        where:{
            email:TechObject.email
        }
    })
    const tickets=await prisma.ticket.findMany({
        where:{
            catID:tech.catID
        }
    })
    return tickets
}
export const CreateTech=async (TechObject) =>{
    const checkforuser=await prisma.technician.findUnique({
        where:{
            email:TechObject.email
        }
    })
    if (checkforuser){
        return {
            message:'Technician Exist'
        }
    }
    const result=await prisma.technician.create({
        data:TechObject
    })
    
    return result
}
export const LoginTech=async (TechObject) =>{
    const DatabaseUser=await prisma.technician.findUnique({
        where:{
            email:TechObject.email
        }
    })
    if (!DatabaseUser){
        return {
            message:'Email not exist'
        }
    }
    const isValid=await verif(TechObject.password,DatabaseUser.password)
    if (!isValid){
        return {
            message:'Wrong Password.'
        }
    }
    return {
        id:DatabaseUser.id,
        email:DatabaseUser.email,
        name:DatabaseUser.name,
        role:DatabaseUser.role
    }
}