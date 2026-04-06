import { hashPassword } from "services/user.service";
import { prisma } from "./client";
import { ACCOUNT_TYPE } from "config/constants";

const initDatabase = async () => {
    const countUser = await prisma.user.count();
    const countRole = await prisma.role.count();
    if (countRole === 0) {
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
    }
    if (countUser === 0) {
        const defaultPassword = await hashPassword("123456");
        const adminRole = await prisma.role.findFirst({
            where: { name: "ADMIN" }
        })
        if (adminRole)
            await prisma.user.createMany({

                data: [
                    {
                        fullName: "Admin",
                        username: "Admin@gmail.com",
                        accountType: ACCOUNT_TYPE.SYSTEM,
                        password: defaultPassword,
                        address: "Ha Noi",
                        roleId: adminRole.id
                    },

                    {
                        fullName: "HoiDanit",
                        username: "Hoidanit@gmail.com",
                        accountType: ACCOUNT_TYPE.SYSTEM,
                        address: "Ha noi",
                        password: defaultPassword,
                        roleId: adminRole.id
                    }


                ]
            })
    } if (countRole !== 0 && countUser !== 0) {
        console.log(">>>>> Already init data....");
    }

}


export default initDatabase;