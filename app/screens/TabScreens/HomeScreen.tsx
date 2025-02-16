import { FC } from "react"
import { Image, ImageStyle, View, ViewStyle } from "react-native"
import { Screen } from "@/components/Screen"
import { ThemedStyle } from "@/theme"
import { useHeader } from "@/utils/useHeader"
import { useAppTheme } from "@/utils/useAppTheme"
import { useBottomProps } from "@/hooks/useBottomProps"
import { BottomHomeTabScreenProps } from "@/navigators/BottomNavigator"
import { $SCREEN_CONTENT_CONTAINER } from "@/constants/common"

const logo = require("../../../assets/images/logo.png")

export const HomeScreen: FC<BottomHomeTabScreenProps<"Home">> = function HomeScreen(_props) {
  const { themed } = useAppTheme()
  const bottomProps = useBottomProps()

  useHeader({
    leftTx: "homeScreen:title",
  })

  return (
    <Screen
      preset="scroll"
      contentContainerStyle={themed($SCREEN_CONTENT_CONTAINER)}
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

const $logoContainer: ThemedStyle<ViewStyle> = () => ({
  alignSelf: "flex-start",
  justifyContent: "center",
  height: 56,
})
