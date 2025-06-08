import { z } from "zod";

const signInSchema = z.object({
  email: z.string().min(1, {message: "Email is required."}).email(),
  password: z.string().min(8, {message: 'Password must have 8 characters at least.'}),
});

type TInputsLogin = z.infer <typeof signInSchema>;

export { signInSchema, type TInputsLogin};

