import { initTRPC } from "@trpc/server"
import { z } from "zod"
import { loginRequestSchema, loginResponseSchema } from "../types/api"

const t = initTRPC.create()

export const router = t.router
export const publicProcedure = t.procedure

export const appRouter = router({
  auth: router({
    login: publicProcedure.input(loginRequestSchema).mutation(async ({ input }) => {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        })

        if (!response.ok) {
          throw new Error("Invalid credentials")
        }

        const data = await response.json()
        return {
          accessToken: data.accessToken,
        } satisfies z.infer<typeof loginResponseSchema>
      } catch {
        throw new Error("Invalid credentials")
      }
    }),
  }),
})

export type AppRouter = typeof appRouter
