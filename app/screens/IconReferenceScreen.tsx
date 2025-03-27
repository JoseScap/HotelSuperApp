import { FC, useState } from "react"
import { View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native"
import { Screen, Icon } from "@/components"
import { IconSet } from "@/components/IconProvider"

// Common icons from each icon set that are useful for the hotel app
const MATERIAL_ICONS = [
  "hotel",
  "room-service",
  "restaurant",
  "pool",
  "spa",
  "fitness-center",
  "business-center",
  "local-bar",
  "local-cafe",
  "local-laundry-service",
  "meeting-room",
  "wifi",
  "cleaning-services",
  "pets",
  "smoke-free",
  "ac-unit",
  "phone",
  "email",
  "notifications",
  "chat",
  "credit-card",
  "account-balance-wallet",
  "receipt",
  "history",
  "person",
  "settings",
  "help",
  "info",
  "home",
  "explore",
]

const FONTAWESOME5_ICONS = [
  "hotel",
  "concierge-bell",
  "utensils",
  "swimming-pool",
  "spa",
  "dumbbell",
  "briefcase",
  "glass-martini",
  "coffee",
  "tshirt",
  "business-time",
  "wifi",
  "broom",
  "paw",
  "smoking-ban",
  "snowflake",
  "phone",
  "envelope",
  "bell",
  "comments",
  "credit-card",
  "wallet",
  "receipt",
  "history",
  "user",
  "cog",
  "question-circle",
  "info-circle",
  "home",
  "compass",
]

const IONICONS_ICONS = [
  "bed",
  "restaurant",
  "wine",
  "water",
  "flower",
  "fitness",
  "briefcase",
  "beer",
  "cafe",
  "shirt",
  "business",
  "wifi",
  "paw",
  "no-smoking",
  "snow",
  "call",
  "mail",
  "notifications",
  "chatbubbles",
  "card",
  "wallet",
  "receipt",
  "time",
  "person",
  "settings",
  "help-circle",
  "information-circle",
  "home",
  "compass",
]

interface IconSectionProps {
  title: string
  icons: string[]
  iconSet: IconSet
  searchText: string
}

const IconSection: FC<IconSectionProps> = ({ title, icons, iconSet, searchText }) => {
  // Filter icons based on search text
  const filteredIcons = icons.filter((icon) =>
    icon.toLowerCase().includes(searchText.toLowerCase()),
  )

  if (filteredIcons.length === 0) return null

  return (
    <View className="mb-6">
      <Text className="text-lg font-bold mb-3">{title}</Text>
      <View className="flex-row flex-wrap">
        {filteredIcons.map((icon) => (
          <View key={icon} className="w-1/4 items-center mb-4">
            <View className="h-12 w-12 rounded-full bg-gray-100 items-center justify-center mb-1">
              <Icon icon={icon} iconSet={iconSet} isVectorIcon size={24} color="#10B981" />
            </View>
            <Text className="text-xs text-center" numberOfLines={1}>
              {icon}
            </Text>
          </View>
        ))}
      </View>
    </View>
  )
}

export const IconReferenceScreen: FC = function IconReferenceScreen() {
  const [searchText, setSearchText] = useState("")
  const [activeTab, setActiveTab] = useState<IconSet>("MaterialIcons")

  return (
    <Screen preset="scroll" contentClassName="pb-6">
      <View className="bg-white p-4">
        <Text className="text-xl font-bold mb-4">Icon Reference</Text>

        <TextInput
          placeholder="Search icons..."
          value={searchText}
          onChangeText={setSearchText}
          className="bg-gray-100 p-3 rounded-lg mb-4"
        />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
          {["MaterialIcons", "FontAwesome5", "Ionicons"].map((set) => (
            <TouchableOpacity
              key={set}
              onPress={() => setActiveTab(set as IconSet)}
              className={`px-4 py-2 rounded-lg mr-2 ${activeTab === set ? "bg-primary" : "bg-gray-200"}`}
            >
              <Text className={`${activeTab === set ? "text-white" : "text-gray-700"}`}>{set}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View className="p-4">
        {activeTab === "MaterialIcons" && (
          <IconSection
            title="Material Icons"
            icons={MATERIAL_ICONS}
            iconSet="MaterialIcons"
            searchText={searchText}
          />
        )}

        {activeTab === "FontAwesome5" && (
          <IconSection
            title="FontAwesome5 Icons"
            icons={FONTAWESOME5_ICONS}
            iconSet="FontAwesome5"
            searchText={searchText}
          />
        )}

        {activeTab === "Ionicons" && (
          <IconSection
            title="Ionicons Icons"
            icons={IONICONS_ICONS}
            iconSet="Ionicons"
            searchText={searchText}
          />
        )}

        <Text className="text-sm text-gray-500 text-center mt-4">
          This is just a subset of available icons. For the full collection, visit the documentation
          of each icon library.
        </Text>
      </View>
    </Screen>
  )
}
