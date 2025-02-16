import { observer } from "mobx-react-lite"
import { FC } from "react"
import { Platform, View } from "react-native"
import {
  Button,
  Screen,
  Text,
  TextField,
  GoogleSignInButton,
  PasswordRightAccessory,
} from "../components"
import { AppStackScreenProps } from "../navigators"
import { useRegisterScreen } from "@/hooks/useRegisterScreen"

interface RegisterScreenProps extends AppStackScreenProps<"Register"> {}

export const RegisterScreen: FC<RegisterScreenProps> = observer(function RegisterScreen(props) {
  const {
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
  } = useRegisterScreen(props)

  const isIos = Platform.OS === "ios"

  return (
    <Screen preset="auto" className="py-8 px-4" safeAreaEdges={["top", "bottom"]}>
      <Text
        testID="register-heading"
        tx="registrationScreen:signUp"
        preset="heading"
        className="mb-2"
      />
      <Text tx="registrationScreen:enterDetails" preset="subheading" className="mb-6" />

      <TextField
        ref={emailInput}
        value={email ?? ""}
        onChangeText={setEmail}
        className="mb-6"
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        labelTx="registrationScreen:emailFieldLabel"
        placeholderTx="registrationScreen:emailFieldPlaceholder"
        helperTx={isSubmitted ? emailValidation : undefined}
        status={isSubmitted && emailValidation ? "error" : undefined}
        onSubmitEditing={() => passwordInput.current?.focus()}
      />

      <TextField
        ref={passwordInput}
        value={password ?? ""}
        onChangeText={setPassword}
        className="mb-6"
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isPasswordHidden}
        labelTx="registrationScreen:passwordFieldLabel"
        placeholderTx="registrationScreen:passwordFieldPlaceholder"
        helperTx={isSubmitted ? passwordValidation : undefined}
        status={isSubmitted && passwordValidation ? "error" : undefined}
        onSubmitEditing={() => confirmPasswordInput.current?.focus()}
        RightAccessory={PasswordRightAccessory({
          isPasswordHidden: isPasswordHidden,
          onTogglePassword: togglePassword,
        })}
      />

      <TextField
        ref={confirmPasswordInput}
        value={confirmPassword ?? ""}
        onChangeText={setConfirmPassword}
        className="mb-6"
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isConfirmPasswordHidden}
        labelTx="registrationScreen:confirmPasswordFieldLabel"
        placeholderTx="registrationScreen:confirmPasswordFieldPlaceholder"
        helperTx={isSubmitted ? confirmPasswordValidation : undefined}
        status={isSubmitted && confirmPasswordValidation ? "error" : undefined}
        onSubmitEditing={register}
        RightAccessory={PasswordRightAccessory({
          isPasswordHidden: isConfirmPasswordHidden,
          onTogglePassword: toggleConfirmPassword,
        })}
      />

      <Button
        testID="register-button"
        tx="registrationScreen:tapToSignUp"
        className="mt-2"
        preset="reversed"
        onPress={register}
      />

      {signUpError && (
        <Text tx={signUpError} preset="default" className="mt-2 text-center text-error" />
      )}

      <View className="my-2 items-center justify-center">
        <Text size="sm" weight="bold" tx="registrationScreen:or" />
      </View>

      {!isIos && <GoogleSignInButton />}
    </Screen>
  )
})
