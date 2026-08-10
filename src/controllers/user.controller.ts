import getConnection from "config/database";
import { Request, Response } from "express";
import { countTotalAllProduct, getAllProduct } from "services/client/item.service";
import { getProductWithFilter } from "services/client/product.filter";
import { getAllUser, handleCreateUser, handleDeleteUser, getUserById, updateByID, getAllRole } from "services/user.service";
import { string } from "zod";



const getHomePage = async (req: Request, res: Response) => {

    const { page } = req.query;
    let currentPage = page ? +page : 1;
    if (currentPage <= 1) currentPage = 1;
    const products = await getAllProduct(currentPage, 8);

    const totalPages = await countTotalAllProduct(8);



    return res.render('client/home/show.ejs', {
        products, totalPages: totalPages, page: currentPage

    });
}

const getProductFilterPage = async (req: Request, res: Response) => {
    const { page, price = "", factory = "", target = "", sort = "" } = req.query as {
        page?: string;
        price: string;
        factory: string;
        target: string;
        sort: string;
    };
    let currentPage = page ? +page : 1;

    // const products = await getAllProduct(currentPage, 6);

    // const totalPages = await countTotalAllProduct(6);

    const data = await getProductWithFilter(currentPage, 6, factory, target, price, sort);

    return res.render('client/product/filter.ejs', { products: data.products, totalPages: +data.totalPages, page: currentPage });

}


const getCreateUserPage = async (req: Request, res: Response) => {
    const roles = await getAllRole();

    return res.render('admin/user/create.ejs', {
        roles: roles
    })
}

const postCreateUser = async (req: Request, res: Response) => {

    const { username, password, fullName, address, phone, accountType, role } = req.body;

    const file = req.file;
    const avatar = file?.filename ?? "";
    await handleCreateUser(username, password, fullName, address, phone, accountType, avatar, role)
    return res.redirect("/admin/user");
}


const postDeleteUser = async (req: Request, res: Response) => {

    // console.log(req.params);
    // const { id } = req.params;
    const { id } = req.params as { id: string };

    await handleDeleteUser(id);
    return res.redirect("/admin/user");
}



const getViewUser = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const users = await getUserById(id);
    const roles = await getAllRole(); // Lấy đc roles(1 la admin 2 la user) của bảng role 
    return res.render("admin/user/detail.ejs", {
        users: users,
        roles: roles
    });
}


const postEditUser = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const { fullName, address, phone, role } = req.body;
    const file = req.file;
    const avatar = file?.filename ?? "undefined";
    await updateByID(id, fullName, phone, address, role, avatar);
    res.redirect("/admin/user");
}



















export { getHomePage, getCreateUserPage, postCreateUser, postDeleteUser, getViewUser, postEditUser, getProductFilterPage };