import * as z from "zod";

export const productSchema = z.object({

    name: z.string().trim().min(1, { message: 'Vui lòng nhập name tối thiểu là 1 ký tự' }),
    price: z.number().min(1, { message: 'Vui lòng nhập price tối thiểu là 1' }),
    detailDesc: z.string().trim().min(1, { message: 'Vui lòng nhập detailDesc sản phẩm tối thiểu là 1 ký tự' }),
    shortDesc: z.string().trim().min(1, { message: 'Vui lòng nhập shortDesc sản phẩm tối thiểu là 1 ký tự' }),
    quantity: z.number().min(1, { message: 'Vui lòng nhập quantity tối thiểu là 1' }),
    factory: z.number().min(1, { message: 'Vui lòng nhập factory tối thiểu là 1 ký tự' }),
    target: z.number().min(1, { message: 'Vui lòng nhập target sản phẩm tối thiểu là 1 ký tự' }),
});

export type TProductSchema = z.input<typeof productSchema>;