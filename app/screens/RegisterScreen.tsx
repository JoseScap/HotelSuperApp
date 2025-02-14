import { observer } from "mobx-react-lite"
import { ComponentType, FC, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle, View } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps, GoogleSignInButton } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import type { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { supabase } from "@/utils/supabaseClient"
import { TxKeyPath } from "@/i18n"

interface RegisterScreenProps extends AppStackScreenProps<"Register"> {}

export const RegisterScreen: FC<RegisterScreenProps> = observer(function RegisterScreen(_props) {
  const { navigation } = _props
  const passwordInput = useRef<TextInput>(null)
  const confirmPasswordInput = useRef<TextInput>(null)

  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    registrationStore: { email, password, passwordConfirmation, validationError, setProp, reset },
  } = useStores()

  const {
    themed,
    theme: { colors },
  } = useAppTheme()

  async function register() {
    setIsSubmitted(true)

    if (validationError) return

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      console.error("Registration error:", error.message)
      return
    }

    setIsSubmitted(false)
    reset()
    navigation.navigate("RegisterSuccess")
  }

  const PasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = function PasswordRightAccessory(
    props: TextFieldAccessoryProps,
  ) {
    return (
      <Icon
        icon={isAuthPasswordHidden ? "view" : "hidden"}
        color={colors.palette.neutral800}
        containerStyle={props.style}
        size={20}
        onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
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
          onPress={() => setIsConfirmPasswordHidden(!isConfirmPasswordHidden)}
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

