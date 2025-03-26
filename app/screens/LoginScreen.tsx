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
import { translate } from "@/i18n"
import { NavigatorScreenParams } from "@react-navigation/native"
import { BottomHomeParamList } from "@/navigators/BottomNavigator"

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

  const handleLogin = async () => {
    if (!email || !password) return

    const success = await login()
    if (success) {
      // Navigate to main app or handle successful login
      navigation.replace("BottomNavigator", {
        screen: "Home",
      } as NavigatorScreenParams<BottomHomeParamList>)
    }
  }

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
        onSubmitEditing={handleLogin}
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
        onPress={handleLogin}
        disabled={isSubmitted}
      />

      {loginError && (
        <Text
          text={translate(loginError)}
          preset="default"
          className="mt-2 text-red-500 text-center"
        />
      )}

      <StyledView className="my-2 items-center justify-center">
        <Text size="sm" weight="bold" tx="loginScreen:or" />
      </StyledView>

      {!isIos && <GoogleSignInButton />}
    </Screen>
  )
})
