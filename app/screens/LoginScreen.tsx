import { observer } from "mobx-react-lite"
import { FC } from "react"
import { View } from "react-native"
import { Button, Screen, Text, TextField, PasswordRightAccessory } from "../components"
import { AppStackScreenProps } from "@/navigators/types"
import { useLoginScreen } from "@/hooks/useLoginScreen"
import { useHeader } from "@/utils/useHeader"
import { styled } from "nativewind"
import { BsCaretLeft } from "react-icons/bs"

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

  useHeader({
    leftIcon: BsCaretLeft,
    rightTx: "loginScreen:logIn",
    onLeftPress: () => navigation.goBack(),
  })

  return (
    <Screen preset="auto" safeAreaEdges={["top"]} className="bg-sky-500">
      {/* Header colored section */}
      <StyledView className="bg-sky-500 h-24" />

      {/* Content section */}
      <StyledView className="flex bg-white h-full px-4 rounded-t-3xl">
        <StyledView className="mt-8 mb-2">
          <Text testID="login-heading" tx="loginScreen:logIn" preset="heading" />
        </StyledView>

        <StyledView className="mb-6">
          <Text tx="loginScreen:enterDetails" preset="subheading" />
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
          preset="filled"
          onPress={login}
        />

        {loginError && (
          <StyledView className="mt-2">
            <Text tx={loginError} preset="default" className="text-error text-center" />
          </StyledView>
        )}

        <StyledView className="items-center justify-center my-4">
          <Text size="sm" weight="bold" tx="loginScreen:or" />
        </StyledView>
      </StyledView>
    </Screen>
  )
})
