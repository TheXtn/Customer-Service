import { PrismaClient } from '@prisma/client'
import { verif } from '../lib/auth'
const prisma = new PrismaClient()
export const CreateUser=async (UserObject) =>{
    const checkforuser=await prisma.user.findUnique({
        where:{
            email:UserObject.email
        }
    })
    if (checkforuser){
        return {
            message:'User Exist'
        }
    }
    const result=await prisma.user.create({
        data:UserObject
    })
    
    return result
}
export const LoginUser=async (UserObject) =>{
    const DatabaseUser=await prisma.user.findUnique({
        where:{
            email:UserObject.email
        }
    })
    if (!DatabaseUser){
        return {
            message:'Email not exist'
        }
    }
    const isValid=await verif(UserObject.password,DatabaseUser.password)
    if (!isValid){
        return {
            message:'Wrong Password.'
        }
    }
    return {
        id:DatabaseUser.id,
        email:DatabaseUser.email,
        name:DatabaseUser.name
    }
}