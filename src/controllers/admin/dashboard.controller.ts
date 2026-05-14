
import { Request, Response } from "express";
import { handlerGetAllOrder, handlerGetOrderDetailById } from "services/admin/order.service";
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


    const orders = await handlerGetAllOrder();
    // console.log(orders);


    return res.render("admin/order/show.ejs", { orders: orders });
}


const getOderPageById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const orderDetails = await handlerGetOrderDetailById(+id);

    console.log(orderDetails);


    return res.render("admin/order/detail.ejs", { orderDetails, id });
}











export { getDashboardPage, getAdminUserPage, getAdminProductPage, getAdminOderPage, getOderPageById }


