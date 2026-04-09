import { Request, Response } from "express";
import { productSchema, TProductSchema } from "../../validation/product.schema";
import { array } from "zod";


const getAdminCreateProductPage = async (req: Request, res: Response) => {

    const errors: [] = [];
    const oldData = {
        name: "",
        price: "",
        detailDesc: "",
        shortDesc: "",
        quantity: "",
        factory: "",
        target: "",

    }
    return res.render('admin/product/create.ejs', {
        errors, oldData
    });
}



const postAdminCreateProduct = async (req: Request, res: Response) => {
    const { name,
        price,
        detailDesc,
        shortDesc,
        quantity,
        factory,
        target } = req.body as TProductSchema;
    const validate = productSchema.safeParse(req.body);

    // error
    if (!validate.success) {
        const errorZod = validate.error?.issues;
        const errors = errorZod?.map(item => `${item.message} (${item.path})`);
        const oldData = {
            name,
            price,
            detailDesc,
            shortDesc,
            quantity,
            factory,
            target
        }
        return res.render('admin/product/create.ejs', {
            errors, oldData

        });
    }


    // succes

    return res.redirect("/admin/product")
}

export { getAdminCreateProductPage, postAdminCreateProduct }