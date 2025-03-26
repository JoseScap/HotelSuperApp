import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"
import { createTRPCReact } from "@trpc/react-query"
import { type AppRouter } from "../server/trpc"
import { MMKV } from "react-native-mmkv"

const storage = new MMKV()

// Use environment variable with fallback
export const BACKEND_URL = process.env.BACKEND_URL || "https://belfastcorems-int.up.railway.app"

// React Query hooks
export const trpc = createTRPCReact<AppRouter>()

// Standalone client
export const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${BACKEND_URL}/trpc`,
      headers: () => {
        const token = storage.getString("accessToken")
        return {
          Authorization: token ? `Bearer ${token}` : "",
        }
      },
    }),
  ],
})

// Custom error logging in development
export const logTRPCError = (err: Error) => {
  if (__DEV__) {
    console.error("API Error:", err)
  }

  return err
}
