import { useMemo, useRef, useState } from "react"
import { TextInput } from "react-native"
import { supabase } from "@/utils/supabaseClient"
import { AppStackScreenProps } from "@/navigators"
import { TxKeyPath } from "@/i18n"

interface UseRegisterScreenParams {
  navigation: AppStackScreenProps<"Register">["navigation"]
}

interface UseRegisterScreenReturn {
  // Refs
  emailInput: React.RefObject<TextInput>
  passwordInput: React.RefObject<TextInput>
  confirmPasswordInput: React.RefObject<TextInput>

  // Values
  email: string | null
  password: string | null
  confirmPassword: string | null
  isPasswordHidden: boolean
  isConfirmPasswordHidden: boolean
  isSubmitted: boolean

  // Validations
  emailValidation?: TxKeyPath
  passwordValidation?: TxKeyPath
  confirmPasswordValidation?: TxKeyPath
  signUpError?: TxKeyPath

  // Actions
  setEmail: (value: string) => void
  setPassword: (value: string) => void
  setConfirmPassword: (value: string) => void
  togglePassword: () => void
  toggleConfirmPassword: () => void
  register: () => Promise<void>
}

export function useRegisterScreen({ navigation }: UseRegisterScreenParams): UseRegisterScreenReturn {
  // Refs
  const emailInput = useRef<TextInput>(null)
  const passwordInput = useRef<TextInput>(null)
  const confirmPasswordInput = useRef<TextInput>(null)

  // State
  const [email, setEmail] = useState<string | null>(null)
  const [password, setPassword] = useState<string | null>(null)
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null)
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [signUpError, setSignUpError] = useState<TxKeyPath>()

  // Validations
  const emailValidation = useMemo<TxKeyPath | undefined>(() => {
    if (!email) return "registrationScreen:errors.emailRequired"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "registrationScreen:errors.emailInvalid"
    return undefined
  }, [email])

  const passwordValidation = useMemo<TxKeyPath | undefined>(() => {
    if (!password) return "registrationScreen:errors.passwordRequired"
    if (password.length < 8) return "registrationScreen:errors.passwordTooShort"
    if (!/^[a-zA-Z0-9]+$/.test(password)) return "registrationScreen:errors.passwordInvalid"
    return undefined
  }, [password])

  const confirmPasswordValidation = useMemo<TxKeyPath | undefined>(() => {
    if (!confirmPassword) return "registrationScreen:errors.passwordRequired"
    if (password !== confirmPassword) return "registrationScreen:errors.passwordsDontMatch"
    return undefined
  }, [password, confirmPassword])

  async function register() {
    setIsSubmitted(true)
    setSignUpError(undefined)

    if (!email || !password || !confirmPassword) return

    const { error } = await supabase.auth.signUp({
      email: email,
      password: password!,
    })

    if (error) {
      setSignUpError("registrationScreen:errors.signUpFailed")
      return
    }

    setIsSubmitted(false)
    navigation.navigate("RegisterSuccess")
  }

  function togglePassword() {
    setIsPasswordHidden(!isPasswordHidden)
  }

  function toggleConfirmPassword() {
    setIsConfirmPasswordHidden(!isConfirmPasswordHidden)
  }

  return {
    // Refs
    emailInput,
    passwordInput,
    confirmPasswordInput,

    // Values
    email,
    password,
    confirmPassword,
    isPasswordHidden,
    isConfirmPasswordHidden,
    isSubmitted,

    // Validations
    emailValidation,
    passwordValidation,
    confirmPasswordValidation,
    signUpError,

    // Actions
    setEmail,
    setPassword,
    setConfirmPassword,
    togglePassword,
    toggleConfirmPassword,
    register,
  }
}