import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const getAllCats=async()=>{
    const res=await prisma.categorie.findMany({
        select:{
            id:true,
            name:true
        }
    })
    return res
}