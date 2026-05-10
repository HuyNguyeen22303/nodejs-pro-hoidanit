import { prisma } from "config/client"
import { any } from "zod";




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
                    increment: 1,
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
                    decrement: 1,
                }
            }
        })
    }
}


const updateCartDetailBeforeCheckOut = async (data: { id: string, quantity: string }[]) => {
    for (let i = 0; i < data.length; i++) {
        await prisma.cartDetail.update({
            where: {
                id: +data[i].id,
            },
            data: {
                quantity: +(data[i].quantity)
            }
        })
    }
}


export { getAllProduct, getProductById, addProductToCart, getDetailCart, postDeleteCart, updateCartDetailBeforeCheckOut }