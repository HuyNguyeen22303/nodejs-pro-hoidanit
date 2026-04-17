import { Request, Response, NextFunction } from "express";
import { nextTick } from "process";


const isLogin = (req: Request, res: Response, next: NextFunction) => {
    const isAuthentication = req.isAuthenticated();
    if (isAuthentication) {
        res.redirect("/");
        return;
    } else {
        next();
    }
}

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (user?.role?.name === "ADMIN") {
        next();
    } else {
        res.redirect("/");
    }

}







export { isLogin, isAdmin }    