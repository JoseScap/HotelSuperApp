import { observer } from "mobx-react-lite"
import { ComponentType, FC } from "react"
import { TextStyle, ViewStyle, View } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps, GoogleSignInButton } from "../components"
import { AppStackScreenProps } from "../navigators"
import type { ThemedStyle } from "@/theme"
import { useRegisterScreen } from "@/hooks/useRegisterScreen"
import { useAppTheme } from "@/utils/useAppTheme"

interface RegisterScreenProps extends AppStackScreenProps<"Register"> {}

export const RegisterScreen: FC<RegisterScreenProps> = observer(function RegisterScreen(props) {
  const {
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
  } = useRegisterScreen(props)

  const {
    themed,
    theme: { colors },
  } = useAppTheme()

  const PasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = function PasswordRightAccessory(
    props: TextFieldAccessoryProps,
  ) {
    return (
      <Icon
        icon={isAuthPasswordHidden ? "view" : "hidden"}
        color={colors.palette.neutral800}
        containerStyle={props.style}
        size={20}
        onPress={toggleAuthPassword}
      />
    )
  }

  const ConfirmPasswordRightAccessory: ComponentType<TextFieldAccessoryProps> =
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
    }

  return (
    <Screen
      preset="auto"
      contentContainerStyle={themed($screenContentContainer)}
      safeAreaEdges={["top", "bottom"]}
    >
      <Text testID="register-heading" tx="registrationScreen:signUp" preset="heading" style={themed($signUp)} />
      <Text tx="registrationScreen:enterDetails" preset="subheading" style={themed($enterDetails)} />

      <TextField
        value={email}
        onChangeText={(value) => setProp("email", value)}
        containerStyle={themed($textField)}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        labelTx="registrationScreen:emailFieldLabel"
        placeholderTx="registrationScreen:emailFieldPlaceholder"
        helper={isSubmitted ? validationError : undefined}
        status={isSubmitted && validationError ? "error" : undefined}
        onSubmitEditing={() => passwordInput.current?.focus()}
      />

      <TextField
        ref={passwordInput}
        value={password}
        onChangeText={(value) => setProp("password", value)}
        containerStyle={themed($textField)}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isAuthPasswordHidden}
        labelTx="registrationScreen:passwordFieldLabel"
        placeholderTx="registrationScreen:passwordFieldPlaceholder"
        onSubmitEditing={() => confirmPasswordInput.current?.focus()}
        RightAccessory={PasswordRightAccessory}
      />

      <TextField
        ref={confirmPasswordInput}
        value={passwordConfirmation}
        onChangeText={(value) => setProp("passwordConfirmation", value)}
        containerStyle={themed($textField)}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isConfirmPasswordHidden}
        labelTx="registrationScreen:confirmPasswordFieldLabel"
        placeholderTx="registrationScreen:confirmPasswordFieldPlaceholder"
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

