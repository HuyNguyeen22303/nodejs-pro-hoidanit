import { prisma } from "config/client";



const handlerGetAllOrder = async () => {
    return await prisma.order.findMany({
        include: {
            user: {
                select: {
                    fullName: true
                }
            }
        }
    });

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
















export { handlerGetAllOrder, handlerGetOrderDetailById } 