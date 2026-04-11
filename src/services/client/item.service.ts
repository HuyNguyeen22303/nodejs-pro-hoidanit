import { prisma } from "config/client"




const getAllProduct = async () => {
    const products = await prisma.product.findMany();
    return products;
}


export { getAllProduct }