import { FC } from "react"
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

interface RoomDetails {
  roomNumber: string
  roomType: string
  floorLevel: string
  keyAccessCode: string
}

export const CheckInConfirmationScreen: FC<AppStackScreenProps<"CheckInConfirmation">> =
  function CheckInConfirmationScreen({ navigation, route }) {
    const insets = useSafeAreaInsets()
    const { bookingId: _bookingId } = route.params

    // Mock room details
    const roomDetails: RoomDetails = {
      roomNumber: "304",
      roomType: "Deluxe Suite",
      floorLevel: "3rd Floor",
      keyAccessCode: "1038-7925",
    }

    // Function to navigate to home
    const handleGoToHome = () => {
      navigation.navigate("BottomNavigator", { screen: "Home" })
    }

    // Function to view all amenities
    const handleViewAmenities = () => {
      navigation.navigate("BottomNavigator", { screen: "Explore" })
    }

    return (
      <StyledView className="flex-1 bg-white">
        {/* Header with back button */}
        <StyledView className="pt-[20px]" style={{ paddingTop: insets.top }}>
          <Header
            leftIcon="caretLeft"
            leftIconColor="#000"
            onLeftPress={() => navigation.goBack()}
            title="Confirmación"
            titleClassName="text-black"
            backgroundColor="white"
          />
        </StyledView>

        {/* Scrollable content */}
        <StyledScrollView showsVerticalScrollIndicator={true} className="pb-5">
          <StyledView className="bg-white p-4 flex-row items-center">
            <StyledText className="text-xl font-bold">Check-In Complete</StyledText>
          </StyledView>

          {/* Success Message */}
          <StyledView className="items-center p-6 bg-primary/10">
            <StyledView className="bg-green-100 w-20 h-20 rounded-full items-center justify-center mb-4">
              <Icon icon="check" size={40} className="text-green-500" />
            </StyledView>

            <StyledText className="text-xl font-bold text-center mb-2">
              Welcome to our Hotel!
            </StyledText>
            <StyledText className="text-gray-600 text-center">
              Your check-in has been completed successfully. Enjoy your stay!
            </StyledText>
          </StyledView>

          {/* Room Information */}
          <StyledView className="p-4 mb-4">
            <StyledText className="font-bold text-lg mb-3">Your Room</StyledText>

            <StyledView className="bg-white p-4 rounded-lg shadow mb-4">
              <StyledView className="flex-row mb-4">
                <StyledView className="h-16 w-16 bg-primary/20 rounded-lg items-center justify-center mr-4">
                  <Icon icon="bell" size={32} className="text-primary" />
                </StyledView>

                <StyledView className="flex-1">
                  <StyledText className="text-gray-500 text-sm">Room Number</StyledText>
                  <StyledText className="text-2xl font-bold">{roomDetails.roomNumber}</StyledText>
                  <StyledText className="text-gray-600">{roomDetails.floorLevel}</StyledText>
                </StyledView>
              </StyledView>

              <StyledView className="flex-row justify-between items-center border-t border-gray-100 pt-3">
                <StyledText className="text-gray-600">Room Type</StyledText>
                <StyledText className="font-medium">{roomDetails.roomType}</StyledText>
              </StyledView>
            </StyledView>
          </StyledView>

          {/* Digital Key */}
          <StyledView className="p-4 mb-4">
            <StyledText className="font-bold text-lg mb-3">Your Digital Key</StyledText>

            <StyledView className="bg-white p-4 rounded-lg shadow items-center">
              <StyledView className="w-full bg-primary/10 p-4 rounded-lg mb-4">
                <StyledText className="text-center font-medium mb-2">Access Code</StyledText>
                <StyledText className="text-center text-2xl font-bold tracking-widest">
                  {roomDetails.keyAccessCode}
                </StyledText>
              </StyledView>

              <StyledView className="flex-row items-center justify-center mb-3">
                <Icon icon="bell" size={20} className="text-gray-500 mr-2" />
                <StyledText className="text-gray-600">
                  Use the hotel app to unlock your door
                </StyledText>
              </StyledView>

              <StyledView className="flex-row items-center justify-center">
                <Icon icon="debug" size={20} className="text-gray-500 mr-2" />
                <StyledText className="text-gray-600">
                  You can also get a physical key at reception
                </StyledText>
              </StyledView>
            </StyledView>
          </StyledView>

          {/* Hotel Amenities Quick Access */}
          <StyledView className="p-4 mb-4">
            <StyledText className="font-bold text-lg mb-3">Hotel Amenities</StyledText>

            <StyledView className="flex-row justify-between">
              <StyledView className="w-[30%] items-center">
                <StyledView className="h-14 w-14 bg-blue-100 rounded-full items-center justify-center mb-2">
                  <Icon icon="debug" size={24} className="text-blue-500" />
                </StyledView>
                <StyledText className="text-center text-sm">Swimming Pool</StyledText>
              </StyledView>

              <StyledView className="w-[30%] items-center">
                <StyledView className="h-14 w-14 bg-red-100 rounded-full items-center justify-center mb-2">
                  <Icon icon="menu" size={24} className="text-red-500" />
                </StyledView>
                <StyledText className="text-center text-sm">Restaurant</StyledText>
              </StyledView>

              <StyledView className="w-[30%] items-center">
                <StyledView className="h-14 w-14 bg-green-100 rounded-full items-center justify-center mb-2">
                  <Icon icon="heart" size={24} className="text-green-500" />
                </StyledView>
                <StyledText className="text-center text-sm">Spa</StyledText>
              </StyledView>
            </StyledView>

            <StyledTouchableOpacity
              className="mt-4 p-3 border border-gray-300 rounded-lg flex-row items-center justify-center"
              onPress={handleViewAmenities}
            >
              <StyledText className="text-gray-600 mr-2">View All Amenities</StyledText>
              <Icon icon="caretRight" size={16} className="text-gray-500" />
            </StyledTouchableOpacity>
          </StyledView>
        </StyledScrollView>

        {/* Bottom button */}
        <StyledView className="p-4" style={{ paddingBottom: insets.bottom + 10 }}>
          <StyledTouchableOpacity
            className="bg-primary p-4 rounded-lg flex-row items-center justify-center"
            onPress={handleGoToHome}
          >
            <StyledText className="text-white font-bold">Volver al inicio</StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>
    )
  }
