import * as z from "zod";

export const productSchema = z.object({
    id: z.string().optional(),
    name: z.string().trim().min(1, { message: 'Tên không được để trống tối thiểu là 1 ký tự' }),
    price: z.string()
        .transform((val) => (val === "" ? 0 : Number(val)))
        .refine((num) => num > 0, {
            message: "Số tiền tối thiểu là 1",
        }),

    detailDesc: z.string().trim().min(1, { message: 'detailDesc không được để trống tối thiểu là 1 ký tự' }),
    shortDesc: z.string().trim().min(1, { message: 'shortDesc không được để trống tối thiểu là 1 ký tự' }),
    quantity: z.string()
        .transform((val) => (val === "" ? 0 : Number(val)))
        .refine((num) => num > 0, {
            message: "Số lượng tối thiểu là 1",
        }),
    factory: z.string().trim().min(1, { message: 'factory không được để trống tối thiểu là 1 ký tự' }),
    target: z.string().trim().min(1, { message: 'target không được để trống tối thiểu là 1 ký tự' }),
});

export type TProductSchema = z.input<typeof productSchema>;