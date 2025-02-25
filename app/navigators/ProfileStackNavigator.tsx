import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ProfileScreen } from "@/screens/TabScreens/ProfileScreen"
import { SettingsScreen } from "@/screens/TabScreens/SettingsScreen"
import { HelpScreen } from "@/screens/TabScreens/HelpScreen"
import type { ProfileStackParamList } from "./types"

const Stack = createNativeStackNavigator<ProfileStackParamList>()

export function ProfileStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Help" component={HelpScreen} />
    </Stack.Navigator>
  )
}
