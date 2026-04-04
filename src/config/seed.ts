import { prisma } from "./client";

const initDatabase = async () => {
    const countUser = await prisma.user.count();
    if (countUser === 0) {
        await prisma.user.createMany({

            data: [
                {
                    fullName: "Eric",
                    username: "Hoidanit",
                    accountType: "system",
                    address: "Ha noi",
                    password: "12345"

                },

                {
                    fullName: "Eric",
                    username: "Hoidanit",
                    accountType: "system",
                    address: "Ha noi",
                    password: "12345"

                },

                {
                    fullName: "Eric",
                    username: "Hoidanit",
                    accountType: "system",
                    address: "Ha noi",
                    password: "12345"

                },


            ]
        })
    } else {
        console.log(">>>>> Already init data....");
    }

}


export default initDatabase;