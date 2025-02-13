import { FC } from "react"
import { Image, ImageStyle, Platform, View, ViewStyle } from "react-native"
import { Screen } from "@/components/Screen"
import { $styles, ThemedStyle } from "@/theme"
import { HomeTabScreenProps } from "@/navigators/HomeNavigator"
import { useHeader } from "@/utils/useHeader"
import { useAppTheme } from "@/utils/useAppTheme"

const logo = require("../../../assets/images/logo.png")

const isAndroid = Platform.OS === "android"

export const HomeScreen: FC<HomeTabScreenProps<"Home">> = function HomeScreen(_props) {
  useHeader({
    leftTx: "homeScreen:title",
  })
  const { themed } = useAppTheme()

  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top"]}
      contentContainerStyle={$styles.flex1}
      {...(isAndroid ? { KeyboardAvoidingViewProps: { behavior: undefined } } : {})}
    >
      <View style={themed($logoContainer)}>
        <Image source={logo} style={$logoImage} />
      </View>
    </Screen>
  )
}

const $logoImage: ImageStyle = {
  height: 42,
  width: 77,
}

const $logoContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignSelf: "flex-start",
  justifyContent: "center",
  height: 56,
  paddingHorizontal: spacing.lg,
})
