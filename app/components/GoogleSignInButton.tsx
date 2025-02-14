import { GoogleSignin, GoogleSigninButton, statusCodes } from "@react-native-google-signin/google-signin"
import { supabase } from "@/utils/supabaseClient"
import { useStores } from "@/models"
import { TextStyle, ViewStyle } from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ThemedStyle } from "@/theme"
import { TxKeyPath } from "@/i18n"
import { Text } from "./Text"
import React, { useState } from "react"

export function GoogleSignInButton() {
  const { themed } = useAppTheme()
  const [googleSignInError, setGoogleSignInError] = useState<TxKeyPath | undefined>()
  const {
    authenticationStore: { setAuthToken },
  } = useStores()

  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || "",
    offlineAccess: true,
  })

  return (
    <>
      <GoogleSigninButton
        style={themed($button)}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={async () => {
          try {
            const userInfo = await GoogleSignin.signIn()
            if (userInfo?.data?.idToken) {
              const { data } = await supabase.auth.signInWithIdToken({
                provider: 'google',
                token: userInfo.data.idToken,
              })
              setAuthToken(data.session?.access_token || "")
            } else {
              throw new Error('no ID token present!')
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
    </>
  )
}

const $button: ThemedStyle<ViewStyle> = () => ({
  width: "100%",
  height: 48,
})

const $errorText: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginTop: spacing.sm,
})
