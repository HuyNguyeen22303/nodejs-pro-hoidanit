import { Request, Response } from "express";


const getDetailPage = (req: Request, res: Response) => {


    return res.render("client/product/detail.ejs");

}


export { getDetailPage }