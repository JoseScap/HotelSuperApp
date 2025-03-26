import { useMemo, useRef, useState } from "react"
import { TextInput } from "react-native"
import { useStores } from "@/models"
import { trpcClient } from "@/utils/trpc"
import { TxKeyPath } from "@/i18n"

interface UseLoginScreenReturn {
  // Refs
  emailInput: React.RefObject<TextInput>
  passwordInput: React.RefObject<TextInput>

  // Values
  email: string | null
  password: string | null
  isAuthPasswordHidden: boolean
  isSubmitted: boolean

  // Validations
  emailValidation?: TxKeyPath
  passwordValidation?: TxKeyPath
  loginError?: TxKeyPath

  // Actions
  setPassword: (value: string) => void
  setEmail: (value: string) => void
  togglePassword: () => void
  login: () => Promise<boolean>
}

export function useLoginScreen(): UseLoginScreenReturn {
  const emailInput = useRef<TextInput>(null)
  const passwordInput = useRef<TextInput>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [password, setPassword] = useState<string | null>(null)
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loginError, setLoginError] = useState<TxKeyPath>()

  const {
    authenticationStore: { setAuthToken },
  } = useStores()

  const emailValidation = useMemo<TxKeyPath | undefined>(() => {
    if (!email) return "loginScreen:errors.emailRequired"
    if (email.length < 8) return "loginScreen:errors.emailMinimunCharacters"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "loginScreen:errors.emailInvalid"
    return undefined
  }, [email])

  const passwordValidation = useMemo<TxKeyPath | undefined>(() => {
    if (!password) return "loginScreen:errors.passwordRequired"
    if (!/^[a-zA-Z0-9]+$/.test(password)) return "loginScreen:errors.passwordInvalid"
    return undefined
  }, [password])

  async function login() {
    setIsSubmitted(true)
    setLoginError(undefined)

    if (!password || !email || emailValidation || passwordValidation) {
      console.log("Validation failed:", {
        email,
        password: password ? "***" : null,
        emailValidation,
        passwordValidation,
      })
      return false
    }

    try {
      console.log("Attempting login with tRPC...", {
        email,
        password: "***",
      })
      const result = await trpcClient.auth.login.mutate({
        email,
        password,
      })

      console.log("Login successful:", result)
      setIsSubmitted(false)
      setPassword(null)
      setEmail(null)
      setAuthToken(result.accessToken)
      return true
    } catch (error) {
      console.error("Login error:", error)
      setLoginError("loginScreen:errors.loginFailed")
      return false
    }
  }

  function togglePassword() {
    setIsAuthPasswordHidden(!isAuthPasswordHidden)
  }

  return {
    // Refs
    emailInput,
    passwordInput,

    // Values
    email,
    password,
    isAuthPasswordHidden,
    isSubmitted,

    // Validations
    emailValidation,
    passwordValidation,
    loginError,

    // Actions
    setPassword,
    setEmail,
    togglePassword,
    login,
  }
}
