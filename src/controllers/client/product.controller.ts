import { Request, Response, urlencoded } from "express";
import { userInfo } from "os";
import { toASCII } from "punycode";
import { addProductToCart, getDetailCart, getProductById, postDeleteCart } from "services/client/item.service";


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
    const cartDetail = await getDetailCart(user);
    const totalPrice = cartDetail?.map(item => item.price * item.quantity)?.reduce((a, b) => a + b, 0) || 0;
    res.render("client/product/cart.ejs", {
        cartDetail, totalPrice
    })
}


const postDeleteProductInCart = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.user;
    if (user) {
        await postDeleteCart(+id, user.id, user.sumCart as any)
    } else {
        return res.redirect("/login");
    }


    return res.redirect("/cart");


}




const getCheckOutPage = async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) {
        return res.redirect("/");
    }
    const cartDetail = await getDetailCart(user);
    const totalPrice = cartDetail?.map(item => item.price * item.quantity)?.reduce((a, b) => a + b, 0) || 0;
    res.render("client/product/checkout.ejs", {
        cartDetail, totalPrice
    })
}












export { getDetailPage, postAddProductToCart, getCartPage, postDeleteProductInCart, getCheckOutPage }