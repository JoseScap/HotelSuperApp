import { useState, Fragment } from "react"
import { Platform, TextStyle, ViewStyle } from "react-native"
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin"

import { GOOGLE_SIGNIN_SIZE, GOOGLE_SIGNIN_COLOR } from "@/constants/common"
import { TxKeyPath } from "@/i18n"
import { useStores } from "@/models"
import type { ThemedStyle } from "@/theme"
import { Text } from "./Text"
import { supabase } from "@/utils/supabaseClient"
import { useAppTheme } from "@/utils/useAppTheme"

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

  if (isIos) return <Fragment></Fragment>

  return (
    <Fragment>
      <GoogleSigninButton
        style={themed($button)}
        size={GOOGLE_SIGNIN_SIZE}
        color={GOOGLE_SIGNIN_COLOR}
        onPress={async () => {
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
        }}
      />
      {googleSignInError && (
        <Text tx={googleSignInError} preset="default" style={themed($errorText)} />
      )}
    </Fragment>
  )
}

const $button: ThemedStyle<ViewStyle> = () => ({
  width: "100%",
  height: 48,
})

const $errorText: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginTop: spacing.sm,
})
