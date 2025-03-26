import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server"
import { type AppRouter } from "../server/trpc"

// Infer types for router inputs and outputs
export type RouterInput = inferRouterInputs<AppRouter>
export type RouterOutput = inferRouterOutputs<AppRouter>

// Type helpers for the router
export type AuthRouterInput = RouterInput["auth"]
export type AuthRouterOutput = RouterOutput["auth"]
