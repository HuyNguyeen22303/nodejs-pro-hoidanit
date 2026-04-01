import getConnection from "config/database";
import { Request, Response } from "express";
import { getAllUser, handleCreateUser, handleDeleteUser, getUserById, editUserById } from "services/user.service";



const getHomePage = async (req: Request, res: Response) => {
    const users = await getAllUser();

    return res.render('home.ejs', { users: users });
}


const getCreateUserPage = (req: Request, res: Response) => {

    return res.render('create-user.ejs')
}

const postCreateUser = async (req: Request, res: Response) => {
    const { fullName, email, address } = req.body;
    await handleCreateUser(fullName, email, address)
    return res.redirect("/");
}


const postDeleteUser = async (req: Request, res: Response) => {

    // console.log(req.params);
    const { id } = req.params;
    await handleDeleteUser(id);
    return res.redirect("/");
}



const getViewUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const users = await getUserById(id);
    return res.render("view-user", { users: users });
}


const postEditUser = async (req: Request, res: Response) => {
    const { fullName, email, address } = req.body;
    const { id } = req.params;
    await editUserById(fullName, email, address, id);
    res.redirect("/");
}










export { getHomePage, getCreateUserPage, postCreateUser, postDeleteUser, getViewUser, postEditUser };