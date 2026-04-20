import { Request, Response } from "express";
import { userInfo } from "os";
import { addProductToCart, getProductById } from "services/client/item.service";


const getDetailPage = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.user;
    const products = await getProductById(+id);

    return res.render("client/product/detail.ejs", { products });

}


const postAddProductToCart = async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(id);
    const user = req.user as any;
    if (user) {
        await addProductToCart(+id, 1, user);
    } else {
        return
    }


    return res.redirect("/");

}


const getCartPage = async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) {
        return res.redirect("/");
    }



    res.render("client/product/cart.ejs")




}







export { getDetailPage, postAddProductToCart, getCartPage }