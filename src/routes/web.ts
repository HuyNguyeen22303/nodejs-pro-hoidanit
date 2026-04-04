import express, { Express } from 'express';
import { getCreateUserPage, getHomePage, postCreateUser, postDeleteUser, getViewUser, postEditUser } from "controllers/user.controller";
import { getDashboardPage, getAdminUserPage } from 'controllers/admin/dashboard.controller';
const router = express.Router();

const webRoute = (app: Express) => {
    router.get("/", getHomePage)
    router.get("/create-user", getCreateUserPage)
    router.post("/handle-create-user", postCreateUser)
    router.post("/handle-delete-user/:id", postDeleteUser)
    router.get("/handle-view-user/:id", getViewUser)
    router.post("/handle-edit-user/:id", postEditUser)

    // route admin 

    router.get("/admin", getDashboardPage)
    router.get("/admin/user", getAdminUserPage)



    app.use("/", router); //base url 
}


const sum = (a: number, b: number): number => {
    return a + b;
}

export default webRoute;

