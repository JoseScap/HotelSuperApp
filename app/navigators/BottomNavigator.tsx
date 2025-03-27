import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { translate } from "@/i18n"
import { Icon } from "@/components"
import { HomeScreen } from "@/screens/TabScreens/HomeScreen"
import { ProfileScreen } from "@/screens/TabScreens/ProfileScreen"
import { ExploreScreen } from "@/screens/TabScreens/ExploreScreen"
import { PaymentsScreen } from "@/screens/TabScreens/PaymentsScreen"
import { View } from "react-native"

export type BottomHomeParamList = {
  Home: undefined
  Payments: undefined
  Explore: undefined
  Profile: undefined
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type BottomHomeTabScreenProps<T extends keyof BottomHomeParamList> = CompositeScreenProps<
  BottomTabScreenProps<BottomHomeParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<BottomHomeParamList>()

/**
 * This is the main navigator for the hotel app with a bottom tab bar.
 * Each tab is a stack navigator with its own set of screens.
 *
 * More info: https://reactnavigation.org/docs/bottom-tab-navigator/
 * @returns {JSX.Element} The rendered `BottomHomeNavigator`.
 */
export function BottomHomeNavigator() {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "transparent",
          height: bottom + 70,
          paddingTop: 12,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 5,
        },
        tabBarActiveTintColor: "#304FFE", // Primary blue color from the design
        tabBarInactiveTintColor: "#9E9E9E",
        tabBarLabelStyle: {
          fontFamily: "Montserrat-Regular",
          fontSize: 12,
          marginTop: 4,
          marginBottom: 6,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: translate("homeNavigator:homeTab"),
          tabBarIcon: ({ focused, color }) => (
            <View className={`p-1 ${focused ? "bg-blue-50 rounded-full" : ""}`}>
              <Icon icon="home" iconSet="MaterialIcons" isVectorIcon size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarLabel: translate("homeNavigator:exploreTab"),
          tabBarIcon: ({ focused, color }) => (
            <View className={`p-1 ${focused ? "bg-blue-50 rounded-full" : ""}`}>
              <Icon icon="search" iconSet="MaterialIcons" isVectorIcon size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Payments"
        component={PaymentsScreen}
        options={{
          tabBarLabel: translate("homeNavigator:paymentsTab"),
          tabBarIcon: ({ focused, color }) => (
            <View className={`p-1 ${focused ? "bg-blue-50 rounded-full" : ""}`}>
              <Icon
                icon="credit-card"
                iconSet="MaterialIcons"
                isVectorIcon
                size={24}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: translate("homeNavigator:profileTab"),
          tabBarIcon: ({ focused, color }) => (
            <View className={`p-1 ${focused ? "bg-blue-50 rounded-full" : ""}`}>
              <Icon icon="person" iconSet="MaterialIcons" isVectorIcon size={24} color={color} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  )
}
