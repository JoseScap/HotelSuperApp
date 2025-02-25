import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Icon } from "@/components/Icon"
import { useAppColors } from "@/hooks/useAppColors"
import { HomeStackNavigator } from "./HomeStackNavigator"
import { BookingStackNavigator } from "./BookingStackNavigator"
import { ProfileStackNavigator } from "./ProfileStackNavigator"
import type { BottomTabParamList } from "./types"

const Tab = createBottomTabNavigator<BottomTabParamList>()

export function BottomTabNavigator() {
  const colors = useAppColors()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "#64748B",
        tabBarStyle: {
          backgroundColor: "white",
          borderTopColor: "#E2E8F0",
        },
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: "Inicio",
          tabBarIcon: ({ color, size }) => <Icon icon="BsHome" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="BookingStack"
        component={BookingStackNavigator}
        options={{
          tabBarLabel: "Reservas",
          tabBarIcon: ({ color, size }) => <Icon icon="BsCalendarPlus" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color, size }) => <Icon icon="BsPerson" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  )
}
