import mysql from 'mysql2/promise';
import getConnection from 'config/database';






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


const handleDeleteUser = async (id) => {
    const connection = await getConnection();
    try {
        const sql = 'DELETE FROM `users` WHERE `id` = ?';
        const values = [id];

        const [result, fields] = await connection.execute(sql, values);


        return result;
    } catch (err) {
        return err;
    }
}




const getUserById = async (id) => {
    const connection = await getConnection()
    try {
        const sql = 'SELECT * FROM `users` WHERE `id` = ?';
        const values = [id];

        const [result, fields] = await connection.execute(sql, values);

        return result[0];
    } catch (err) {
        return [];
    }
}



export { handleCreateUser, getAllUser, handleDeleteUser, getUserById }