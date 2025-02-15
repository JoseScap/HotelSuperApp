import { observer } from "mobx-react-lite"
import { ComponentType, FC, useMemo } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps, GoogleSignInButton } from "../components"
import { AppStackScreenProps } from "../navigators"
import type { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
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

  const {
    themed,
    theme: { colors },
  } = useAppTheme()

  const PasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={togglePassword}
          />
        )
      },
    [isPasswordHidden, colors.palette.neutral800],
  )

  const ConfirmPasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function ConfirmPasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isConfirmPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={toggleConfirmPassword}
          />
        )
      },
    [isConfirmPasswordHidden, colors.palette.neutral800],
  )

  return (
    <Screen
      preset="auto"
      contentContainerStyle={themed($screenContentContainer)}
      safeAreaEdges={["top", "bottom"]}
    >
      <Text testID="register-heading" tx="registrationScreen:signUp" preset="heading" style={themed($signUp)} />
      <Text tx="registrationScreen:enterDetails" preset="subheading" style={themed($enterDetails)} />

      <TextField
        ref={emailInput}
        value={email ?? ""}
        onChangeText={setEmail}
        containerStyle={themed($textField)}
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
        containerStyle={themed($textField)}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isPasswordHidden}
        labelTx="registrationScreen:passwordFieldLabel"
        placeholderTx="registrationScreen:passwordFieldPlaceholder"
        helperTx={isSubmitted ? passwordValidation : undefined}
        status={isSubmitted && passwordValidation ? "error" : undefined}
        onSubmitEditing={() => confirmPasswordInput.current?.focus()}
        RightAccessory={PasswordRightAccessory}
      />

      <TextField
        ref={confirmPasswordInput}
        value={confirmPassword ?? ""}
        onChangeText={setConfirmPassword}
        containerStyle={themed($textField)}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isConfirmPasswordHidden}
        labelTx="registrationScreen:confirmPasswordFieldLabel"
        placeholderTx="registrationScreen:confirmPasswordFieldPlaceholder"
        helperTx={isSubmitted ? confirmPasswordValidation : undefined}
        status={isSubmitted && confirmPasswordValidation ? "error" : undefined}
        onSubmitEditing={register}
        RightAccessory={ConfirmPasswordRightAccessory}
      />

      <Button
        testID="register-button"
        tx="registrationScreen:tapToSignUp"
        style={themed($tapButton)}
        preset="reversed"
        onPress={register}
      />

      {signUpError && (
        <Text
          tx={signUpError}
          preset="default"
          style={themed($errorText)}
        />
      )}

      <View style={themed($separator)}>
        <Text size="sm" weight="bold" tx="registrationScreen:or" />
      </View>

      <GoogleSignInButton />
    </Screen>
  )
})

const $screenContentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
})

const $signUp: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})

const $enterDetails: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
})

const $textField: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
})

const $tapButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.xs,
})

const $separator: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginVertical: spacing.sm,
  alignItems: "center",
  justifyContent: "center",
})

const $errorText: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.error,
  marginTop: spacing.xs,
  textAlign: "center",
})

