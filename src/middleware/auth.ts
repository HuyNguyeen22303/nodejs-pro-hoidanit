import { Request, Response, NextFunction } from "express";


const isLogin = (req: Request, res: Response, next: NextFunction) => {
    const isAuthentication = req.isAuthenticated();
    if (isAuthentication) {
        res.redirect("/");
    } else {
        next();
    }
}

const isAdmin = (req: Request, res: Response) => {
    const user = req.user as any;
    if (user?.role?.name === "ADMIN") {
        res.redirect("/admin");
    } else {
        res.redirect("/");
    }

}







export { isLogin, isAdmin }