import { FC } from "react"
import { Platform, TextStyle } from "react-native"
import { Screen } from "@/components/Screen"
import { $styles, ThemedStyle } from "@/theme"
import { HomeTabScreenProps } from "@/navigators/HomeNavigator"
import { Text } from "@/components"
import { useAppTheme } from "@/utils/useAppTheme"

const isAndroid = Platform.OS === "android"

export const HomeScreen: FC<HomeTabScreenProps<"Home">> = function HomeScreen(_props) {
  const { themed } = useAppTheme()

  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top"]}
      contentContainerStyle={$styles.flex1}
      {...(isAndroid ? { KeyboardAvoidingViewProps: { behavior: undefined } } : {})}
    >
      <Text tx="homeScreen:title" preset="heading" style={themed($title)} />
    </Screen>
  )
}

const $title: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})
