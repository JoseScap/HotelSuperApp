import { FC } from "react"
import { ViewStyle } from "react-native"
import { EmptyState, Screen } from "../components"
import { AppStackScreenProps } from "../navigators"
import type { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { $SCREEN_CONTENT_CONTAINER } from "@/constants/common"

const checkIcon = require("../../assets/icons/check.png")

interface RegisterSuccessScreenProps extends AppStackScreenProps<"RegisterSuccess"> {}

export const RegisterSuccessScreen: FC<RegisterSuccessScreenProps> = function RegisterSuccessScreen(
  _props,
) {
  const { themed } = useAppTheme()
  const { navigation } = _props

  return (
    <Screen preset="auto" contentContainerStyle={themed($SCREEN_CONTENT_CONTAINER)}>
      <EmptyState
        headingTx="registerSuccessScreen:heading"
        contentTx="registerSuccessScreen:content"
        buttonTx="registerSuccessScreen:button"
        buttonOnPress={() => navigation.navigate("Login")}
        style={themed($emptyState)}
        imageSource={checkIcon}
      />
    </Screen>
  )
}

const $emptyState: ThemedStyle<ViewStyle> = () => ({
  height: "100%",
})
