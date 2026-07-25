
import { Request, Response } from "express";
import { getDashboardInfo } from "services/admin/dashboard.service";
import { countOrderItem, handlerGetAllOrder, handlerGetOrderDetailById } from "services/admin/order.service";
import { countTotalProduct, getAllProduct } from "services/admin/product.service";
import { getAllUser, countTotalUserPage } from "services/user.service";
import { number } from "zod";





const getDashboardPage = async (req: Request, res: Response) => {

    const info = await getDashboardInfo();
    return res.render('admin/dashboard/show.ejs', { info });
}
const getAdminUserPage = async (req: Request, res: Response) => {

    const { page } = req.query;

    let currentPage = page ? +page : 1;
    if (currentPage <= 1) currentPage = 1;



    const users = await getAllUser(currentPage);
    const totalPages = await countTotalUserPage();

    return res.render('admin/user/show.ejs', {
        users: users,
        totalPages: +totalPages,
        page: currentPage

    });
}


const getAdminProductPage = async (req: Request, res: Response) => {
    const { page } = req.query;

    let currentPage = page ? +page : 1;
    if (currentPage <= 1) currentPage = 1;
    const products = await getAllProduct(currentPage)

    const totalPages = await countTotalProduct();
    console.log(totalPages);
    return res.render('admin/product/show.ejs', { products, totalPages, page: currentPage });
}



const getAdminOderPage = async (req: Request, res: Response) => {
    const { page } = req.query;

    let currentPage = page ? +page : 1;
    if (currentPage <= 1) currentPage = 1;

    const orders = await handlerGetAllOrder(currentPage);
    // console.log(orders);

    const totalPages = await countOrderItem();
    return res.render("admin/order/show.ejs", { orders: orders, page: currentPage, totalPages });
}


const getOderPageById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const orderDetails = await handlerGetOrderDetailById(+id);

    console.log(orderDetails);


    return res.render("admin/order/detail.ejs", { orderDetails, id });
}











export { getDashboardPage, getAdminUserPage, getAdminProductPage, getAdminOderPage, getOderPageById }


