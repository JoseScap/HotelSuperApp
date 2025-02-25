import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { translate } from "@/i18n"
import { Icon } from "@/components"
import { HomeScreen } from "@/screens/TabScreens/HomeScreen"
import { ProfileScreen } from "@/screens/TabScreens/ProfileScreen"
import { ActivitiesScreen } from "@/screens/TabScreens/ActivitiesScreen"

export type BottomHomeParamList = {
  Home: undefined
  Profile: undefined
  Activities: undefined
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
 * This is the main navigator for the demo screens with a bottom tab bar.
 * Each tab is a stack navigator with its own set of screens.
 *
 * More info: https://reactnavigation.org/docs/bottom-tab-navigator/
 * @returns {JSX.Element} The rendered `DemoNavigator`.
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
        },
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "#6B7280",
        tabBarLabelStyle: {
          fontFamily: "Montserrat-Regular",
          fontSize: 12,
          paddingBottom: 8,
        },
        tabBarItemStyle: {
          paddingTop: 16,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: translate("homeNavigator:homeTab"),
          tabBarIcon: ({ focused }) => (
            <Icon
              icon="components"
              className={focused ? "text-primary" : "text-neutral-500"}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Activities"
        component={ActivitiesScreen}
        options={{
          tabBarLabel: translate("homeNavigator:activitiesTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="clap" className={focused ? "text-primary" : "text-neutral-500"} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: translate("homeNavigator:profileTab"),
          tabBarIcon: ({ focused }) => (
            <Icon
              icon="heart"
              className={focused ? "text-primary" : "text-neutral-500"}
              size={30}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
