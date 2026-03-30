import mysql from 'mysql2/promise';


const handleCreateUser = (fullName: string, email: string, address: string) => {


    // insert to database
    mysql.createConnection({
        host: 'localhost',

        port: 3307,
        user: 'root',
        database: 'hoidanit',

    });



    // return result
    console.log("insert a user");
}



export { handleCreateUser }