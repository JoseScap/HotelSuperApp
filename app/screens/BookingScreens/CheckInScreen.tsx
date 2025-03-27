import { FC, useState } from "react"
import { Alert, ActivityIndicator } from "react-native"
import { AppStackScreenProps } from "@/navigators/AppNavigator"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Header } from "@/components/Header"
import { Icon } from "@/components/Icon"
import {
  StyledView,
  StyledText,
  StyledScrollView,
  StyledTouchableOpacity,
} from "@/components/StyledComponents"
import { colors } from "@/constants/colors"
interface BookingDetails {
  id: string
  guestName: string
  roomType: string
  checkInDate: string
  checkOutDate: string
  totalPrice: number
  isPaid: boolean
}

export const CheckInScreen: FC<AppStackScreenProps<"CheckIn">> = function CheckInScreen({
  navigation,
  route,
}) {
  const insets = useSafeAreaInsets()
  const { bookingId } = route.params
  const [loading, setLoading] = useState(false)

  // Mock booking details
  const bookingDetails: BookingDetails = {
    id: bookingId,
    guestName: "John Doe",
    roomType: "Deluxe Suite",
    checkInDate: "2023-05-25",
    checkOutDate: "2023-05-28",
    totalPrice: 450.0,
    isPaid: true,
  }

  // Process check-in function
  const handleCheckIn = () => {
    if (!bookingDetails.isPaid) {
      Alert.alert(
        "Payment Required",
        "Please complete payment before check-in",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false },
      )
      return
    }

    setLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      setLoading(false)
      navigation.navigate("CheckInConfirmation", {
        bookingId: bookingDetails.id,
      })
    }, 2000)
  }

  return (
    <StyledView className="flex-1 bg-white">
      {/* Header with back button */}
      <StyledView className="bg-primary">
        <Header
          leftIcon="caretLeft"
          leftIconColor={colors.white}
          onLeftPress={() => navigation.goBack()}
          title="Check-in"
          backgroundClassName="bg-primary"
          titleClassName="text-white"
        />
      </StyledView>

      {/* Scrollable content */}
      <StyledScrollView showsVerticalScrollIndicator={true} className="pb-5">
        {/* Booking Details */}
        <StyledView className="bg-primary/10 p-4 mb-4">
          <StyledText className="font-bold text-lg mb-3">Booking Details</StyledText>

          <StyledView className="flex-row justify-between mb-2">
            <StyledText className="text-gray-600">Booking Reference:</StyledText>
            <StyledText className="font-medium">{bookingDetails.id}</StyledText>
          </StyledView>

          <StyledView className="flex-row justify-between mb-2">
            <StyledText className="text-gray-600">Guest Name:</StyledText>
            <StyledText className="font-medium">{bookingDetails.guestName}</StyledText>
          </StyledView>

          <StyledView className="flex-row justify-between mb-2">
            <StyledText className="text-gray-600">Room Type:</StyledText>
            <StyledText className="font-medium">{bookingDetails.roomType}</StyledText>
          </StyledView>

          <StyledView className="flex-row justify-between mb-2">
            <StyledText className="text-gray-600">Check-in Date:</StyledText>
            <StyledText className="font-medium">{bookingDetails.checkInDate}</StyledText>
          </StyledView>

          <StyledView className="flex-row justify-between mb-2">
            <StyledText className="text-gray-600">Check-out Date:</StyledText>
            <StyledText className="font-medium">{bookingDetails.checkOutDate}</StyledText>
          </StyledView>

          <StyledView className="flex-row justify-between mb-2">
            <StyledText className="text-gray-600">Total Price:</StyledText>
            <StyledText className="font-medium">${bookingDetails.totalPrice.toFixed(2)}</StyledText>
          </StyledView>

          <StyledView className="flex-row justify-between">
            <StyledText className="text-gray-600">Payment Status:</StyledText>
            <StyledView className="flex-row items-center">
              <StyledView
                className={`w-3 h-3 rounded-full ${
                  bookingDetails.isPaid ? "bg-green-500" : "bg-red-500"
                } mr-2`}
              />
              <StyledText className={bookingDetails.isPaid ? "text-green-600" : "text-red-600"}>
                {bookingDetails.isPaid ? "Paid" : "Unpaid"}
              </StyledText>
            </StyledView>
          </StyledView>
        </StyledView>

        {/* Check-In Requirements */}
        <StyledView className="p-4 mb-6">
          <StyledText className="font-bold text-lg mb-3">Check-In Requirements</StyledText>

          <StyledView className="bg-gray-50 p-4 rounded-lg mb-4">
            <StyledView className="flex-row items-center mb-3">
              <Icon icon="check" size={20} className="text-green-500 mr-2" />
              <StyledText>Booking confirmation</StyledText>
            </StyledView>

            <StyledView className="flex-row items-center mb-3">
              <Icon icon="check" size={20} className="text-green-500 mr-2" />
              <StyledText>Payment completed</StyledText>
            </StyledView>

            <StyledView className="flex-row items-center mb-3">
              <Icon icon="check" size={20} className="text-green-500 mr-2" />
              <StyledText>Valid ID/Passport</StyledText>
            </StyledView>

            <StyledView className="flex-row items-center">
              <Icon icon="check" size={20} className="text-green-500 mr-2" />
              <StyledText>Credit card for incidentals</StyledText>
            </StyledView>
          </StyledView>

          <StyledText className="text-gray-500 text-sm">
            Please have all these documents ready to complete your check-in process.
          </StyledText>
        </StyledView>
      </StyledScrollView>

      {/* Bottom button */}
      <StyledView
        className="bg-white p-4 flex-col items-center"
        style={{ paddingBottom: insets.bottom + 10 }}
      >
        <StyledTouchableOpacity
          className={`p-4 rounded-lg justify-center items-center ${
            loading ? "bg-gray-300" : "bg-primary"
          } `}
          onPress={handleCheckIn}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <StyledText className="font-semibold text-white">Complete Check-In</StyledText>
          )}
        </StyledTouchableOpacity>

        <StyledText className="text-center text-gray-500 text-xs ml-3 mt-3">
          By checking in, you agree to our hotel policies and terms of service.
        </StyledText>
      </StyledView>
    </StyledView>
  )
}
