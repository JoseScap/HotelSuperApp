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
import { useHeader } from "@/utils/useHeader"
import { styled } from "nativewind"
import { BsCaretLeft } from "react-icons/bs"

const StyledView = styled(View)

interface RegisterScreenProps extends AppStackScreenProps<"Register"> {}

export const RegisterScreen: FC<RegisterScreenProps> = observer(function RegisterScreen(props) {
  const { navigation } = props
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

  useHeader({
    leftIcon: BsCaretLeft,
    rightTx: "registrationScreen:signUp",
    onLeftPress: () => navigation.goBack(),
  })

  return (
    <Screen preset="auto" safeAreaEdges={["top"]} className="bg-sky-500">
      {/* Header colored section */}
      <StyledView className="bg-sky-500 h-24" />

      {/* Content section */}
      <StyledView className="flex-1 bg-white px-4 rounded-t-3xl h-full">
        <StyledView className="mt-8 mb-2">
          <Text testID="register-heading" tx="registrationScreen:signUp" preset="heading" />
        </StyledView>

        <StyledView className="mb-6">
          <Text tx="registrationScreen:enterDetails" preset="subheading" />
        </StyledView>

        <TextField
          ref={emailInput}
          value={email ?? ""}
          onChangeText={setEmail}
          containerClassName="mb-6"
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
          containerClassName="mb-6"
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
          containerClassName="mb-6"
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
          preset="filled"
          onPress={register}
        />

        {signUpError && (
          <StyledView className="mt-2">
            <Text tx={signUpError} preset="default" className="text-error text-center" />
          </StyledView>
        )}

        <StyledView className="items-center justify-center my-4">
          <Text size="sm" weight="bold" tx="registrationScreen:or" />
        </StyledView>

        {!isIos && <GoogleSignInButton />}
      </StyledView>
    </Screen>
  )
})
