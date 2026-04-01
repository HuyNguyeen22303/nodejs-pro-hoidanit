import express, { Express } from 'express';
import { getCreateUserPage, getHomePage, postCreateUser, postDeleteUser, getViewUser } from "controllers/user.controller";
const router = express.Router();

const webRoute = (app: Express) => {
    router.get("/", getHomePage)
    router.get("/create-user", getCreateUserPage)
    router.post("/handle-create-user", postCreateUser)
    router.post("/handle-delete-user/:id", postDeleteUser)
    router.get("/handle-view-user/:id", getViewUser)




    app.use("/", router); //base url 
}


const sum = (a: number, b: number): number => {
    return a + b;
}

export default webRoute;

