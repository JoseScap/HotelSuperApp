import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { HomeScreen } from "@/screens/TabScreens/HomeScreen"
import { ActivityDetailScreen } from "@/screens/TabScreens/ActivityDetailScreen"
import { DestinationDetailScreen } from "@/screens/TabScreens/DestinationDetailScreen"
import type { HomeStackParamList } from "./types"

const Stack = createNativeStackNavigator<HomeStackParamList>()

export function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ActivityDetail" component={ActivityDetailScreen} />
      <Stack.Screen name="DestinationDetail" component={DestinationDetailScreen} />
    </Stack.Navigator>
  )
}
