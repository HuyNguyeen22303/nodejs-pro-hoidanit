import express, { Express } from 'express';
import { getCreateUserPage, getHomePage, postCreateUser, postDeleteUser, getViewUser, postEditUser } from "controllers/user.controller";
import { getDashboardPage, getAdminUserPage, getAdminProductPage, getAdminOderPage } from 'controllers/admin/dashboard.controller';
import fileUploadMiddleware from '../middleware/multer';
import { getDetailPage } from 'controllers/client/product.controller';
import { getAdminCreateProductPage, postAdminCreateProduct } from 'controllers/admin/product.controller';
const router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const webRoute = (app: Express) => {
    router.get("/", getHomePage)
    router.get("/product/:id", getDetailPage)






    // route admin 

    router.get("/admin", getDashboardPage)
    router.get("/admin/user", getAdminUserPage)
    router.get("/admin/product", getAdminProductPage)
    router.get("/admin/order", getAdminOderPage)
    router.get("/admin/create-user", getCreateUserPage)
    router.post("/admin/handle-create-user", fileUploadMiddleware("avatar"), postCreateUser)
    router.post("/admin/delete-user/:id", postDeleteUser)
    router.get("/admin/detail-user/:id", getViewUser)
    router.post("/admin/edit-user/:id", fileUploadMiddleware("avatar"), postEditUser)




    router.get("/admin/create-product", getAdminCreateProductPage)
    router.post("/admin/create-product", fileUploadMiddleware("image", "images/product"), postAdminCreateProduct)
    app.use("/", router); //base url 
}


const sum = (a: number, b: number): number => {
    return a + b;
}

export default webRoute;

