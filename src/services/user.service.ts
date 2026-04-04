import mysql from 'mysql2/promise';
import getConnection from 'config/database';
import { Prisma } from '@prisma/client';
import { PrismaClient } from '../../generated/prisma';
import { name } from 'ejs';
import { prisma } from 'config/client';
import 'dotenv/config';





const getAllUser = async () => {
    const users = prisma.user.findMany();
    return users;


}


const handleCreateUser = async (fullName: string, email: string, address: string) => {


    const user = await prisma.user.create({
        data: {
            id: 2,
            accountType: email,
            address: address,
            fullName: fullName,
            password: "",
            username: "",



        },
    });
    return user;

}


const handleDeleteUser = async (id: string) => {
    const deleteUser = await prisma.user.delete({
        where: { id: +id }
    });
    return deleteUser;
}




const getUserById = async (id: string) => {
    const userById = await prisma.user.findUnique({
        where: { id: +id }
    })

    return userById;


}

const updateByID = async (fullName: string, email: string, address: string, id: string) => {

    const updatedUser = await prisma.user.update({
        where: { id: +id },
        data: {

            fullName: fullName,
            // email: email,
            address: address
        }

    })
    return updatedUser;


}



export { handleCreateUser, getAllUser, handleDeleteUser, getUserById, updateByID }