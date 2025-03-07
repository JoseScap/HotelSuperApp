import { useEffect, useMemo, useRef, useState } from "react"
import { TextInput } from "react-native"
import { useStores } from "@/models"
import { supabase } from "@/utils/supabaseClient"
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
  login: () => Promise<void>
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
    authenticationStore: { setAuthToken, setDisplayName },
  } = useStores()

  const emailValidation = useMemo<TxKeyPath | undefined>(() => {
    if (!email) return "loginScreen:errors.emailRequired"
    if (email.length < 8) return "loginScreen:errors.emailMinimunCharacters"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "loginScreen:errors.emailInvalid"
    return undefined
  }, [email])

  const passwordValidation = useMemo<TxKeyPath | undefined>(() => {
    if (!password) return "loginScreen:errors.passwordRequired"
    if (password.length < 12) return "loginScreen:errors.passwordTooShort"
    if (!/^[a-zA-Z0-9]+$/.test(password)) return "loginScreen:errors.passwordInvalid"
    return undefined
  }, [password])

  async function login() {
    setIsSubmitted(true)
    setLoginError(undefined)

    if (!password || !email || emailValidation || passwordValidation) return undefined

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      setLoginError("loginScreen:errors.loginFailed")
      return undefined
    }

    setIsSubmitted(false)
    setPassword(null)
    setEmail(null)
    setAuthToken(data.session?.access_token || "")
    setDisplayName(data.user?.user_metadata?.display_name || "")
  }

  function togglePassword() {
    setIsAuthPasswordHidden(!isAuthPasswordHidden)
  }

  useEffect(() => {
    setEmail("test@tuzgle.com")
  }, [])

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
