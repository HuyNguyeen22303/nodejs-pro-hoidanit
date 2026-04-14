import { Request, Response } from "express";
import { RegisterSchema, TRegisterSchema } from "../../validation/register.schema";
import { registerNewUser } from "services/client/auth.service";

const getLoginPage = async (req: Request, res: Response) => {

    res.render("client/user/login.ejs");
}


const getRegisterPage = async (req: Request, res: Response) => {
    const errors: [] = [];
    const oldData = {
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""

    }
    return res.render('client/user/register', {
        errors, oldData
    });


}



const postRegisterPage = async (req: Request, res: Response) => {
    const { fullName, email, password, confirmPassword } = req.body as TRegisterSchema;


    const validate = await RegisterSchema.safeParseAsync(req.body);
    if (!validate.success) {
        // error
        const errorZod = validate.error?.issues;
        const errors = errorZod?.map(item => `${item.message} (${item.path})`);
        const oldData = {
            fullName,
            email,
            password,
            confirmPassword,
        }
        return res.render('client/user/register', {
            errors, oldData

        });
    }








    // success

    await registerNewUser(fullName, email, password);
    res.redirect("/login")


}



export {
    getLoginPage, getRegisterPage, postRegisterPage
}