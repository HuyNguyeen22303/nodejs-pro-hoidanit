import { Request, Response } from "express";
import { productSchema, TProductSchema } from "../../validation/product.schema";
import { array } from "zod";
import { createProduct, getProductById, postDeleteProductById, postUpdateProductById } from "services/admin/product.service";


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
    const file = req.file;
    const image = file?.filename ?? "";
    await createProduct(name,
        +price,
        detailDesc,
        shortDesc,
        +quantity,
        factory,
        target,
        image
    )





    return res.redirect("/admin/product")
}


const getAdminDetailProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const factoryOptions = [
        { name: "Apple (MacBook)", value: "APPLE" },
        { name: "Asus", value: "ASUS" },
        { name: "Lenovo", value: "LENOVO" },
        { name: "Dell", value: "DELL" },
        { name: "LG", value: "LG" },
        { name: "Acer", value: "ACER" },
    ];


    const targetOptions = [
        { name: "Gaming", value: "GAMING" },
        { name: "Sinh viên - Văn phòng", value: "SINHVIEN-VANPHONG" },
        { name: "Thiết kế đồ họa", value: "THIET-KE-DO-HOA" },
        { name: "Mỏng nhẹ", value: "MONG-NHE" },
        { name: "Doanh nhân", value: "DOANH-NHAN" },
    ];


    const products = await getProductById(+id)





    return res.render("admin/product/detail.ejs", {
        products, factoryOptions, targetOptions
    });
}



const postAdminUpdateProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, price, detailDesc, shortDesc, quantity, factory, target } = req.body as TProductSchema;
    const file = req.file;
    const image = file?.filename ?? "";

    await postUpdateProductById(+id, name, +price, detailDesc, shortDesc, +quantity, factory, target, image);
    res.redirect("/admin/product")
}


const postDeleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    await postDeleteProductById(+id);
    res.redirect("/admin/product");
}



export { getAdminCreateProductPage, postAdminCreateProduct, getAdminDetailProduct, postAdminUpdateProduct, postDeleteProduct }