/* eslint-disable react-native/no-color-literals */
import { FC, useState } from "react"
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from "react-native"
import { BottomHomeTabScreenProps } from "@/navigators/BottomNavigator"
import { Icon } from "@/components"
import { translate, TxKeyPath } from "@/i18n"
import { useSafeAreaInsets } from "react-native-safe-area-context"

interface ExploreItem {
  id: string
  title: string
  description: string
  type: "amenity" | "facility" | "service"
  imageUrl: string
  rating?: number
}

const CATEGORIES = [
  { id: "all", translationKey: "exploreScreen:categories:all" },
  { id: "amenity", translationKey: "exploreScreen:categories:amenities" },
  { id: "facility", translationKey: "exploreScreen:categories:facilities" },
  { id: "service", translationKey: "exploreScreen:categories:services" },
]

const DUMMY_EXPLORE_ITEMS: ExploreItem[] = [
  {
    id: "1",
    title: translate("exploreScreen:items:pool:title"),
    description: translate("exploreScreen:items:pool:description"),
    type: "amenity",
    imageUrl:
      "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    rating: 4.8,
  },
  {
    id: "2",
    title: translate("exploreScreen:items:gym:title"),
    description: translate("exploreScreen:items:gym:description"),
    type: "facility",
    imageUrl:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    rating: 4.5,
  },
  {
    id: "3",
    title: translate("exploreScreen:items:spa:title"),
    description: translate("exploreScreen:items:spa:description"),
    type: "service",
    imageUrl:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    rating: 4.9,
  },
  {
    id: "4",
    title: translate("exploreScreen:items:restaurant:title"),
    description: translate("exploreScreen:items:restaurant:description"),
    type: "facility",
    imageUrl:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    rating: 4.7,
  },
  {
    id: "5",
    title: translate("exploreScreen:items:businessCenter:title"),
    description: translate("exploreScreen:items:businessCenter:description"),
    type: "facility",
    imageUrl:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    rating: 4.4,
  },
  {
    id: "6",
    title: translate("exploreScreen:items:roomService:title"),
    description: translate("exploreScreen:items:roomService:description"),
    type: "service",
    imageUrl:
      "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    rating: 4.6,
  },
]

export const ExploreScreen: FC<BottomHomeTabScreenProps<"Explore">> = function ExploreScreen() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const insets = useSafeAreaInsets()

  const filteredItems =
    selectedCategory === "all"
      ? DUMMY_EXPLORE_ITEMS
      : DUMMY_EXPLORE_ITEMS.filter((item) => item.type === selectedCategory)

  const renderExploreItem = ({ item }: { item: ExploreItem }) => (
    <TouchableOpacity style={styles.card} className="mr-4">
      <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
      <View className="p-3">
        <View className="flex-row justify-between items-center mb-1">
          <Text className="font-bold text-base">{item.title}</Text>
          <View className="flex-row items-center">
            <Icon
              icon="star"
              iconSet="MaterialIcons"
              isVectorIcon
              size={14}
              color="#FFC107"
              containerClassName="mr-1"
            />
            <Text className="text-gray-700 text-xs">{item.rating}</Text>
          </View>
        </View>
        <Text className="text-gray-500 text-xs" numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <View className="flex-1 bg-primary">
      {/* Header with curved background */}
      <View style={{ paddingTop: insets.top + 10 }} className="px-5 pt-5 pb-6">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-white text-xl font-bold">
            {translate("exploreScreen:header:title")}
          </Text>
          <TouchableOpacity>
            <Icon
              icon="notifications-none"
              iconSet="MaterialIcons"
              isVectorIcon
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-white/20 rounded-xl p-3 mb-4">
          <Icon
            icon="search"
            iconSet="MaterialIcons"
            isVectorIcon
            size={20}
            color="white"
            containerClassName="mr-2"
          />
          <Text className="text-white/70">
            {translate("exploreScreen:header:searchPlaceholder")}
          </Text>
        </View>
      </View>

      {/* Main content ScrollView */}
      <ScrollView showsVerticalScrollIndicator={true} className="bg-white rounded-t-3xl">
        {/* Categories */}
        <View className="px-6 py-4">
          <Text className="text-xl font-bold mb-4">
            {translate("exploreScreen:categories:title")}
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category.id}
                className={`px-5 py-2 mr-3 rounded-full ${
                  selectedCategory === category.id ? "bg-primary" : "bg-gray-100"
                }`}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text
                  className={`font-medium ${
                    selectedCategory === category.id ? "text-white" : "text-gray-700"
                  }`}
                >
                  {translate(category.translationKey as TxKeyPath)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Featured */}
          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold">
                {translate("exploreScreen:sections:featured:title")}
              </Text>
              <TouchableOpacity>
                <Text className="text-primary">
                  {translate("exploreScreen:sections:featured:viewAll")}
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pr-4">
              {filteredItems.slice(0, 3).map((item) => renderExploreItem({ item }))}
            </ScrollView>
          </View>

          {/* All Facilities */}
          <View>
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold">
                {translate("exploreScreen:sections:allFacilities:title")}
              </Text>
              <View className="flex-row items-center">
                <Icon
                  icon="filter-list"
                  iconSet="MaterialIcons"
                  isVectorIcon
                  size={18}
                  color="#304FFE"
                  containerClassName="mr-1"
                />
                <Text className="text-primary">
                  {translate("exploreScreen:sections:allFacilities:filter")}
                </Text>
              </View>
            </View>

            <View className="flex-row flex-wrap justify-between">
              {filteredItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={[styles.gridCard, { width: "48%" }]}
                  className="mb-4"
                >
                  <Image source={{ uri: item.imageUrl }} style={styles.gridImage} />
                  <View className="p-2">
                    <View className="flex-row justify-between items-center mb-1">
                      <Text className="font-bold text-sm" numberOfLines={1}>
                        {item.title}
                      </Text>
                      <View className="flex-row items-center">
                        <Icon
                          icon="star"
                          iconSet="MaterialIcons"
                          isVectorIcon
                          size={12}
                          color="#FFC107"
                          containerClassName="mr-1"
                        />
                        <Text className="text-gray-700 text-xs">{item.rating}</Text>
                      </View>
                    </View>
                    <Text className="text-gray-500 text-xs" numberOfLines={1}>
                      {item.type}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={{ paddingBottom: insets.bottom + 80 }} />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    elevation: 2,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: 220,
  },
  cardImage: {
    height: 120,
    width: "100%",
  },
  gridCard: {
    backgroundColor: "white",
    borderRadius: 12,
    elevation: 2,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  gridImage: {
    height: 100,
    width: "100%",
  },
})
