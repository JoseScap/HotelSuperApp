/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React, { type ReactElement } from "react"
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigationState,
  LinkingOptions,
  InitialState,
} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import { useStores } from "@/models"
import * as Screens from "@/screens"
import { AppStackParamList } from "./types"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { View } from "react-native"
import { styled } from "nativewind"
import { useAppColors } from "@/hooks/useAppColors"
import { Icon } from "@/components/Icon"
import { Text } from "@/components/Text"
import { UserTabParamList, ReservedUserTabParamList, CheckedInTabParamList } from "./types"

const StyledView = styled(View)

const Stack = createNativeStackNavigator<AppStackParamList>()
const UserTab = createBottomTabNavigator<UserTabParamList>()
const ReservedUserTab = createBottomTabNavigator<ReservedUserTabParamList>()
const CheckedInTab = createBottomTabNavigator<CheckedInTabParamList>()

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

const AppStackNavigator = observer(function AppStackNavigator() {
  const {
    authenticationStore: { isAuthenticated, hasReservation, hasCheckedIn },
  } = useStores()

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        contentStyle: {
          backgroundColor: "white",
        },
      }}
      initialRouteName="Landing"
    >
      {isAuthenticated ? (
        <>
          {hasCheckedIn ? (
            <Stack.Screen name="CheckedInTabs" component={CheckedInTabNavigator} />
          ) : hasReservation ? (
            <Stack.Screen name="ReservedUserTabs" component={ReservedUserTabNavigator} />
          ) : (
            <Stack.Screen name="UserTabs" component={UserTabNavigator} />
          )}
          <Stack.Screen name="ActivityDetail" component={Screens.ActivityDetailScreen} />
          <Stack.Screen name="PaymentDetail" component={Screens.PaymentDetailScreen} />
          <Stack.Screen name="ReservationDetail" component={Screens.ReservationDetailScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Landing" component={Screens.LandingScreen} />
          <Stack.Screen name="Login" component={Screens.LoginScreen} />
          <Stack.Screen name="Register" component={Screens.RegisterScreen} />
          <Stack.Screen name="RegisterSuccess" component={Screens.RegisterSuccessScreen} />
        </>
      )}
    </Stack.Navigator>
  )
})

function UserTabNavigator(): ReactElement {
  const { primary } = useAppColors()

  return (
    <UserTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: primary,
          borderTopWidth: 0,
        },
      }}
    >
      <UserTab.Screen
        name="Explore"
        component={Screens.ExploreScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <StyledView className="items-center">
              <Icon
                icon="BsViewList"
                size="md"
                color={focused ? "white" : "rgba(255, 255, 255, 0.6)"}
              />
              <Text className="text-white text-xs mt-1" tx="homeNavigator:homeTab" />
            </StyledView>
          ),
        }}
      />
      <UserTab.Screen
        name="Booking"
        component={Screens.BookingScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <StyledView className="items-center">
              <Icon
                icon="BsMenuApp"
                size="md"
                color={focused ? "white" : "rgba(255, 255, 255, 0.6)"}
              />
              <Text className="text-white text-xs mt-1" tx="homeNavigator:activitiesTab" />
            </StyledView>
          ),
        }}
      />
      <UserTab.Screen
        name="Profile"
        component={Screens.ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <StyledView className="items-center">
              <Icon
                icon="BsAirplaneEngines"
                size={24}
                color={focused ? "white" : "rgba(255, 255, 255, 0.6)"}
              />
              <Text className="text-white text-xs mt-1" tx="homeNavigator:profileTab" />
            </StyledView>
          ),
        }}
      />
    </UserTab.Navigator>
  )
}

function ReservedUserTabNavigator(): ReactElement {
  const { primary } = useAppColors()

  return (
    <ReservedUserTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: primary,
          borderTopWidth: 0,
        },
      }}
    >
      <ReservedUserTab.Screen
        name="Explore"
        component={Screens.ExploreScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <StyledView className="items-center">
              <Icon
                icon="BsViewList"
                size={24}
                color={focused ? "white" : "rgba(255, 255, 255, 0.6)"}
              />
              <Text className="text-white text-xs mt-1" tx="homeNavigator:homeTab" />
            </StyledView>
          ),
        }}
      />
      <ReservedUserTab.Screen
        name="Booking"
        component={Screens.BookingScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <StyledView className="items-center">
              <Icon
                icon="BsMenuApp"
                size="md"
                color={focused ? "white" : "rgba(255, 255, 255, 0.6)"}
              />
              <Text className="text-white text-xs mt-1" tx="homeNavigator:activitiesTab" />
            </StyledView>
          ),
        }}
      />
      <ReservedUserTab.Screen
        name="Reservations"
        component={Screens.ReservationsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <StyledView className="items-center">
              <Icon
                icon="BsChevronCompactDown"
                size={24}
                color={focused ? "white" : "rgba(255, 255, 255, 0.6)"}
              />
              <Text className="text-white text-xs mt-1" tx="homeNavigator:reservations" />
            </StyledView>
          ),
        }}
      />
      <ReservedUserTab.Screen
        name="Profile"
        component={Screens.ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <StyledView className="items-center">
              <Icon
                icon="BsAirplaneEngines"
                size={24}
                color={focused ? "white" : "rgba(255, 255, 255, 0.6)"}
              />
              <Text className="text-white text-xs mt-1" tx="homeNavigator:profileTab" />
            </StyledView>
          ),
        }}
      />
    </ReservedUserTab.Navigator>
  )
}

function CheckedInTabNavigator(): ReactElement {
  const { primary } = useAppColors()

  return (
    <CheckedInTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: primary,
          borderTopWidth: 0,
        },
      }}
    >
      <CheckedInTab.Screen
        name="Explore"
        component={Screens.ExploreScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <StyledView className="items-center">
              <Icon
                icon="BsViewList"
                size={24}
                color={focused ? "white" : "rgba(255, 255, 255, 0.6)"}
              />
              <Text className="text-white text-xs mt-1" tx="homeNavigator:homeTab" />
            </StyledView>
          ),
        }}
      />
      <CheckedInTab.Screen
        name="Payments"
        component={Screens.PaymentsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <StyledView className="items-center">
              <Icon
                icon="BsViewList"
                size={24}
                color={focused ? "white" : "rgba(255, 255, 255, 0.6)"}
              />
              <Text className="text-white text-xs mt-1" tx="homeNavigator:activitiesTab" />
            </StyledView>
          ),
        }}
      />
      <CheckedInTab.Screen
        name="Booking"
        component={Screens.BookingScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <StyledView className="items-center">
              <Icon
                icon="BsMenuApp"
                size={24}
                color={focused ? "white" : "rgba(255, 255, 255, 0.6)"}
              />
              <Text className="text-white text-xs mt-1" tx="homeNavigator:activitiesTab" />
            </StyledView>
          ),
        }}
      />
      <CheckedInTab.Screen
        name="Profile"
        component={Screens.ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <StyledView className="items-center">
              <Icon
                icon="BsAirplaneEngines"
                size={24}
                color={focused ? "white" : "rgba(255, 255, 255, 0.6)"}
              />
              <Text className="text-white text-xs mt-1" tx="homeNavigator:profileTab" />
            </StyledView>
          ),
        }}
      />
    </CheckedInTab.Navigator>
  )
}

export interface NavigatorProps {
  linking: LinkingOptions<AppStackParamList>
  initialState?: InitialState
  onStateChange?: (state: NavigationState | undefined) => void
}

export function AppNavigator({ linking, initialState, onStateChange }: NavigatorProps) {
  return (
    <NavigationContainer
      linking={linking}
      initialState={initialState}
      onStateChange={onStateChange}
      theme={{
        dark: false,
        colors: {
          ...DefaultTheme.colors,
          primary: "white",
          background: "white",
        },
      }}
    >
      <AppStackNavigator />
    </NavigationContainer>
  )
}
