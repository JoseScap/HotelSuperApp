import { FC } from "react"
import { Image, ImageStyle, View, ViewStyle } from "react-native"
import { Screen } from "@/components/Screen"
import { $styles, ThemedStyle } from "@/theme"
import { useHeader } from "@/utils/useHeader"
import { useAppTheme } from "@/utils/useAppTheme"
import { useBottomProps } from "@/hooks/useBottomProps"
import { BottomHomeTabScreenProps } from "@/navigators/BottomNavigator"

const logo = require("../../../assets/images/logo.png")

export const HomeScreen: FC<BottomHomeTabScreenProps<"Home">> = function HomeScreen(_props) {
  useHeader({
    leftTx: "homeScreen:title",
  })
  const { themed } = useAppTheme()
  const bottomProps = useBottomProps()

  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top"]}
      contentContainerStyle={$styles.flex1}
      {...bottomProps}
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
