import { isEmailExist } from "services/client/auth.service";
import * as z from "zod";


const emailSchema = z.string().email("Email không đúng định dạng")
    .refine(async (email) => {
        const existingUser = await isEmailExist(email);
        return !existingUser;

    }, {
        message: "Email already exists",
        path: ["email"],
    });


const passwordSchema = z
    .string()
    .min(3, { message: "Password Tối thiểu là 3 ký tự" })
    .max(20, { message: "Password tối đa là 20 ký tự" })


export const RegisterSchema = z.object({
    fullName: z.string().trim().min(1, {
        message: "Tên Không được để trống"
    }),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string()
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Password comfirm không chính xác",
        path: ["comfirmPassword"],
    })


export type TRegisterSchema = z.input<typeof RegisterSchema>;