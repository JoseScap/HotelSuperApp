import { FC } from "react"
import { ViewStyle } from "react-native"
import { EmptyState, Screen } from "../components"
import { AppStackScreenProps } from "../navigators"
import type { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"

const checkIcon = require("../../assets/icons/check.png")

interface RegisterSuccessScreenProps extends AppStackScreenProps<"RegisterSuccess"> {}

export const RegisterSuccessScreen: FC<RegisterSuccessScreenProps> = function RegisterSuccessScreen(_props) {
  const { themed } = useAppTheme()
  const { navigation } = _props

  return (
    <Screen
      preset="fixed"
      contentContainerStyle={themed($screenContentContainer)}
      safeAreaEdges={["top", "bottom"]}
    >
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

const $screenContentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.xxl,
})

const $emptyState: ThemedStyle<ViewStyle> = () => ({
  height: "100%",
}) 

const $tapButton: ThemedStyle<ViewStyle> = () => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
})

