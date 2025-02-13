import { FC } from "react"
import { Platform } from "react-native"
import { Screen } from "@/components/Screen"
import { $styles } from "@/theme"
import { HomeTabScreenProps } from "@/navigators/HomeNavigator"
import { useHeader } from "@/utils/useHeader"

const isAndroid = Platform.OS === "android"

export const HomeScreen: FC<HomeTabScreenProps<"Home">> = function HomeScreen(_props) {
  useHeader({
    leftTx: "homeScreen:title",
  })

  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top"]}
      contentContainerStyle={$styles.flex1}
      {...(isAndroid ? { KeyboardAvoidingViewProps: { behavior: undefined } } : {})}
    ></Screen>
  )
}
