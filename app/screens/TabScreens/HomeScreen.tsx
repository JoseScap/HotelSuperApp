import { View, ScrollView, TextInput, Image } from "react-native"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { styled } from "nativewind"
import { activities, popularDestinations, recommendations } from "@/data/mockData"
import { ActivityCard } from "@/components/ActivityCard"
import { DestinationCard } from "@/components/DestinationCard"
import { Icon } from "@/components/Icon"
import { translate } from "@/i18n"
import { useHotelConfig } from "@/hooks/useHotelConfig"
import { useNavigation } from "@react-navigation/native"
import type { Activity } from "@/types/activities"
import type { Destination } from "@/types/destinations"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { HomeStackParamList } from "@/navigators/types"

const StyledView = styled(View)
const StyledScrollView = styled(ScrollView)
const StyledTextInput = styled(TextInput)
const StyledImage = styled(Image)

const AVATAR_PLACEHOLDER = "https://ui-avatars.com/api/?name=Guest&background=38BDF8&color=fff"

const ACTIVITY_CARD_WIDTH = 280

export function HomeScreen() {
  const { name: hotelName } = useHotelConfig()
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>()

  const handleActivityPress = (activity: Activity) => {
    navigation.navigate("ActivityDetail", { activityId: activity.id })
  }

  const handleDestinationPress = (destination: Destination) => {
    navigation.navigate("DestinationDetail", { destinationId: destination.id })
  }

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} className="bg-white">
      {/* Header */}
      <StyledView className="bg-sky-500 px-4 py-6">
        <StyledView className="flex-row items-center justify-between">
          <StyledView className="flex-row items-center">
            <StyledImage
              source={{ uri: AVATAR_PLACEHOLDER }}
              className="w-12 h-12 rounded-full mr-3 border-2 border-white"
            />
            <StyledView>
              <Text preset="formHelper" tx="homeScreen:welcome" className="text-white opacity-90" />
              <Text preset="heading" className="text-2xl text-white">
                {hotelName}
              </Text>
            </StyledView>
          </StyledView>
          <Icon icon="BsBell" size={24} color="white" />
        </StyledView>

        {/* Search Bar */}
        <StyledView className="mt-6">
          <StyledTextInput
            placeholder={translate("homeScreen:searchPlaceholder")}
            className="bg-white/90 rounded-full px-4 py-2 text-neutral-900"
            placeholderTextColor="#6B7280"
          />
        </StyledView>
      </StyledView>

      {/* Activities */}
      <StyledView className="mt-6 mb-8 px-4">
        <StyledView className="flex-row justify-between items-center mb-4">
          <Text preset="subheading" tx="homeScreen:activities" className="text-sky-900" />
          <Icon icon="BsMenuApp" size={24} color="#0F172A" />
        </StyledView>
        <StyledScrollView horizontal showsHorizontalScrollIndicator={false}>
          {activities.map((activity) => (
            <StyledView key={activity.id} className="mr-4" style={{ width: ACTIVITY_CARD_WIDTH }}>
              <ActivityCard activity={activity} onPress={handleActivityPress} />
            </StyledView>
          ))}
        </StyledScrollView>
      </StyledView>

      {/* Popular Destinations */}
      <StyledView className="mb-8">
        <StyledView className="flex-row justify-between items-center px-4 mb-4">
          <Text preset="subheading" tx="homeScreen:popularDestinations" className="text-sky-900" />
          <Icon icon="BsMenuApp" size={24} color="#0F172A" />
        </StyledView>
        <StyledScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-4">
          {popularDestinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              onPress={handleDestinationPress}
            />
          ))}
        </StyledScrollView>
      </StyledView>

      {/* Recommendations */}
      <StyledView className="mb-8">
        <StyledView className="flex-row justify-between items-center px-4 mb-4">
          <Text preset="subheading" tx="homeScreen:recommendations" className="text-sky-900" />
          <Icon icon="BsMenuApp" size={24} color="#0F172A" />
        </StyledView>
        <StyledScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-4">
          {recommendations.map((recommendation) => (
            <DestinationCard
              key={recommendation.id}
              destination={recommendation}
              onPress={handleDestinationPress}
            />
          ))}
        </StyledScrollView>
      </StyledView>
    </Screen>
  )
}
