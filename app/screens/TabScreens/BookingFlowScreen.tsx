import { View, ScrollView } from "react-native"
import { styled } from "nativewind"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { Button } from "@/components/Button"
import { Icon } from "@/components/Icon"
import { TextField } from "@/components/TextField"
import { useAppColors } from "@/hooks/useAppColors"
import { useNavigation, useRoute } from "@react-navigation/native"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { BookingStackParamList } from "@/navigators/types"
import { activities } from "@/data/mockData"
import { useState } from "react"
import { Calendar } from "react-native-calendars"

const StyledView = styled(View)
const StyledScrollView = styled(ScrollView)

type Props = NativeStackScreenProps<BookingStackParamList, "BookingFlow">

export function BookingFlowScreen() {
  const colors = useAppColors()
  const navigation = useNavigation()
  const route = useRoute<Props["route"]>()
  const { activityId } = route.params

  const activity = activities.find((a) => a.id === activityId)

  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState("")
  const [participants, setParticipants] = useState("1")
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [specialRequests, setSpecialRequests] = useState("")

  if (!activity) {
    return (
      <Screen preset="scroll" safeAreaEdges={["top"]} className="bg-white">
        <StyledView className="flex-1 items-center justify-center">
          <Text preset="heading" className="text-sky-900">
            Actividad no encontrada
          </Text>
        </StyledView>
      </Screen>
    )
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Handle booking submission
      console.log("Booking submitted:", {
        activityId,
        date: selectedDate,
        participants,
        contactInfo,
        specialRequests,
      })
      navigation.navigate("BookingConfirmation", {
        bookingId: "new-booking-id", // This would come from the API
      })
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      navigation.goBack()
    }
  }

  const renderStep1 = () => (
    <StyledView>
      <Text preset="subheading" className="text-sky-900 mb-4">
        Selecciona la Fecha
      </Text>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: colors.primary },
        }}
        minDate={new Date().toISOString().split("T")[0]}
        theme={{
          todayTextColor: colors.primary,
          selectedDayBackgroundColor: colors.primary,
          selectedDayTextColor: "#ffffff",
          textDayFontFamily: "Helvetica",
          textMonthFontFamily: "Helvetica",
          textDayHeaderFontFamily: "Helvetica",
          arrowColor: colors.primary,
          monthTextColor: "#0F172A",
          textSectionTitleColor: "#64748B",
          dayTextColor: "#334155",
          textDisabledColor: "#CBD5E1",
        }}
      />
      <TextField
        label="Número de Participantes"
        value={participants}
        onChangeText={setParticipants}
        keyboardType="numeric"
        containerClassName="mt-6"
      />
    </StyledView>
  )

  const renderStep2 = () => (
    <StyledView>
      <Text preset="subheading" className="text-sky-900 mb-4">
        Información de Contacto
      </Text>
      <TextField
        label="Nombre Completo"
        value={contactInfo.name}
        onChangeText={(text) => setContactInfo({ ...contactInfo, name: text })}
        containerClassName="mb-4"
      />
      <TextField
        label="Correo Electrónico"
        value={contactInfo.email}
        onChangeText={(text) => setContactInfo({ ...contactInfo, email: text })}
        keyboardType="email-address"
        containerClassName="mb-4"
      />
      <TextField
        label="Teléfono"
        value={contactInfo.phone}
        onChangeText={(text) => setContactInfo({ ...contactInfo, phone: text })}
        keyboardType="phone-pad"
        containerClassName="mb-4"
      />
      <TextField
        label="Solicitudes Especiales (Opcional)"
        value={specialRequests}
        onChangeText={setSpecialRequests}
        multiline
        numberOfLines={4}
        containerClassName="mb-4"
      />
    </StyledView>
  )

  const renderStep3 = () => (
    <StyledView>
      <Text preset="subheading" className="text-sky-900 mb-4">
        Resumen de la Reserva
      </Text>
      <StyledView className="bg-white rounded-xl shadow-sm border border-neutral-100 p-4 mb-6">
        <Text preset="subheading" className="text-sky-900 mb-2">
          {activity.title}
        </Text>
        <StyledView className="space-y-2">
          <StyledView className="flex-row items-center">
            <Icon icon="BsCalendarPlus" size={16} color={colors.primary} />
            <Text preset="formHelper" className="ml-2 text-sky-700">
              {selectedDate}
            </Text>
          </StyledView>
          <StyledView className="flex-row items-center">
            <Icon icon="BsPeople" size={16} color={colors.primary} />
            <Text preset="formHelper" className="ml-2 text-sky-700">
              {participants} {parseInt(participants, 10) === 1 ? "persona" : "personas"}
            </Text>
          </StyledView>
          <StyledView className="flex-row items-center">
            <Icon icon="BsLocation" size={16} color={colors.primary} />
            <Text preset="formHelper" className="ml-2 text-sky-700">
              {activity.location}
            </Text>
          </StyledView>
        </StyledView>
      </StyledView>

      <StyledView className="bg-white rounded-xl shadow-sm border border-neutral-100 p-4 mb-6">
        <Text preset="subheading" className="text-sky-900 mb-3">
          Información de Contacto
        </Text>
        <StyledView className="space-y-2">
          <Text preset="formHelper" className="text-sky-700">
            {contactInfo.name}
          </Text>
          <Text preset="formHelper" className="text-sky-700">
            {contactInfo.email}
          </Text>
          <Text preset="formHelper" className="text-sky-700">
            {contactInfo.phone}
          </Text>
        </StyledView>
      </StyledView>

      {specialRequests && (
        <StyledView className="bg-white rounded-xl shadow-sm border border-neutral-100 p-4">
          <Text preset="subheading" className="text-sky-900 mb-3">
            Solicitudes Especiales
          </Text>
          <Text preset="formHelper" className="text-sky-700">
            {specialRequests}
          </Text>
        </StyledView>
      )}
    </StyledView>
  )

  const isNextDisabled = () => {
    switch (step) {
      case 1:
        return !selectedDate || !participants
      case 2:
        return !contactInfo.name || !contactInfo.email || !contactInfo.phone
      default:
        return false
    }
  }

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} className="bg-white">
      {/* Header */}
      <StyledView className="bg-sky-900 px-4 py-6">
        <StyledView className="flex-row items-center mb-4">
          <Button
            preset="default"
            className="bg-white/20 border-0 w-10 h-10 rounded-full p-0 items-center justify-center mr-3"
            onPress={handleBack}
          >
            <Icon icon="BsBack" size={20} color="white" />
          </Button>
          <Text preset="heading" className="text-xl text-white">
            Reservar {activity.title}
          </Text>
        </StyledView>
        <StyledView className="flex-row">
          {[1, 2, 3].map((s) => (
            <StyledView
              key={s}
              className={`flex-1 h-1 rounded-full mx-1 ${s <= step ? "bg-white" : "bg-white/30"}`}
            />
          ))}
        </StyledView>
      </StyledView>

      {/* Content */}
      <StyledScrollView className="flex-1 px-4 py-6">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </StyledScrollView>

      {/* Footer */}
      <StyledView className="px-4 py-4 border-t border-neutral-100">
        <Button
          preset="filled"
          text={step === 3 ? "Confirmar Reserva" : "Continuar"}
          disabled={isNextDisabled()}
          onPress={handleNext}
        />
      </StyledView>
    </Screen>
  )
}
