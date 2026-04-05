import express, { Express } from 'express';
import { getCreateUserPage, getHomePage, postCreateUser, postDeleteUser, getViewUser, postEditUser } from "controllers/user.controller";
import { getDashboardPage, getAdminUserPage, getAdminProductPage, getAdminOderPage } from 'controllers/admin/dashboard.controller';
const router = express.Router();

const webRoute = (app: Express) => {
    router.get("/", getHomePage)


    router.post("/handle-delete-user/:id", postDeleteUser)
    router.get("/handle-view-user/:id", getViewUser)
    router.post("/handle-edit-user/:id", postEditUser)

    // route admin 

    router.get("/admin", getDashboardPage)
    router.get("/admin/user", getAdminUserPage)
    router.get("/admin/product", getAdminProductPage)
    router.get("/admin/order", getAdminOderPage)
    router.get("/admin/create-user", getCreateUserPage)
    router.post("/admin/handle-create-user", postCreateUser)


    app.use("/", router); //base url 
}


const sum = (a: number, b: number): number => {
    return a + b;
}

export default webRoute;

