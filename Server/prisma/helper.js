import { PrismaClient } from '@prisma/client'
import { verif } from '../lib/auth'
const prisma = new PrismaClient()
export const getRole=async (ID) =>{
    const checkfortech=await prisma.technician.findUnique({
        where:{
            id:ID
        }
    })
    if (checkfortech){
        return checkfortech.role
    }
    else{
        var checkforuser=await prisma.user.findUnique({
            where:{
                id:ID
            }
        })
        return checkforuser.role
    }
    return ""
}