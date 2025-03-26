import { useMemo, useRef, useState } from "react"
import { TextInput } from "react-native"
import { useStores } from "@/models"
import { TxKeyPath } from "@/i18n"
import { useAuth } from "./useAuth"
import { MMKV } from "react-native-mmkv"

const storage = new MMKV()
const TOKEN_KEY = "accessToken"

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

  const { authenticationStore } = useStores()
  const { login: authLogin } = useAuth()

  const emailValidation = useMemo<TxKeyPath | undefined>(() => {
    if (!email) return "loginScreen:errors.emailRequired"
    if (email.length < 8) return "loginScreen:errors.emailMinimunCharacters"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "loginScreen:errors.emailInvalid"
    return undefined
  }, [email])

  const passwordValidation = useMemo<TxKeyPath | undefined>(() => {
    if (!password) return "loginScreen:errors.passwordRequired"
    if (!/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]+$/.test(password))
      return "loginScreen:errors.passwordInvalid"
    return undefined
  }, [password])

  const login = async () => {
    if (!email || !password) {
      setLoginError(
        !email ? "loginScreen:errors.emailRequired" : "loginScreen:errors.passwordRequired",
      )
      return false
    }

    if (emailValidation || passwordValidation) {
      setLoginError(emailValidation || passwordValidation)
      return false
    }

    try {
      setLoginError(undefined)
      setIsSubmitted(true)

      const success = await authLogin(email, password)

      setIsSubmitted(false)

      if (success) {
        setPassword(null)
        setEmail(null)
        // Sync with the store for backward compatibility
        const token = storage.getString(TOKEN_KEY)
        if (token) {
          authenticationStore.setAuthToken(token)
        }
        return true
      } else {
        setLoginError("loginScreen:errors.loginFailed")
        return false
      }
    } catch {
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
