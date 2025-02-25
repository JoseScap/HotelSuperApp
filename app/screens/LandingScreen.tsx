import { observer } from "mobx-react-lite"
import { FC } from "react"
import { Button, Screen, Text } from "../components"
import { AppStackScreenProps } from "../navigators"
import { BRAND } from "@/constants/common"
import { useHeader } from "@/utils/useHeader"

interface LandingScreenProps extends AppStackScreenProps<"Landing"> {}

export const LandingScreen: FC<LandingScreenProps> = observer(function LoginScreen(_props) {
  const { navigation } = _props

  return (
    <Screen preset="auto" contentClassName="px-4 py-6">
      <Text
        tx="landingScreen:title"
        txOptions={{ brand: BRAND }}
        preset="heading"
        className="mb-2"
      />

      <Text tx="landingScreen:lookingForARoom" preset="subheading" className="mb-2" />

      <Button tx="landingScreen:bookNow" disabled />

      <Text tx="landingScreen:haveAnAccount" preset="subheading" className="mb-2" />

      <Button tx="landingScreen:signIn" onPress={() => navigation.navigate("Login")} />

      <Text tx="landingScreen:notHaveAnAccount" preset="subheading" className="mb-2" />

      <Button tx="landingScreen:signUp" onPress={() => navigation.navigate("Register")} />
    </Screen>
  )
})
