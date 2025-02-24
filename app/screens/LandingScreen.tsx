import { observer } from "mobx-react-lite"
import { FC } from "react"
import { Button, Screen, Text } from "../components"
import { AppStackScreenProps } from "../navigators"
import { BRAND } from "@/constants/common"
interface LandingScreenProps extends AppStackScreenProps<"Landing"> {}

export const LandingScreen: FC<LandingScreenProps> = observer(function LoginScreen(_props) {
  const { navigation } = _props

  return (
    <Screen preset="auto" className="px-4">
      <Text tx="landingScreen:title" txOptions={{ brand: BRAND }} preset="heading" />

      <Text tx="landingScreen:lookingForARoom" preset="subheading" />

      <Button tx="landingScreen:bookNow" disabled />

      <Text tx="landingScreen:haveAnAccount" preset="subheading" />

      <Button tx="landingScreen:signIn" onPress={() => navigation.navigate("Login")} />

      <Text tx="landingScreen:notHaveAnAccount" preset="subheading" />

      <Button tx="landingScreen:signUp" onPress={() => navigation.navigate("Register")} />
    </Screen>
  )
})
