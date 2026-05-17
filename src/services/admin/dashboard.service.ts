import { prisma } from "config/client"



const getDashboardInfo = async () => {
    const countUsers = await prisma.user.count();
    const countProducts = await prisma.product.count();
    const countOrders = await prisma.order.count();



    return {
        countUsers,
        countProducts,
        countOrders
    }
}




export { getDashboardInfo }