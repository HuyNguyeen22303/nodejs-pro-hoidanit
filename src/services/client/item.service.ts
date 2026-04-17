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


export { getAllProduct, getProductById, addProductToCart }