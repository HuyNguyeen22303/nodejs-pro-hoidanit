import { prisma } from "config/client";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import { comparePassword } from "services/user.service";
import { callbackify } from "util";


const configPassPortLocal = () => {
    passport.use(new LocalStrategy(async function verify(username, password, callback) {
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
            return callback(null, false, { message: `Username: ${username} is not found` });
        }


        // compare password
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            // throw new Error(`Invalid password`);
            return callback(null, false, { message: `Invalid password` });

        }


        return callback(null, user);

    }));

    passport.serializeUser(function (user: any, cb) {
        process.nextTick(function () {
            cb(null, { id: user.id, username: user.username });
        });
    });

    passport.deserializeUser(function (user: any, cb) {
        process.nextTick(function () {
            return cb(null, user);
        });
    });
}


export default configPassPortLocal;