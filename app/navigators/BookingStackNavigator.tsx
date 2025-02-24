import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { BookingScreen } from "@/screens/TabScreens/BookingScreen"
import { BookingDetailScreen } from "@/screens/TabScreens/BookingDetailScreen"
import { BookingFlowScreen } from "@/screens/TabScreens/BookingFlowScreen"
import { BookingConfirmationScreen } from "@/screens/TabScreens/BookingConfirmationScreen"
import type { BookingStackParamList } from "./types"

const Stack = createNativeStackNavigator<BookingStackParamList>()

export function BookingStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="BookingScreen" component={BookingScreen} />
      <Stack.Screen name="BookingDetail" component={BookingDetailScreen} />
      <Stack.Screen name="BookingFlow" component={BookingFlowScreen} />
      <Stack.Screen name="BookingConfirmation" component={BookingConfirmationScreen} />
    </Stack.Navigator>
  )
}
