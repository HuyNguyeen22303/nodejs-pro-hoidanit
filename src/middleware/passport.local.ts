import { prisma } from "config/client";
import { name } from "ejs";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserRoleById } from "services/client/auth.service";

import { comparePassword } from "services/user.service";
import { callbackify } from "util";


const configPassPortLocal = () => {
    passport.use(new LocalStrategy({
        passReqToCallback: true

    }, async function verify(req, username, password, callback) {
        const { session } = req as any;
        if (session?.messages?.length) {
            session.messages = [];
        }
        console.log("Check user and password", username, password)
        // check user exist in database
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })

        if (!user) {
            // throw Error
            // throw new Error(`Username: ${username} is not found`);
            return callback(null, false, { message: `Username/password invalid` });
        }


        // compare password
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            // throw new Error(`Invalid password`);
            return callback(null, false, { message: `Username/password invalid` });

        }


        return callback(null, user);

    }));

    passport.serializeUser(function (user: any, callback) { //data trả về cho client , không lưu thông tin nhạy cảm hiện thị cho người dùng 

        callback(null, { id: user.id, username: user.username });

    });

    passport.deserializeUser(async function (user: any, callback) { // 
        const { id, username } = user;
        //query to database = id
        const userInDB = await getUserRoleById(id)

        return callback(null, { ...userInDB }); // ...userInDB là copy full tt người dùng vào ...userInDB

    });
}


export default configPassPortLocal;