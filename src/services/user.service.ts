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
            name: fullName,
            email: email,
            address: address
        },
    });
    return user;

}


const handleDeleteUser = async (id: string) => {
    const connection = await getConnection();
    try {
        const sql = 'DELETE FROM `user` WHERE `id` = ?';
        const values = [id];

        const [result, fields] = await connection.execute(sql, values);


        return result;
    } catch (err) {
        return err;
    }
}




const getUserById = async (id: string) => {
    const connection = await getConnection()
    try {
        const sql = 'SELECT * FROM `user` WHERE `id` = ?';
        const values = [id];

        const [result, fields] = await connection.execute(sql, values) as any[];;

        return result[0];
    } catch (err) {
        return [];
    }
}

const editUserById = async (fullName: string, email: string, address: string, id: string) => {
    const connection = await getConnection()
    try {
        const sql = 'UPDATE `user` SET `name` = ?, `email` = ? , `address` = ? WHERE `id` = ?';
        const values = [fullName, email, address, id];

        const [result, fields] = await connection.execute(sql, values);

        console.log(result);
        console.log(fields);
    } catch (err) {
        console.log(err);
    }
}



export { handleCreateUser, getAllUser, handleDeleteUser, getUserById, editUserById }