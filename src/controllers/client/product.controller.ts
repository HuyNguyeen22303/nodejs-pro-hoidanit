import { Request, Response, urlencoded } from "express";
import { userInfo } from "os";
import { toASCII } from "punycode";
import { handlerOrderHistory } from "services/admin/order.service";
import { addProductToCart, getDetailCart, getProductById, handlerPlaceOrder, postDeleteCart, updateCartDetailBeforeCheckOut } from "services/client/item.service";


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


const postHandleCartToCheckOut = async (req: Request, Res: Response) => {
    const user = req.user;
    if (!user) return Res.redirect("/login");
    console.log(req.body);
    const currentCartDetail: { id: string, quantity: string, cartId: string }[] = req.body?.cartDetails ?? [];
    console.log(currentCartDetail);
    await updateCartDetailBeforeCheckOut(currentCartDetail);
    return Res.redirect("/checkout");
}



const postPlaceOrder = async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) return res.redirect("/login");
    const { receiverName,
        receiverAddress,
        receiverPhone,
        totalPrice
    } = req.body

    await handlerPlaceOrder(user.id, receiverName, receiverAddress, receiverPhone, +totalPrice);
    res.redirect("thanks")
}


const getThanks = (req: Request, res: Response) => {
    const user = req.user;
    if (!user) return res.redirect("/login");


    return res.render("client/product/thanks.ejs");
}



const getOrderHistory = async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) return res.redirect("/login");


    const orderHistory = await handlerOrderHistory(user.id);
    console.log(orderHistory);

    return res.render("client/product/orderHistory.ejs", { orderHistory });
}





const postAddToCartFromDetailPage = async (req: Request, res: Response) => {
    const user = req.user;
    const { id } = req.params;
    const { quantity } = req.body;
    console.log(quantity)
    console.log(id);
    if (!user) return res.redirect("/login");

    await addProductToCart(+id, +quantity, user)



    return res.redirect(`/product/${id}`);
}














export {
    getDetailPage, postAddProductToCart, getCartPage, postDeleteProductInCart, getCheckOutPage, postHandleCartToCheckOut, postPlaceOrder
    , getThanks, getOrderHistory, postAddToCartFromDetailPage
}