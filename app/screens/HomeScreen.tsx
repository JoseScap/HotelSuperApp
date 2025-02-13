import { FC } from "react"
import { Platform } from "react-native"
import { Screen } from "@/components/Screen"
import { $styles } from "@/theme"
import { HomeTabScreenProps } from "@/navigators/HomeNavigator"

const isAndroid = Platform.OS === "android"

export const HomeScreen: FC<HomeTabScreenProps<"Home">> = function HomeScreen(_props) {
  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={$styles.flex1}
      {...(isAndroid ? { KeyboardAvoidingViewProps: { behavior: undefined } } : {})}
    ></Screen>
  )
}
