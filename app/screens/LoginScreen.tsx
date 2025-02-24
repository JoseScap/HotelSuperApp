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
import { useLoginScreen } from "@/hooks/useLoginScreen"
import { useHeader } from "@/utils/useHeader"
import { styled } from "nativewind"

const StyledView = styled(View)

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const { navigation } = _props
  const {
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
  } = useLoginScreen()

  const isIos = Platform.OS === "ios"

  useHeader({
    leftIcon: "caretLeft",
    rightTx: "loginScreen:logIn",
    onLeftPress: () => navigation.goBack(),
  })

  return (
    <Screen preset="auto" contentClassName="px-4 py-6">
      <Text testID="login-heading" tx="loginScreen:logIn" preset="heading" className="mb-2" />
      <Text tx="loginScreen:enterDetails" preset="subheading" className="mb-6" />

      <TextField
        ref={emailInput}
        value={email ?? ""}
        onChangeText={setEmail}
        containerClassName="mb-6"
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        labelTx="loginScreen:emailFieldLabel"
        placeholderTx="loginScreen:emailFieldPlaceholder"
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
        secureTextEntry={isAuthPasswordHidden}
        labelTx="loginScreen:passwordFieldLabel"
        placeholderTx="loginScreen:passwordFieldPlaceholder"
        helperTx={isSubmitted ? passwordValidation : undefined}
        status={isSubmitted && passwordValidation ? "error" : undefined}
        onSubmitEditing={login}
        RightAccessory={PasswordRightAccessory({
          isPasswordHidden: isAuthPasswordHidden,
          onTogglePassword: togglePassword,
        })}
      />

      <Button
        testID="login-button"
        tx="loginScreen:tapToLogIn"
        className="mt-2"
        preset="reversed"
        onPress={login}
      />

      {loginError && (
        <Text tx={loginError} preset="default" className="mt-2 text-red-500 text-center" />
      )}

      <StyledView className="my-2 items-center justify-center">
        <Text size="sm" weight="bold" tx="loginScreen:or" />
      </StyledView>

      {!isIos && <GoogleSignInButton />}
    </Screen>
  )
})
