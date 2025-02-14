import { useEffect, useRef, useState } from "react"
import { TextInput } from "react-native"
import { useStores } from "@/models"
import { supabase } from "@/utils/supabaseClient"
import { TxKeyPath } from "@/i18n"

interface UseLoginScreenReturn {
  // Refs
  authPasswordInput: React.RefObject<TextInput>
  // State
  authPassword: string
  isAuthPasswordHidden: boolean
  isSubmitted: boolean
  attemptsCount: number
  authEmail: string
  validationError: TxKeyPath | undefined
  loginError: TxKeyPath | undefined
  // Actions
  setAuthPassword: (value: string) => void
  setAuthEmail: (value: string) => void
  toggleAuthPassword: () => void
  login: () => Promise<void>
}

export function useLoginScreen(): UseLoginScreenReturn {
  const authPasswordInput = useRef<TextInput>(null)

  const [authPassword, setAuthPassword] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const [loginError, setLoginError] = useState<TxKeyPath>()

  const {
    authenticationStore: { authEmail, setAuthEmail, setAuthToken, validationError, setDisplayName },
  } = useStores()

  async function login() {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)
    setLoginError(undefined)

    if (validationError) return

    const { data, error } = await supabase.auth.signInWithPassword({
      email: authEmail,
      password: authPassword,
    })

    if (error) {
      setLoginError("loginScreen:errors.loginFailed")
      return
    }

    setIsSubmitted(false)
    setAuthPassword("")
    setAuthEmail("")
    setAuthToken(data.session?.access_token || "")
    setDisplayName(data.user?.user_metadata?.display_name || "")
  }

  function toggleAuthPassword() {
    setIsAuthPasswordHidden(!isAuthPasswordHidden)
  }

  useEffect(() => {
    setAuthEmail("test@tuzgle.com")
  }, [])

  return {
    // Refs
    authPasswordInput,
    // State
    authPassword,
    isAuthPasswordHidden,
    isSubmitted,
    attemptsCount,
    authEmail,
    validationError,
    loginError,
    // Actions
    setAuthPassword,
    setAuthEmail,
    toggleAuthPassword,
    login,
  }
} 