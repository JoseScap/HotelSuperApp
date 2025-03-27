import { FC, useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { AppStackScreenProps } from "@/navigators/AppNavigator"
import { Screen, Icon } from "@/components"
import { Calendar } from "react-native-calendars"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export const SelectDatesScreen: FC<AppStackScreenProps<"SelectDates">> =
  function SelectDatesScreen({ navigation }) {
    const [checkInDate, setCheckInDate] = useState("")
    const [checkOutDate, setCheckOutDate] = useState("")
    const [selecting, setSelecting] = useState<"checkIn" | "checkOut">("checkIn")
    const insets = useSafeAreaInsets()

    const handleDateSelect = (day: { dateString: string }) => {
      if (selecting === "checkIn") {
        setCheckInDate(day.dateString)
        setSelecting("checkOut")
      } else {
        // Make sure check-out is after check-in
        if (new Date(day.dateString) <= new Date(checkInDate)) {
          // If user selects a date before or equal to check-in, treat it as new check-in
          setCheckInDate(day.dateString)
          setCheckOutDate("")
          setSelecting("checkOut")
        } else {
          setCheckOutDate(day.dateString)
        }
      }
    }

    const _resetDates = () => {
      setCheckInDate("")
      setCheckOutDate("")
      setSelecting("checkIn")
    }

    const handleContinue = () => {
      if (checkInDate && checkOutDate) {
        navigation.navigate("SelectRoom", { checkIn: checkInDate, checkOut: checkOutDate })
      }
    }

    // Format date for display
    const formatDate = (dateString: string) => {
      if (!dateString) return "Seleccionar"

      const options: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
      return new Date(dateString).toLocaleDateString("es-ES", options)
    }

    // Generate marked dates object for the calendar
    const markedDates: Record<string, any> = {}
    if (checkInDate) {
      markedDates[checkInDate] = {
        selected: true,
        startingDay: true,
        color: "#304FFE",
      }
    }
    if (checkOutDate) {
      markedDates[checkOutDate] = {
        selected: true,
        endingDay: true,
        color: "#304FFE",
      }
    }

    // If both dates are selected, mark the range
    if (checkInDate && checkOutDate) {
      const start = new Date(checkInDate)
      const end = new Date(checkOutDate)
      for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
        const dateString = d.toISOString().split("T")[0]
        if (dateString !== checkInDate && dateString !== checkOutDate) {
          markedDates[dateString] = {
            selected: true,
            color: "#E6EAFF",
            textColor: "#304FFE",
          }
        }
      }
    }

    return (
      <Screen preset="fixed" className="bg-white flex-1">
        {/* Header */}
        <View className="bg-primary pt-12 pb-6 px-6 rounded-b-3xl">
          <View className="flex-row items-center mb-6">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                icon="arrow-back"
                iconSet="MaterialIcons"
                isVectorIcon
                size={24}
                color="white"
              />
            </TouchableOpacity>
            <Text className="text-xl font-bold ml-4 text-white">Selecciona fechas</Text>
          </View>

          <View className="flex-row justify-between bg-white/10 p-4 rounded-xl">
            <View className="items-center">
              <Text className="text-white/70 mb-1">Check-in</Text>
              <Text className="text-white font-semibold">{formatDate(checkInDate)}</Text>
            </View>

            <View className="items-center justify-center">
              <Icon
                icon="arrow-forward"
                iconSet="MaterialIcons"
                isVectorIcon
                size={20}
                color="white"
              />
            </View>

            <View className="items-center">
              <Text className="text-white/70 mb-1">Check-out</Text>
              <Text className="text-white font-semibold">{formatDate(checkOutDate)}</Text>
            </View>
          </View>
        </View>

        {/* Calendar */}
        <View className="px-4 pt-6 flex-1">
          <Calendar
            onDayPress={handleDateSelect}
            markedDates={markedDates}
            markingType="period"
            minDate={new Date().toISOString().split("T")[0]}
            theme={{
              selectedDayBackgroundColor: "#304FFE",
              selectedDayTextColor: "#ffffff",
              todayTextColor: "#304FFE",
              textDayFontFamily: "Montserrat-Regular",
              textMonthFontFamily: "Montserrat-Bold",
              textDayHeaderFontFamily: "Montserrat-Medium",
              arrowColor: "#304FFE",
              dotColor: "#304FFE",
              monthTextColor: "#304FFE",
              indicatorColor: "#304FFE",
              textSectionTitleColor: "#304FFE",
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 14,
              calendarBackground: "white",
              textSectionTitleDisabledColor: "#d9e1e8",
              textDisabledColor: "#d9e1e8",
              dayTextColor: "#2d4150",
            }}
          />
        </View>

        {/* Bottom button */}
        <View className="bg-white px-6 pb-4 pt-2" style={{ paddingBottom: insets.bottom + 16 }}>
          <TouchableOpacity
            className={`py-4 rounded-xl justify-center items-center ${
              checkInDate && checkOutDate ? "bg-primary" : "bg-gray-200"
            }`}
            onPress={handleContinue}
            disabled={!checkInDate || !checkOutDate}
          >
            <Text
              className={`font-semibold text-lg ${
                checkInDate && checkOutDate ? "text-white" : "text-gray-500"
              }`}
            >
              Continuar
            </Text>
          </TouchableOpacity>
        </View>
      </Screen>
    )
  }
