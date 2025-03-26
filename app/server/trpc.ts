import { initTRPC } from "@trpc/server"
import { z } from "zod"
import { loginRequestSchema, loginResponseSchema } from "../types/api"

const t = initTRPC.create()

export const router = t.router
export const publicProcedure = t.procedure

export const appRouter = router({
  auth: router({
    login: publicProcedure.input(loginRequestSchema).mutation(async ({ input }) => {
      // TODO: Implement actual login logic here
      // For now, we'll just return a mock token
      return {
        accessToken: "mock-token",
      } satisfies z.infer<typeof loginResponseSchema>
    }),
  }),
})

export type AppRouter = typeof appRouter
