import { Request, Response } from "express";
import { getProductById } from "services/client/item.service";


const getDetailPage = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.user;
    const products = await getProductById(+id);

    return res.render("client/product/detail.ejs", { products });

}


export { getDetailPage }