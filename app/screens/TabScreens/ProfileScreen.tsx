import { FC } from "react"
import { Platform } from "react-native"
import { Screen } from "@/components/Screen"
import { $styles } from "@/theme"
import { HomeTabScreenProps } from "@/navigators/HomeNavigator"
import { useHeader } from "@/utils/useHeader"
import { useStores } from "@/models"
import { GoogleSignin } from "@react-native-google-signin/google-signin"

const isAndroid = Platform.OS === "android"

export const ProfileScreen: FC<HomeTabScreenProps<"Profile">> = function HomeScreen(_props) {
  const { navigation } = _props
  const {
    authenticationStore: { logout },
  } = useStores()

  async function handleLogout() {
    await logout()
    // tambien debe desloguear el usuario de google
    await GoogleSignin.signOut()
    navigation.navigate("Landing")
  }

  useHeader(
    {
      leftTx: "profileScreen:title",
      rightTx: "common:logOut",
      onRightPress: handleLogout,
    },
    [handleLogout],
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
