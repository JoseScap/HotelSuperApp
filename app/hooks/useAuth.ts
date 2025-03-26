import { useCallback, useMemo } from "react"
import { useMutation } from "@tanstack/react-query"
import { trpcClient, logTRPCError } from "../utils/trpc"
import { MMKV } from "react-native-mmkv"
import { type RouterInput } from "../types/trpc"

const storage = new MMKV()
const TOKEN_KEY = "accessToken"

export const useAuth = () => {
  const loginMutation = useMutation({
    mutationFn: (credentials: RouterInput["auth"]["login"]) => {
      return trpcClient.auth.login.mutate(credentials)
    },
    onSuccess: (data) => {
      if (data?.accessToken) {
        storage.set(TOKEN_KEY, data.accessToken)
      }
    },
    onError: (error) => {
      // Log error in development
      logTRPCError(error)
    },
  })

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        await loginMutation.mutateAsync({ email, password })
        return true
      } catch {
        // Error is already handled by onError
        return false
      }
    },
    [loginMutation],
  )

  const logout = useCallback(() => {
    storage.delete(TOKEN_KEY)
  }, [])

  const getAccessToken = useCallback(() => {
    return storage.getString(TOKEN_KEY)
  }, [])

  const isAuthenticated = useMemo(() => {
    return !!getAccessToken()
  }, [getAccessToken])

  return {
    login,
    logout,
    getAccessToken,
    isAuthenticated,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
  }
}
