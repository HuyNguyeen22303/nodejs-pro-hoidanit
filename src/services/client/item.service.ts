import { prisma } from "config/client"
import { error } from "console";
import { create } from "domain";
import { any } from "zod";




const getAllProduct = async () => {
    const products = await prisma.product.findMany();
    return products;
}



const getProductById = async (id: number) => {
    return prisma.product.findUnique({
        where: {
            id: +id
        }
    })
}



const addProductToCart = async (productId: number, quantity: number, user: Express.User) => {

    const cart = await prisma.cart.findUnique(
        {
            where: {
                userId: user.id // mỗi cart thì thuộc về một userId cho nên cần tìm xem user đó đã có cart chưa 
            }
        }
    )

    const product = await prisma.product.findUnique({
        where: {
            id: productId
        }
    })

    if (cart) {
        // update
        // cập nhật giỏ hàng
        await prisma.cart.update({
            where: {
                id: cart.id
            },

            data: {
                sum: {
                    increment: quantity,
                },
            }
        })


        // cập nhật cartDetail 
        // Nếu chưa có , tạo mới , có rồi thì cập nhật
        // upsert = update + insert
        const currentCartDetail = await prisma.cartDetail.findFirst({
            where: {
                productId: productId,
                cartID: cart.id
            }
        })
        await prisma.cartDetail.upsert({
            where: {
                id: currentCartDetail?.id ?? 0,
            },
            update: {
                quantity: {
                    increment: quantity,
                },


            },
            create: {
                price: product?.price as any,
                quantity: quantity,
                productId: productId,
                cartID: cart.id
            },
        });
    } else {
        //create
        await prisma.cart.create({
            data: {
                userId: user.id,
                sum: quantity,
                CartDetails: {
                    create: [

                        {

                            quantity: quantity,
                            productId: productId,
                            price: product?.price as any
                        }

                    ]
                }
            }
        })
    }
}

const getDetailCart = async (user: Express.User) => {


    const cart = await prisma.cart.findUnique({
        where: {
            userId: user?.id ?? 0
        }
    })
    if (cart) {
        const cartDetail = await prisma.cartDetail.findMany({
            where: {
                cartID: cart.id
            },
            include: {
                products: true
            }
        })
        return cartDetail

    }
    return []





}
// post Delete cartDetail and Cart
const postDeleteCart = async (CartDetailId: number, userId: number, sumCart: number) => {
    const currentCartDetail = await prisma.cartDetail.findUnique({
        where: {
            id: CartDetailId

        }
    })


    const quantity = currentCartDetail?.quantity;
    await prisma.cartDetail.delete({
        where: {
            id: CartDetailId,
        }
    });

    if (sumCart === 1) {
        // xóa sản phẩm nếu giỏ hàng có 1 sản phẩm
        await prisma.cart.delete({
            where: {
                userId
            }
        })
    } else {
        //update cart nếu sản phẩm > 1
        await prisma.cart.update({
            where: {
                userId
            },
            data: {
                sum: {
                    decrement: quantity,
                }
            }
        })
    }
}


const updateCartDetailBeforeCheckOut = async (data: { id: string, quantity: string, cartId: string }[]) => {
    let totalSum = 0;
    let currentCartId = 0;
    for (let i = 0; i < data.length; i++) {
        const item = data[i]; // Lấy phần tử hiện tại ra để dùng
        currentCartId = +item.cartId; // Lưu lại cartId để dùng sau vòng lặp
        totalSum += +item.quantity;
        await prisma.cartDetail.update({
            where: {
                id: +item.id,
            },
            data: {
                quantity: +item.quantity,

            }
        })
        if (currentCartId > 0) {
            await prisma.cart.update({
                where: {
                    id: currentCartId,
                },
                data: {
                    sum: +totalSum
                }
            })
        }





    }




}



const handlerPlaceOrder = async (
    userId: number,
    receiverName: string,
    receiverAddress: string,
    receiverPhone: string,
    totalPrice: number
) => {
    // Tăng timeout lên 15000ms (15 giây) để tránh bị hủy giữa chừng
    await prisma.$transaction(async (tx) => {

        // 1. Lấy thông tin giỏ hàng
        const cart = await tx.cart.findUnique({
            where: { userId: userId },
            include: { CartDetails: true }
        });

        if (!cart || cart.CartDetails.length === 0) {
            throw new Error("Giỏ hàng không tồn tại hoặc trống.");
        }

        // 2. KIỂM TRA KHO VÀ UPDATE (Chạy trước để nếu lỗi thì hủy ngay tại đây)
        for (const item of cart.CartDetails) {
            const product = await tx.product.findUnique({
                where: { id: item.productId }
            });

            if (!product || product.quantity < item.quantity) {
                throw new Error(`Sản phẩm mã số ${item.productId} không đủ hàng trong kho.`);
            }

            // Trừ kho luôn trong vòng lặp
            await tx.product.update({
                where: { id: item.productId },
                data: { quantity: product.quantity - item.quantity }
            });
            // Trừ kho luôn trong vòng lặp
            await tx.product.update({
                where: { id: item.productId },
                data: {
                    quantity: product.quantity - item.quantity,
                    sold: (product.sold || 0) + item.quantity

                }
            });
        }

        // 3. TẠO ĐƠN HÀNG
        const dataOrderDetail = cart.CartDetails.map(item => ({
            price: item.price,
            quantity: item.quantity,
            productId: item.productId
        }));

        await tx.order.create({
            data: {
                totalPrice: totalPrice,
                paymentMethod: "COD",
                paymentStatus: "PAYMENT_UNPAID",
                status: "PENDING",
                receiverName: receiverName,
                receiverAddress: receiverAddress,
                receiverPhone: receiverPhone,
                userId: userId,
                orderDetails: {
                    create: dataOrderDetail,
                }
            }
        });

        // 4. XÓA GIỎ HÀNG (Đặt ở cuối cùng)
        await tx.cartDetail.deleteMany({
            where: { cartID: cart.id }
        });

        await tx.cart.delete({
            where: { id: cart.id }
        });

    }, {
        maxWait: 5000, // Thời gian tối đa chờ kết nối transaction (5s)
        timeout: 15000 // Thời gian tối đa thực thi transaction (15s)
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


export { getAllProduct, getProductById, addProductToCart, getDetailCart, postDeleteCart, updateCartDetailBeforeCheckOut, handlerPlaceOrder, handlerOrderHistory }