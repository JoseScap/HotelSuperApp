/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { NavigationContainer, NavigatorScreenParams } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import * as Screens from "@/screens"
import Config from "../config"
import { useStores } from "../models"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { ComponentProps, Fragment } from "react"
import { BottomHomeParamList, BottomHomeNavigator } from "./BottomNavigator"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Landing: undefined
  Login: undefined
  Register: undefined
  RegisterSuccess: undefined
  BottomNavigator: NavigatorScreenParams<BottomHomeParamList>
  // New screens for booking flow
  SelectDates: undefined
  SelectRoom: { checkIn: string; checkOut: string }
  Payment: { roomId: string; checkIn: string; checkOut: string }
  BookingConfirmation: { bookingId: string }
  // Check-in flow
  CheckIn: { bookingId: string }
  CheckInConfirmation: { bookingId: string }
  // Additional screens
  Notifications: undefined
  Chat: undefined
  // 🔥 Your screens go here
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  const {
    authenticationStore: { isAuthenticated },
  } = useStores()

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: "#FFFFFF",
        contentStyle: {
          backgroundColor: "#FFFFFF",
        },
      }}
      initialRouteName={isAuthenticated ? "BottomNavigator" : "Landing"}
    >
      {isAuthenticated ? (
        <Fragment>
          <Stack.Screen name="BottomNavigator" component={BottomHomeNavigator} />
          <Stack.Screen name="Notifications" component={Screens.NotificationsScreen} />
          <Stack.Screen name="Chat" component={Screens.ChatScreen} />
          <Stack.Screen name="CheckIn" component={Screens.CheckInScreen} />
          <Stack.Screen name="CheckInConfirmation" component={Screens.CheckInConfirmationScreen} />
        </Fragment>
      ) : (
        <Fragment>
          <Stack.Screen name="Landing" component={Screens.LandingScreen} />
          <Stack.Screen name="Login" component={Screens.LoginScreen} />
          <Stack.Screen name="Register" component={Screens.RegisterScreen} />
          <Stack.Screen name="RegisterSuccess" component={Screens.RegisterSuccessScreen} />
          <Stack.Screen name="SelectDates" component={Screens.SelectDatesScreen} />
          <Stack.Screen name="SelectRoom" component={Screens.SelectRoomScreen} />
          <Stack.Screen name="Payment" component={Screens.PaymentScreen} />
          <Stack.Screen name="BookingConfirmation" component={Screens.BookingConfirmationScreen} />
        </Fragment>
      )}
    </Stack.Navigator>
  )
})

export interface NavigationProps extends Partial<ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer ref={navigationRef} {...props}>
      <AppStack />
    </NavigationContainer>
  )
})
