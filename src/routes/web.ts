import express, { Express } from 'express';
import { getCreateUserPage, getHomePage, postCreateUser, postDeleteUser, getViewUser, postEditUser } from "controllers/user.controller";
import { getDashboardPage, getAdminUserPage, getAdminProductPage, getAdminOderPage, getOderPageById } from 'controllers/admin/dashboard.controller';
import fileUploadMiddleware from '../middleware/multer';
import { getCartPage, getCheckOutPage, getDetailPage, getOrderHistory, getThanks, postAddProductToCart, postAddToCartFromDetailPage, postDeleteProductInCart, postHandleCartToCheckOut, postPlaceOrder } from 'controllers/client/product.controller';
import { getAdminCreateProductPage, postAdminCreateProduct, getAdminDetailProduct, postAdminUpdateProduct, postDeleteProduct } from 'controllers/admin/product.controller';
import { get } from 'http';
import { getLoginPage, getRegisterPage, getsuccessRedirect, postLogout, postRegisterPage } from 'controllers/client/auth.controller';
import passport from 'passport';
import { isAdmin } from '../middleware/auth';
const router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const webRoute = (app: Express) => {
    router.get("/", getHomePage)
    router.get("/product/:id", getDetailPage)
    router.get("/success-redirect", getsuccessRedirect)
    router.get("/login", getLoginPage)
    router.post('/login', passport.authenticate('local', {
        successRedirect: '/success-redirect',
        failureRedirect: '/login',
        failureMessage: true
    }));

    router.post('/logout', postLogout);


    router.get("/register", getRegisterPage)
    router.post("/register", postRegisterPage)
    router.post("/add-product-to-cart/:id", postAddProductToCart);
    router.get("/cart", getCartPage);
    router.get("/checkout", getCheckOutPage);

    router.post("/delete-product-in-cart/:id", postDeleteProductInCart);
    router.post("/handle-cart-to-checkout", postHandleCartToCheckOut);

    router.post("/place-order", postPlaceOrder);
    router.get("/thanks", getThanks);


    router.get("/order-history", getOrderHistory);
    router.post("/add-to-cart-from-detail-page/:id", postAddToCartFromDetailPage);




    // route admin 

    router.get("/admin", getDashboardPage)
    router.get("/admin/user", getAdminUserPage)
    router.get("/admin/product", getAdminProductPage)

    router.get("/admin/create-user", getCreateUserPage)
    router.post("/admin/handle-create-user", fileUploadMiddleware("avatar"), postCreateUser)
    router.post("/admin/delete-user/:id", postDeleteUser)
    router.get("/admin/detail-user/:id", getViewUser)
    router.post("/admin/edit-user/:id", fileUploadMiddleware("avatar"), postEditUser)

    router.get("/admin/order", getAdminOderPage)
    router.get("/admin/order/:id", getOderPageById)


    router.get("/admin/create-product", getAdminCreateProductPage)
    router.post("/admin/create-product", fileUploadMiddleware("image", "images/product"), postAdminCreateProduct)
    router.get("/admin/detail-product/:id", getAdminDetailProduct)
    router.post("/admin/update-product/:id", fileUploadMiddleware("image", "images/product"), postAdminUpdateProduct)
    router.post("/admin/delete-product/:id", postDeleteProduct)



    app.use("/", isAdmin, router); //base url 
}




export default webRoute;

