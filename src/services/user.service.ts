import mysql from 'mysql2/promise';
import getConnection from 'config/database';


const handleCreateUser = async (fullName: string, email: string, address: string) => {

    const connection = await getConnection();
    try {
        const sql = 'INSERT INTO `users`(`name`, `email`, `address`) VALUES (?, ?, ?)';
        const values = [fullName, email, address];

        const [result, fields] = await connection.execute(sql, values);


    } catch (err) {
        console.log(err);
    }



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