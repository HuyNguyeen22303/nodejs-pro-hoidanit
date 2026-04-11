import { prisma } from "config/client"




const getAllProduct = async () => {
    const products = await prisma.product.findMany();
    return products;
}



const getProductById = async (id: number) => {
    return prisma.product.findUnique({
        where: {
            id: id
        }
    })
}


export { getAllProduct, getProductById }