import { FC, useState } from "react"
import { View, Text, TouchableOpacity, ScrollView, Switch, Image } from "react-native"
import { BottomHomeTabScreenProps } from "@/navigators/BottomNavigator"
import { Screen, Icon } from "@/components"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useProfileScreen } from "@/hooks/useProfileScreen"
import { translate } from "@/i18n"

// Types for the profile options
interface ProfileOption {
  icon: string
  title: string
  screen?: string
  value?: boolean | string
  toggle?: boolean
  action?: () => void
}

// User details
interface UserProfile {
  name: string
  email: string
  avatar: any
  status: string
}

// Mock booking history data
const _DUMMY_BOOKING_HISTORY = [
  {
    id: "B001",
    hotelName: translate("profileScreen:bookingHistory:grandHotel"),
    checkIn: "2023-05-15",
    checkOut: "2023-05-20",
    status: translate("profileScreen:bookingHistory:status:completed"),
  },
  {
    id: "B002",
    hotelName: translate("profileScreen:bookingHistory:cityResort"),
    checkIn: "2023-06-10",
    checkOut: "2023-06-12",
    status: translate("profileScreen:bookingHistory:status:upcoming"),
  },
  {
    id: "B003",
    hotelName: translate("profileScreen:bookingHistory:oceanView"),
    checkIn: "2023-07-22",
    checkOut: "2023-07-27",
    status: translate("profileScreen:bookingHistory:status:cancelled"),
  },
]

export const ProfileScreen: FC<BottomHomeTabScreenProps<"Profile">> = function ProfileScreen({
  navigation,
}) {
  const insets = useSafeAreaInsets()
  const [_darkMode, _setDarkMode] = useState(false)
  const [_notifications, _setNotifications] = useState(true)
  const [language, _setLanguage] = useState(translate("profileScreen:settings:language:spanish"))
  const { handleLogout } = useProfileScreen()

  // Function to get color based on booking status
  const _getStatusColor = (status: string) => {
    switch (status) {
      case translate("profileScreen:bookingHistory:status:completed"):
        return "text-green-600"
      case translate("profileScreen:bookingHistory:status:upcoming"):
        return "text-blue-600"
      case translate("profileScreen:bookingHistory:status:cancelled"):
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  // User profile mock data
  const userProfile: UserProfile = {
    name: "Ana García",
    email: "ana.garcia@example.com",
    avatar: { uri: "https://randomuser.me/api/portraits/women/44.jpg" },
    status: translate("profileScreen:userProfile:status:goldMember"),
  }

  // Profile options
  const profileOptions: ProfileOption[] = [
    {
      icon: "person",
      title: translate("profileScreen:settings:personalInfo"),
    },
    {
      icon: "credit-card",
      title: translate("profileScreen:settings:paymentMethods"),
    },
    {
      icon: "translate",
      title: translate("profileScreen:settings:language:title"),
      value: language,
    },
    {
      icon: "notifications",
      title: translate("profileScreen:settings:notifications"),
      toggle: true,
      value: true,
    },
    {
      icon: "privacy-tip",
      title: translate("profileScreen:settings:privacySecurity"),
    },
    {
      icon: "help",
      title: translate("profileScreen:settings:helpCenter"),
    },
    {
      icon: "exit-to-app",
      title: translate("profileScreen:settings:logout"),
      action: () => handleLogout(() => navigation.navigate("Landing")),
    },
  ]

  return (
    <Screen className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false} className="bg-primary">
        {/* Header with status bar padding */}
        <View className="pt-2 pb-6 px-4" style={{ paddingTop: insets.top }}>
          <Text className="text-white text-xl font-bold mb-4">
            {translate("profileScreen:header:title")}
          </Text>

          {/* User info card */}
          <View className="bg-white rounded-xl p-4 flex-row items-center">
            <Image source={userProfile.avatar} className="w-16 h-16 rounded-full" />
            <View className="ml-4 flex-1">
              <Text className="font-bold text-lg">{userProfile.name}</Text>
              <Text className="text-gray-500">{userProfile.email}</Text>
              <View className="flex-row items-center mt-1">
                <Icon icon="star" iconSet="MaterialIcons" isVectorIcon size={16} color="#FFD700" />
                <Text className="text-gray-500 text-xs ml-1">{userProfile.status}</Text>
              </View>
            </View>
            <Icon icon="edit" iconSet="MaterialIcons" isVectorIcon size={24} color="#9e9e9e" />
          </View>
        </View>

        {/* Profile Options */}
        <View className="p-4 bg-white rounded-t-3xl h-full">
          <Text className="font-bold text-lg mb-2">
            {translate("profileScreen:settings:title")}
          </Text>

          <View className="bg-white rounded-xl">
            {profileOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                className={`p-4 flex-row items-center justify-between ${
                  index !== profileOptions.length - 1 ? "border-b border-gray-100" : ""
                }`}
                onPress={option.action}
              >
                <View className="flex-row items-center">
                  <Icon
                    icon={option.icon}
                    iconSet="MaterialIcons"
                    isVectorIcon
                    size={24}
                    color="#304FFE"
                    className="mr-3"
                  />
                  <Text>{option.title}</Text>
                </View>

                {option.toggle ? (
                  <Switch
                    value={option.value as boolean}
                    onValueChange={() => {}}
                    trackColor={{ false: "#D1D5DB", true: "#C7D2FE" }}
                    thumbColor={option.value ? "#304FFE" : "#9CA3AF"}
                  />
                ) : option.value ? (
                  <View className="flex-row items-center">
                    <Text className="text-gray-500 mr-2">{option.value}</Text>
                    <Icon
                      icon="chevron-right"
                      iconSet="MaterialIcons"
                      isVectorIcon
                      size={20}
                      color="#9e9e9e"
                    />
                  </View>
                ) : (
                  <Icon
                    icon="chevron-right"
                    iconSet="MaterialIcons"
                    isVectorIcon
                    size={20}
                    color="#9e9e9e"
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* App version */}
        <View className="p-4 items-center mt-4">
          <Text className="text-gray-400 text-sm">
            {translate("profileScreen:appVersion", { version: "1.0.0" })}
          </Text>
        </View>
      </ScrollView>
    </Screen>
  )
}
