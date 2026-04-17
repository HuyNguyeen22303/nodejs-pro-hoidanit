import { Request, Response, NextFunction } from "express";



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
    if (req.path.startsWith("/admin")) {
        const user = req.user;
        if (user?.role?.name === "ADMIN") {
            return next();
        }
        return res.render("status/403.ejs"); // client or guest ko có quyền truy cập vào trang admin 


    }


    next(); //client routes


}







export { isLogin, isAdmin }    