import { FC } from "react"
import { Share } from "react-native"
import { AppStackScreenProps } from "@/navigators/AppNavigator"
import { Icon } from "@/components"
import { translate } from "@/i18n"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import {
  StyledView,
  StyledText,
  StyledTouchableOpacity,
  StyledImage,
  StyledScrollView,
} from "@/components/StyledComponents"

export const BookingConfirmationScreen: FC<AppStackScreenProps<"BookingConfirmation">> =
  function BookingConfirmationScreen({ navigation, route }) {
    const { bookingId } = route.params
    const insets = useSafeAreaInsets()

    // Function to share booking details
    const handleShare = async () => {
      try {
        await Share.share({
          message: translate("bookingConfirmationScreen:shareMessage", { bookingId }),
        })
      } catch (error) {
        console.error(error)
      }
    }

    // Function to view booking details (would navigate to booking details screen in real app)
    // const handleViewBooking = () => {
    //   // For now, just go to login screen since we're in non-authenticated flow
    //   navigation.navigate("Login")
    // }

    // Function to return to home
    const handleReturnHome = () => {
      navigation.navigate("Landing")
    }

    return (
      <StyledView className="flex-1 bg-white">
        <StyledScrollView showsVerticalScrollIndicator={true}>
          <StyledView className="flex-1 justify-between">
            {/* Success content */}
            <StyledView className="flex-1 items-center justify-center px-4">
              <StyledView className="bg-green-100 w-20 h-20 rounded-full items-center justify-center mb-4">
                <Icon icon="check" size={40} className="text-green-500" />
              </StyledView>
              <StyledText className="text-2xl font-bold text-center mb-2">
                {translate("bookingConfirmationScreen:success:title")}
              </StyledText>
              <StyledText className="text-gray-600 text-center mb-8">
                {translate("bookingConfirmationScreen:success:subtitle")}
              </StyledText>

              {/* Booking Details */}
              <StyledView className="bg-gray-50 rounded-xl p-5 w-full mb-8">
                {/* Hotel info */}
                <StyledView className="flex-row justify-between items-center mb-4">
                  <StyledView>
                    <StyledText className="font-bold text-xl">
                      {translate("bookingConfirmationScreen:bookingDetails:hotelName")}
                    </StyledText>
                    <StyledText className="text-gray-500">
                      {translate("bookingConfirmationScreen:bookingDetails:location")}
                    </StyledText>
                  </StyledView>
                  <StyledImage
                    source={{
                      uri: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
                    }}
                    className="w-16 h-16 rounded-lg"
                  />
                </StyledView>

                {/* Check-in/out dates */}
                <StyledView className="border-t border-gray-200 py-3">
                  <StyledText className="font-semibold mb-2">
                    {translate("bookingConfirmationScreen:bookingDetails:dates:label")}
                  </StyledText>
                  <StyledText className="text-gray-600">
                    {translate("bookingConfirmationScreen:bookingDetails:dates:value")}
                  </StyledText>
                </StyledView>

                {/* Room */}
                <StyledView className="border-t border-gray-200 py-3">
                  <StyledText className="font-semibold mb-2">
                    {translate("bookingConfirmationScreen:bookingDetails:room:label")}
                  </StyledText>
                  <StyledText className="text-gray-600">
                    {translate("bookingConfirmationScreen:bookingDetails:room:value")}
                  </StyledText>
                </StyledView>

                {/* Guests */}
                <StyledView className="border-t border-gray-200 py-3">
                  <StyledText className="font-semibold mb-2">
                    {translate("bookingConfirmationScreen:bookingDetails:guests:label")}
                  </StyledText>
                  <StyledText className="text-gray-600">
                    {translate("bookingConfirmationScreen:bookingDetails:guests:value")}
                  </StyledText>
                </StyledView>

                {/* Booking ID */}
                <StyledView className="border-t border-gray-200 py-3">
                  <StyledText className="font-semibold mb-2">
                    {translate("bookingConfirmationScreen:bookingDetails:bookingId:label")}
                  </StyledText>
                  <StyledText className="text-gray-600">
                    {translate("bookingConfirmationScreen:bookingDetails:bookingId:value")}
                  </StyledText>
                </StyledView>
              </StyledView>
            </StyledView>

            {/* Bottom buttons */}
            <StyledView className="px-4 mb-6" style={{ paddingBottom: insets.bottom }}>
              <StyledTouchableOpacity
                className="bg-primary p-4 rounded-lg items-center mb-3"
                onPress={handleReturnHome}
              >
                <StyledText className="text-white font-bold">
                  {translate("bookingConfirmationScreen:buttons:returnHome")}
                </StyledText>
              </StyledTouchableOpacity>

              <StyledTouchableOpacity
                className="flex-row items-center justify-center bg-white p-3 rounded-lg border border-gray-300 mt-2"
                onPress={handleShare}
              >
                <Icon
                  icon="share"
                  iconSet="MaterialIcons"
                  isVectorIcon
                  size={20}
                  color="#304FFE"
                  containerClassName="mr-2"
                />
                <StyledText className="text-primary font-semibold">
                  {translate("bookingConfirmationScreen:buttons:share")}
                </StyledText>
              </StyledTouchableOpacity>
            </StyledView>
          </StyledView>
        </StyledScrollView>
      </StyledView>
    )
  }
