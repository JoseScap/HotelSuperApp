import { useState, Fragment } from "react"
import { Platform, TextStyle, ViewStyle } from "react-native"
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin"

import { TxKeyPath } from "@/i18n"
import { useStores } from "@/models"
import { Text } from "./Text"
import { Button } from "./Button"
import { supabase } from "@/utils/supabaseClient"
import { useAppTheme } from "@/utils/useAppTheme"
import { ThemedStyle } from "@/theme"

const isIos = Platform.OS === "ios"

export function GoogleSignInButton() {
  const { themed } = useAppTheme()
  const [googleSignInError, setGoogleSignInError] = useState<TxKeyPath | undefined>()
  const {
    authenticationStore: { setAuthToken, setDisplayName },
  } = useStores()

  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || "",
    offlineAccess: true,
  })

  const handleGoogleSignIn = async () => {
    try {
      const userInfo = await GoogleSignin.signIn()
      if (userInfo?.data?.idToken) {
        const { data } = await supabase.auth.signInWithIdToken({
          provider: "google",
          token: userInfo.data.idToken,
        })
        setAuthToken(data.session?.access_token || "")
        setDisplayName(data.user?.user_metadata?.display_name || "")
      } else {
        throw new Error("no ID token present!")
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setGoogleSignInError("googleSignInButton:error.cancelled")
      } else if (error.code === statusCodes.IN_PROGRESS) {
        setGoogleSignInError("googleSignInButton:error.inProgress")
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setGoogleSignInError("googleSignInButton:error.playServicesNotAvailable")
      } else if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        setGoogleSignInError("googleSignInButton:error.signInRequired")
      } else {
        setGoogleSignInError("googleSignInButton:error.other")
      }
    }
  }

  if (isIos) return <Fragment></Fragment>

  return (
    <Fragment>
      <Button
        preset="default"
        text="Continuar con Google"
        onPress={handleGoogleSignIn}
        style={themed($customButton)}
        textStyle={themed($buttonText)}
      />
      {googleSignInError && (
        <Text tx={googleSignInError} preset="default" style={themed($errorText)} />
      )}
    </Fragment>
  )
}

const $customButton: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.neutral100,
  borderWidth: 1,
  borderColor: colors.palette.neutral400,
  paddingVertical: spacing.xs,
})

const $buttonText: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  color: colors.text,
  fontSize: 16,
  fontFamily: typography.primary.medium,
})

const $errorText: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginTop: spacing.sm,
  textAlign: "center",
})
