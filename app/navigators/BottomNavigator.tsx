import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { AppStackParamList, AppStackScreenProps, BottomHomeParamList } from "./types"
import { translate } from "@/i18n"
import { Icon } from "@/components"
import { HomeScreen } from "@/screens/TabScreens/HomeScreen"
import { ProfileScreen } from "@/screens/TabScreens/ProfileScreen"
import { ActivitiesScreen } from "@/screens/TabScreens/ActivitiesScreen"
import { useAppColors } from "@/hooks/useAppColors"

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
 * This is the main navigator for the app screens with a bottom tab bar.
 * Each tab is a stack navigator with its own set of screens.
 *
 * More info: https://reactnavigation.org/docs/bottom-tab-navigator/
 * @returns {JSX.Element} The rendered `BottomHomeNavigator`.
 */
export function BottomHomeNavigator() {
  const { bottom } = useSafeAreaInsets()
  const { primary, text } = useAppColors()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: "white",
          borderTopColor: "transparent",
          height: bottom + 70,
        },
        tabBarActiveTintColor: text.primary,
        tabBarInactiveTintColor: text.secondary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "Helvetica",
          lineHeight: 16,
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
              icon="BsChevronCompactDown"
              color={focused ? primary : text.secondary}
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
            <Icon icon="BsCalendarPlus" color={focused ? primary : text.secondary} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: translate("homeNavigator:profileTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="BsHeart" color={focused ? primary : text.secondary} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
