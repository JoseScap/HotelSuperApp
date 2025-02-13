import { FC } from "react"
import { Platform } from "react-native"
import { Screen } from "@/components/Screen"
import { $styles } from "@/theme"
import { HomeTabScreenProps } from "@/navigators/HomeNavigator"
import { useHeader } from "@/utils/useHeader"
import { useStores } from "@/models"

const isAndroid = Platform.OS === "android"

export const ProfileScreen: FC<HomeTabScreenProps<"Profile">> = function HomeScreen(_props) {
  const {
    authenticationStore: { logout },
  } = useStores()

  useHeader(
    {
      leftTx: "profileScreen:title",
      rightTx: "common:logOut",
      onRightPress: logout,
    },
    [logout],
  )

  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top"]}
      contentContainerStyle={$styles.flex1}
      {...(isAndroid ? { KeyboardAvoidingViewProps: { behavior: undefined } } : {})}
    ></Screen>
  )
}
