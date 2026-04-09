import { Prisma } from "@prisma/client";
import { prisma } from "config/client";


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

const getAllProduct = async () => {
    const products = await prisma.product.findMany();
    return products;
}


export { createProduct, getAllProduct }