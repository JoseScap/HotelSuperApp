import { observer } from "mobx-react-lite"
import { FC } from "react"
import { TextStyle, ViewStyle } from "react-native"
import { Button, Screen, Text } from "../components"
import { AppStackScreenProps } from "../navigators"
import type { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { BRAND } from "@/constants/common"

interface LandingScreenProps extends AppStackScreenProps<"Landing"> {}

export const LandingScreen: FC<LandingScreenProps> = observer(function LoginScreen(_props) {
  const { themed } = useAppTheme()
  const { navigation } = _props

  return (
    <Screen
      preset="auto"
      contentContainerStyle={themed($screenContentContainer)}
      safeAreaEdges={["top", "bottom"]}
    >
      <Text
        testID="login-heading"
        tx="landingScreen:title"
        txOptions={{ brand: BRAND }}
        preset="heading"
        style={themed($bottomSpace)}
      />

      <Text
        testID="login-heading"
        tx="landingScreen:lookingForARoom"
        preset="subheading"
        style={themed($bottomSpace)}
      />

      <Button tx="landingScreen:bookNow" disabled />

      <Text
        testID="login-heading"
        tx="landingScreen:haveAnAccount"
        preset="subheading"
        style={themed($bottomSpace)}
      />

      <Button tx="landingScreen:signIn" onPress={() => navigation.navigate("Login")} />

      <Text
        testID="login-heading"
        tx="landingScreen:notHaveAnAccount"
        preset="subheading"
        style={themed($bottomSpace)}
      />

      <Button tx="landingScreen:signUp" />
    </Screen>
  )
})

const $screenContentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
})

const $bottomSpace: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})
