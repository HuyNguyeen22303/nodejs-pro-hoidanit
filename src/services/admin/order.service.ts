import { prisma } from "config/client";
import { TOTAL_ITEM_PER_PAGE } from "config/constants";



const handlerGetAllOrder = async (page: number) => {
    const pageSize = TOTAL_ITEM_PER_PAGE;
    return await prisma.order.findMany({

        skip: (page - 1) * pageSize,
        take: pageSize,

        include: {
            user: {
                select: {
                    fullName: true
                }
            }
        }
    });

}

const countOrderItem = async () => {
    const pageSize = TOTAL_ITEM_PER_PAGE;

    const totalItemOrders = await prisma.order.count();
    const totalPages = Math.ceil(totalItemOrders / pageSize);
    return totalPages;
}
const handlerGetOrderDetailById = async (orderId: number) => {
    return await prisma.orderDetail.findMany({
        where: {
            orderId: orderId
        },
        include: {
            product: true,


        }
    });

}





const handlerOrderHistory = async (userId: number) => {

    const orderHistory = await prisma.order.findMany({
        where: { userId },
        include: {
            orderDetails: {
                include: {
                    product: true
                }
            }
        }

    })

    return orderHistory
}










export { handlerGetAllOrder, handlerGetOrderDetailById, handlerOrderHistory, countOrderItem } 