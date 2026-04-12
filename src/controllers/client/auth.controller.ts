import { Request, Response } from "express";

const getLoginPage = async (req: Request, res: Response) => {

    res.render("client/user/login.ejs");
}


const getRegisterPage = async (req: Request, res: Response) => {

    res.render("client/user/register.ejs");
}

export {
    getLoginPage, getRegisterPage
}