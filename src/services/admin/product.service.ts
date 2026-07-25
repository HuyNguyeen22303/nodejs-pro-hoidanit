import { Prisma } from "@prisma/client";
import { prisma } from "config/client";
import { TOTAL_ITEM_PER_PAGE } from "config/constants";


const createProduct = async (name: string,
    price: number,
    detailDesc: string,
    shortDesc: string,
    quantity: number,
    factory: string,
    target: string,
    image: string

) => {
    const user = await prisma.product.create({
        data: {
            name: name,
            price: price,
            detailDesc: detailDesc,
            shortDesc: shortDesc,
            quantity: quantity,
            factory: factory,
            target: target,
            ...(image !== null && { image: image })
        },
    });
}

const getAllProduct = async (page: number) => {
    const pageSize = TOTAL_ITEM_PER_PAGE;
    const products = await prisma.product.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
    });
    return products;
}


const countTotalProduct = async () => {
    const pageSize = TOTAL_ITEM_PER_PAGE;
    const totalItems = await prisma.product.count();
    const totalPages = Math.ceil(totalItems / pageSize);
    console.log(totalPages);
    return totalPages;
}


const getProductById = async (id: number) => {

    const products = await prisma.product.findUnique({
        where: { id: id },
    });
    return products;
}


const postUpdateProductById = async (id: number, name: string, price: number, detailDesc: string, shortDesc: string, quantity: number, factory: string, target: string, image: string) => {
    const updateProduct = await prisma.product.update({
        where: { id: id },
        data: {
            name: name,
            price: price,
            detailDesc: detailDesc,
            shortDesc: shortDesc,
            quantity: quantity,
            factory: factory,
            target: target,
            ...(image !== null && { image: image })

        },
    });
}


const postDeleteProductById = async (id: number) => {
    const deleteProduct = await prisma.product.delete({
        where: {
            id: id
        },
    });
    return deleteProduct
}







export { createProduct, getAllProduct, getProductById, postUpdateProductById, postDeleteProductById, countTotalProduct }