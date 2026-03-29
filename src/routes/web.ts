import express, { Express } from 'express';
const router = express.Router();

const webRoute = (app: Express) => {
    router.get("/", (req, res) => {
        res.render('home.ejs', { title: 'Hey', message: 'Hello there!' })
    })


    router.get("/test", (req, res) => {
        res.send("Hello test! dasdasd");
    })

    router.get("/abc", (req, res) => {
        res.send("Hello abc!");
    })

    app.use("/", router); //base url 
}


const sum = (a: number, b: number): number => {
    return a + b;
}

export default webRoute;

