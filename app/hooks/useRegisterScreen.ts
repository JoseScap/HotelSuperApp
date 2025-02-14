import { useRef, useState } from "react"
import { TextInput } from "react-native"
import { useStores } from "@/models"
import { supabase } from "@/utils/supabaseClient"
import { AppStackScreenProps } from "@/navigators"
import { TxKeyPath } from "@/i18n"

interface UseRegisterScreenParams {
  navigation: AppStackScreenProps<"Register">["navigation"]
}

interface UseRegisterScreenReturn {
  // Refs
  passwordInput: React.RefObject<TextInput>
  confirmPasswordInput: React.RefObject<TextInput>
  // State
  isAuthPasswordHidden: boolean
  isConfirmPasswordHidden: boolean
  isSubmitted: boolean
  email: string
  password: string
  passwordConfirmation: string
  validationError: TxKeyPath | undefined
  signUpError: TxKeyPath | undefined
  // Actions
  setProp: (key: "email" | "password" | "passwordConfirmation", value: string) => void
  register: () => Promise<void>
  toggleAuthPassword: () => void
  toggleConfirmPassword: () => void
}

export function useRegisterScreen({ navigation }: UseRegisterScreenParams): UseRegisterScreenReturn {
  const passwordInput = useRef<TextInput>(null)
  const confirmPasswordInput = useRef<TextInput>(null)

  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [signUpError, setSignUpError] = useState<TxKeyPath>()

  const {
    registrationStore: { email, password, passwordConfirmation, validationError, setProp, reset },
  } = useStores()

  async function register() {
    setIsSubmitted(true)
    setSignUpError(undefined)

    if (validationError) return

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setSignUpError("registrationScreen:errors.signUpFailed")
      return
    }

    setIsSubmitted(false)
    reset()
    navigation.navigate("RegisterSuccess")
  }

  function toggleAuthPassword() {
    setIsAuthPasswordHidden(!isAuthPasswordHidden)
  }

  function toggleConfirmPassword() {
    setIsConfirmPasswordHidden(!isConfirmPasswordHidden)
  }

  return {
    // Refs
    passwordInput,
    confirmPasswordInput,
    // State
    isAuthPasswordHidden,
    isConfirmPasswordHidden,
    isSubmitted,
    email,
    password,
    passwordConfirmation,
    validationError,
    signUpError,
    // Actions
    setProp,
    register,
    toggleAuthPassword,
    toggleConfirmPassword,
  }
}