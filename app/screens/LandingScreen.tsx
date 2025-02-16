import { observer } from "mobx-react-lite"
import { FC } from "react"
import { TextStyle } from "react-native"
import { Button, Screen, Text } from "../components"
import { AppStackScreenProps } from "../navigators"
import type { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { $SCREEN_CONTENT_CONTAINER, BRAND } from "@/constants/common"
import { useHeader } from "@/utils/useHeader"
interface LandingScreenProps extends AppStackScreenProps<"Landing"> {}

export const LandingScreen: FC<LandingScreenProps> = observer(function LoginScreen(_props) {
  const { themed } = useAppTheme()
  const { navigation } = _props

  useHeader({
    titleTx: "landingScreen:header",
  })

  return (
    <Screen preset="auto" contentContainerStyle={themed($SCREEN_CONTENT_CONTAINER)}>
      <Text
        tx="landingScreen:title"
        txOptions={{ brand: BRAND }}
        preset="heading"
        style={themed($bottomSpace)}
      />

      <Text tx="landingScreen:lookingForARoom" preset="subheading" style={themed($bottomSpace)} />

      <Button tx="landingScreen:bookNow" disabled />

      <Text tx="landingScreen:haveAnAccount" preset="subheading" style={themed($bottomSpace)} />

      <Button tx="landingScreen:signIn" onPress={() => navigation.navigate("Login")} />

      <Text tx="landingScreen:notHaveAnAccount" preset="subheading" style={themed($bottomSpace)} />

      <Button tx="landingScreen:signUp" onPress={() => navigation.navigate("Register")} />
    </Screen>
  )
})

const $bottomSpace: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})
