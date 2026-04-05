import { prisma } from "./client";

const initDatabase = async () => {
    const countUser = await prisma.user.count();
    const countRole = await prisma.role.count();
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
    } else if (countRole === 0) {
        await prisma.role.createMany({

            data: [
                {
                    name: "ADMIN",
                    description: "Admin thì full quyền"

                },

                {
                    name: "USER",
                    description: "User thông thường"

                },




            ]
        })
    } else {
        console.log(">>>>> Already init data....");
    }

}


export default initDatabase;