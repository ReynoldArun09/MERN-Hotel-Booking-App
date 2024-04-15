import { z } from "zod";

export const LoginSchema = z.object({
  body: z.object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Invalid email address"),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  }),
});

export const RegisterSchema = z.object({
  body: z
    .object({
      firstName: z
        .string()
        .min(4, { message: "firstName must be at least 4 characters" }),
      lastName: z
        .string()
        .min(4, { message: "LastName must be at least 4 characters" }),
      email: z
        .string()
        .min(1, { message: "Email is required" })
        .email("Invalid email address"),
      password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
      confirmPassword: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }),
});
