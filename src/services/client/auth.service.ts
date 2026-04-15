import { prisma } from "config/client"
import { ACCOUNT_TYPE } from "config/constants";
import { comparePassword, hashPassword } from "services/user.service";


const isEmailExist = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            username: email
        }
    })
    if (user) {
        return true;
    }

    return false;
}


const registerNewUser = async (fullName: string, email: string, password: string) => {
    const newPassword = await hashPassword(password);
    const userRole = await prisma.role.findUnique({
        where: {
            name: "USER"
        }
    })
    if (userRole) {
        await prisma.user.create({
            data: {
                fullName: fullName,
                username: email,
                password: newPassword,
                accountType: ACCOUNT_TYPE.SYSTEM,
                roleId: userRole.id
            }
        })
    } else {
        throw new Error("User Role không tồn tại");
    }
}


const handleLogin = async (username: string, password: string, callback: any) => {
    // check user exist in database
    const user = await prisma.user.findUnique({
        where: {
            username: username
        }
    })

    if (!user) {
        // throw Error
        // throw new Error(`Username: ${username} is not found`);
        return callback(null, false, { message: `Username: ${username} is not found` });
    }


    // compare password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        // throw new Error(`Invalid password`);
        return callback(null, false, { message: `Invalid password` });

    }


    return callback(null, user);

}



export { isEmailExist, registerNewUser, handleLogin }