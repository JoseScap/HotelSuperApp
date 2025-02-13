import { GoogleSignin, GoogleSigninButton, statusCodes } from "@react-native-google-signin/google-signin"
import { supabase } from "@/utils/supabaseClient"
import { useStores } from "@/models"

export function GoogleSignInButton() {
  const {
    authenticationStore: { setAuthToken },
  } = useStores()

  return (
    <GoogleSigninButton
      style={{ width: "100%", height: 48 }}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={async () => {
        try {
          await GoogleSignin.hasPlayServices()
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
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            // some other error happened
          }
        }
      }}
    />
  )
}
