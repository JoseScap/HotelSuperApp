import { ThemedStyle } from "@/theme"
import { GoogleSigninButton } from "@react-native-google-signin/google-signin"
import { ViewStyle } from "react-native"

export const BRAND = "Tuzgle"
export const GOOGLE_SIGNIN_SIZE = GoogleSigninButton.Size.Wide
export const GOOGLE_SIGNIN_COLOR = GoogleSigninButton.Color.Dark

export const $SCREEN_CONTENT_CONTAINER: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.sm,
  paddingHorizontal: spacing.md,
})
