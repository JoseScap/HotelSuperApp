import { useCallback } from "react"
import { useMutation } from "@tanstack/react-query"
import { trpcClient } from "../utils/trpc"
import { MMKV } from "react-native-mmkv"
import { type RouterInput } from "../types/trpc"

const storage = new MMKV()

export const useAuth = () => {
  const loginMutation = useMutation({
    mutationFn: (credentials: RouterInput["auth"]["login"]) => {
      console.log("Attempting login with credentials:", credentials)
      return trpcClient.auth.login.mutate(credentials)
    },
    onSuccess: (data) => {
      console.log("Login successful:", data)
      if (data?.accessToken) {
        storage.set("accessToken", data.accessToken)
      }
    },
    onError: (error) => {
      console.error("Login mutation error:", error)
    },
  })

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        console.log("Login attempt with:", { email, password: "***" })
        await loginMutation.mutateAsync({ email, password })
        return true
      } catch (error) {
        console.error("Login error:", error)
        return false
      }
    },
    [loginMutation],
  )

  const logout = useCallback(() => {
    storage.delete("accessToken")
  }, [])

  const getAccessToken = useCallback(() => {
    return storage.getString("accessToken")
  }, [])

  return {
    login,
    logout,
    getAccessToken,
    isAuthenticated: !!getAccessToken(),
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
  }
}
