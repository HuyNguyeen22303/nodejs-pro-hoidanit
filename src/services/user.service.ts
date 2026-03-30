import mysql from 'mysql2/promise';
import getConnection from '../config/database';


const handleCreateUser = (fullName: string, email: string, address: string) => {


    // insert to database




    // return result
    console.log("insert a user");
}



const getAllUser = async () => {
    const connection = await getConnection()
    try {
        const [results, fields] = await connection.query(
            'SELECT * FROM `users`'
        );

        return results; // results contains rows returned by server

    } catch (err) {
        return [];
    }


}



export { handleCreateUser, getAllUser }