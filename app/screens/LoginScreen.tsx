import { observer } from "mobx-react-lite"
import { ComponentType, FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, View, ViewStyle } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps, GoogleSignInButton } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import type { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { supabase } from "@/utils/supabaseClient"
import { GoogleSignin } from "@react-native-google-signin/google-signin"

interface LoginScreenProps extends AppStackScreenProps<"Login"> { }

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const authPasswordInput = useRef<TextInput>(null)

  const [authPassword, setAuthPassword] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const {
    authenticationStore: { authEmail, setAuthEmail, setAuthToken, validationError },
  } = useStores()

  const {
    themed,
    theme: { colors },
  } = useAppTheme()

  useEffect(() => {
    setAuthEmail("test@tuzgle.com")
  }, [setAuthEmail])

  async function login() {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    if (validationError) return

    const { data, error } = await supabase.auth.signInWithPassword({
      email: authEmail,
      password: authPassword,
    })

    if (error) {
      console.error("Login error:", error.message)
      return
    }

    setIsSubmitted(false)
    setAuthPassword("")
    setAuthEmail("")
    setAuthToken(data.session?.access_token || "")
  }

  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || "",
  })

  const PasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden, colors.palette.neutral800],
  )

  return (
    <Screen
      preset="auto"
      contentContainerStyle={themed($screenContentContainer)}
      safeAreaEdges={["top", "bottom"]}
    >
      <Text testID="login-heading" tx="loginScreen:logIn" preset="heading" style={themed($logIn)} />
      <Text tx="loginScreen:enterDetails" preset="subheading" style={themed($enterDetails)} />
      {attemptsCount > 2 && (
        <Text tx="loginScreen:hint" size="sm" weight="light" style={themed($hint)} />
      )}

      <TextField
        value={authEmail}
        onChangeText={setAuthEmail}
        containerStyle={themed($textField)}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        labelTx="loginScreen:emailFieldLabel"
        placeholderTx="loginScreen:emailFieldPlaceholder"
        helperTx={isSubmitted ? validationError : undefined}
        status={isSubmitted && validationError ? "error" : undefined}
        onSubmitEditing={() => authPasswordInput.current?.focus()}
      />

      <TextField
        ref={authPasswordInput}
        value={authPassword}
        onChangeText={setAuthPassword}
        containerStyle={themed($textField)}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isAuthPasswordHidden}
        labelTx="loginScreen:passwordFieldLabel"
        placeholderTx="loginScreen:passwordFieldPlaceholder"
        onSubmitEditing={login}
        RightAccessory={PasswordRightAccessory}
      />

      <Button
        testID="login-button"
        tx="loginScreen:tapToLogIn"
        style={themed($tapButton)}
        preset="reversed"
        onPress={login}
      />

      <View style={themed($separator)}>
        <Text size="sm" weight="bold" tx="loginScreen:or" />
      </View>

      <GoogleSignInButton />
    </Screen>
  )
})

const $screenContentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
})

const $logIn: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})

const $enterDetails: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
})

const $hint: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.tint,
  marginBottom: spacing.md,
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
