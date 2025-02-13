import { FC } from "react"
import { Platform, TextStyle } from "react-native"
import { Screen } from "@/components/Screen"
import { $styles, ThemedStyle } from "@/theme"
import { HomeTabScreenProps } from "@/navigators/HomeNavigator"
import { Text } from "@/components"
import { useAppTheme } from "@/utils/useAppTheme"
import { useHeader } from "@/utils/useHeader"
import { useStores } from "@/models"

const isAndroid = Platform.OS === "android"

export const ProfileScreen: FC<HomeTabScreenProps<"Profile">> = function HomeScreen(_props) {
  const { themed } = useAppTheme()

  const {
    authenticationStore: { logout },
  } = useStores()

  useHeader(
    {
      rightTx: "common:logOut",
      onRightPress: logout,
    },
    [logout],
  )

  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top"]}
      contentContainerStyle={$styles.container}
      {...(isAndroid ? { KeyboardAvoidingViewProps: { behavior: undefined } } : {})}
    >
      <Text tx="profileScreen:title" preset="heading" style={themed($title)} />
    </Screen>
  )
}

const $title: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})
