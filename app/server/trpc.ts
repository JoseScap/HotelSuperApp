import { initTRPC } from "@trpc/server"
import { z } from "zod"
import { loginRequestSchema, loginResponseSchema } from "../types/api"
import { BACKEND_URL } from "../utils/trpc"

const t = initTRPC.create()

export const router = t.router
export const publicProcedure = t.procedure

export const appRouter = router({
  auth: router({
    login: publicProcedure.input(loginRequestSchema).mutation(async ({ input }) => {
      try {
        const response = await fetch(`${BACKEND_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.message || "Invalid credentials")
        }

        const data = await response.json()
        return {
          accessToken: data.accessToken,
        } satisfies z.infer<typeof loginResponseSchema>
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message)
        }
        throw new Error("Invalid credentials")
      }
    }),
  }),
})

export type AppRouter = typeof appRouter
