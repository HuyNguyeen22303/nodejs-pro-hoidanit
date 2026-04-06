import mysql from 'mysql2/promise';
import getConnection from 'config/database';
import { Prisma } from '@prisma/client';
import { PrismaClient } from '../../generated/prisma';
import { name } from 'ejs';
import { prisma } from 'config/client';
import 'dotenv/config';
import { ACCOUNT_TYPE } from 'config/constants';





const getAllUser = async () => {
    const users = prisma.user.findMany();
    return users;


}


const getAllRole = async () => {
    const roles = prisma.role.findMany();
    return roles;


}

const handleCreateUser = async (username: string, password: string, fullName: string, address: string, phone: string, accountType: string, avatar: string) => {


    const newUser = await prisma.user.create({
        data: {

            username: username,
            password: "123456",
            fullName: fullName,
            address: address,
            phone: phone,
            accountType: ACCOUNT_TYPE.SYSTEM,
            avatar: avatar


        },
    });
    return newUser;

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



export { handleCreateUser, getAllUser, handleDeleteUser, getUserById, updateByID, getAllRole }