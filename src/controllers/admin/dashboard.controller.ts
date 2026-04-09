
import { Request, Response } from "express";
import { getAllProduct } from "services/admin/product.service";
import { getAllUser } from "services/user.service";
const getDashboardPage = async (req: Request, res: Response) => {


    return res.render('admin/dashboard/show.ejs');
}
const getAdminUserPage = async (req: Request, res: Response) => {
    const users = await getAllUser();

    return res.render('admin/user/show.ejs', {
        users: users
    });
}
const getAdminProductPage = async (req: Request, res: Response) => {
    const products = await getAllProduct()

    return res.render('admin/product/show.ejs', { products });
}
const getAdminOderPage = async (req: Request, res: Response) => {


    return res.render('admin/order/show.ejs');
}









export { getDashboardPage, getAdminUserPage, getAdminProductPage, getAdminOderPage }


