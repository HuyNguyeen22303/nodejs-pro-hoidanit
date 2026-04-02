import mysql from 'mysql2/promise';
import getConnection from 'config/database';






const getAllUser = async () => {
    const connection = await getConnection()
    try {
        const [results, fields] = await connection.query(
            'SELECT * FROM `user`'
        );

        return results; // results contains rows returned by server

    } catch (err) {
        return [];
    }


}


const handleCreateUser = async (fullName: string, email: string, address: string) => {

    const connection = await getConnection();
    try {
        const sql = 'INSERT INTO `user`(`name`, `email`, `address`) VALUES (?, ?, ?)';
        const values = [fullName, email, address];

        const [result, fields] = await connection.execute(sql, values);


    } catch (err) {
        console.log(err);
    }



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