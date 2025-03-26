import { z } from "zod"

export const loginRequestSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email("Invalid email format")
    .trim()
    .toLowerCase(),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Password must contain at least one letter and one number",
    ),
})

export const loginResponseSchema = z.object({
  accessToken: z.string(),
})

export type LoginRequest = z.infer<typeof loginRequestSchema>
export type LoginResponse = z.infer<typeof loginResponseSchema>
