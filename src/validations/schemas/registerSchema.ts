import { z } from "zod";

const signUpSchema = z.object({
  firstName: z.string().min(3, {message: "First name must have 3 characters at least."}),
  lastName: z.string().min(3, {message: "Last name must have 3 characters at least."}),
  email: z.string().min(1, {message: "Email is required."}).email(),
  password: z.string().min(8, {message: 'Password must have 8 characters at least.'})
  .regex(/(?=(.*[0-9]))(?=.*[!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*))/,{
    message: 'Password must have 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character.'
  }),
  confirmPassword: z.string().min(1, {message: "Confirm password is required."}),
}).refine(input => input.password === input.confirmPassword, {
  message: 'Password and confirm password does not match.',
  path: ['confirmPassword']
});

// type TInputs = {
//   firstName: string,
//   lastName: string,
//   email: string,
//   password: string,
//   confirmPassword: string,
// }

type TInputsRegister = z.infer <typeof signUpSchema>;


export { signUpSchema, type TInputsRegister };