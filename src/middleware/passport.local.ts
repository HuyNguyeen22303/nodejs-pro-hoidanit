import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { handleLogin } from "services/client/auth.service";
import { callbackify } from "util";


const configPassPortLocal = () => {
    passport.use(new LocalStrategy(function verify(username, password, callback) {
        console.log("Check user and password", username, password)
        return handleLogin(username, password, callback);
    }));
}


export default configPassPortLocal;