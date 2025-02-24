import { View, ScrollView } from "react-native"
import { styled } from "nativewind"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { Button } from "@/components/Button"
import { Icon } from "@/components/Icon"
import { useAppColors } from "@/hooks/useAppColors"
import { useNavigation, useRoute } from "@react-navigation/native"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { BookingStackParamList } from "@/navigators/types"
import { activities } from "@/data/mockData"

const StyledView = styled(View)
const StyledScrollView = styled(ScrollView)

type Props = NativeStackScreenProps<BookingStackParamList, "BookingDetail">

export function BookingDetailScreen() {
  const colors = useAppColors()
  const navigation = useNavigation()
  const route = useRoute<Props["route"]>()
  const { bookingId } = route.params

  // Mock booking data - In a real app, this would come from an API or store
  const booking = {
    id: bookingId,
    activityId: activities[0].id,
    date: "2024-03-25",
    time: "10:00 AM",
    participants: 2,
    status: "confirmed",
    totalPrice: 150,
    paymentMethod: "Tarjeta de Crédito",
    paymentStatus: "paid",
    bookingReference: "BOK-2024-001",
    specialRequests: "Necesito equipo de snorkel",
    contactInfo: {
      name: "Juan Pérez",
      email: "juan@example.com",
      phone: "+1234567890",
    },
  }

  const activity = activities.find((a) => a.id === booking.activityId)

  if (!activity) {
    return (
      <Screen preset="scroll" safeAreaEdges={["top"]} className="bg-white">
        <StyledView className="flex-1 items-center justify-center">
          <Text preset="heading" className="text-sky-900">
            Reserva no encontrada
          </Text>
        </StyledView>
      </Screen>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmada"
      case "pending":
        return "Pendiente"
      case "completed":
        return "Completada"
      default:
        return status
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
            onPress={() => navigation.goBack()}
          >
            <Icon icon="BsBack" size={20} color="white" />
          </Button>
          <Text preset="heading" className="text-xl text-white">
            Detalles de la Reserva
          </Text>
        </StyledView>
        <StyledView
          className={`self-start px-3 py-1 rounded-full ${getStatusColor(booking.status)}`}
        >
          <Text preset="formHelper">{getStatusText(booking.status)}</Text>
        </StyledView>
      </StyledView>

      <StyledScrollView className="flex-1 px-4 py-6">
        {/* Actividad */}
        <StyledView className="mb-6">
          <Text preset="subheading" className="text-sky-900 mb-3">
            Actividad
          </Text>
          <StyledView className="bg-white rounded-xl shadow-sm border border-neutral-100 p-4">
            <Text preset="subheading" className="text-sky-900 mb-2">
              {activity.title}
            </Text>
            <Text preset="formHelper" className="text-sky-700 mb-3">
              {activity.description}
            </Text>
            <StyledView className="space-y-2">
              <StyledView className="flex-row items-center">
                <Icon icon="BsCalendarPlus" size={16} color={colors.primary} />
                <Text preset="formHelper" className="ml-2 text-sky-700">
                  {booking.date} - {booking.time}
                </Text>
              </StyledView>
              <StyledView className="flex-row items-center">
                <Icon icon="BsPeople" size={16} color={colors.primary} />
                <Text preset="formHelper" className="ml-2 text-sky-700">
                  {booking.participants} {booking.participants === 1 ? "persona" : "personas"}
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
        </StyledView>

        {/* Detalles de Pago */}
        <StyledView className="mb-6">
          <Text preset="subheading" className="text-sky-900 mb-3">
            Detalles de Pago
          </Text>
          <StyledView className="bg-white rounded-xl shadow-sm border border-neutral-100 p-4">
            <StyledView className="space-y-3">
              <StyledView className="flex-row justify-between">
                <Text preset="formHelper" className="text-sky-700">
                  Método de Pago
                </Text>
                <Text preset="formHelper" className="text-sky-900">
                  {booking.paymentMethod}
                </Text>
              </StyledView>
              <StyledView className="flex-row justify-between">
                <Text preset="formHelper" className="text-sky-700">
                  Estado del Pago
                </Text>
                <Text
                  preset="formHelper"
                  className={booking.paymentStatus === "paid" ? "text-green-600" : "text-red-600"}
                >
                  {booking.paymentStatus === "paid" ? "Pagado" : "Pendiente"}
                </Text>
              </StyledView>
              <StyledView className="flex-row justify-between">
                <Text preset="formHelper" className="text-sky-700">
                  Total
                </Text>
                <Text preset="subheading" className="text-sky-900">
                  ${booking.totalPrice}
                </Text>
              </StyledView>
            </StyledView>
          </StyledView>
        </StyledView>

        {/* Información Adicional */}
        <StyledView className="mb-6">
          <Text preset="subheading" className="text-sky-900 mb-3">
            Información Adicional
          </Text>
          <StyledView className="bg-white rounded-xl shadow-sm border border-neutral-100 p-4">
            <StyledView className="space-y-3">
              <StyledView>
                <Text preset="formHelper" className="text-sky-700 mb-1">
                  Referencia de Reserva
                </Text>
                <Text preset="formHelper" className="text-sky-900">
                  {booking.bookingReference}
                </Text>
              </StyledView>
              <StyledView>
                <Text preset="formHelper" className="text-sky-700 mb-1">
                  Solicitudes Especiales
                </Text>
                <Text preset="formHelper" className="text-sky-900">
                  {booking.specialRequests || "Ninguna"}
                </Text>
              </StyledView>
            </StyledView>
          </StyledView>
        </StyledView>

        {/* Información de Contacto */}
        <StyledView>
          <Text preset="subheading" className="text-sky-900 mb-3">
            Información de Contacto
          </Text>
          <StyledView className="bg-white rounded-xl shadow-sm border border-neutral-100 p-4">
            <StyledView className="space-y-3">
              <StyledView className="flex-row items-center">
                <Icon icon="BsPerson" size={16} color={colors.primary} />
                <Text preset="formHelper" className="ml-2 text-sky-700">
                  {booking.contactInfo.name}
                </Text>
              </StyledView>
              <StyledView className="flex-row items-center">
                <Icon icon="BsEnvelope" size={16} color={colors.primary} />
                <Text preset="formHelper" className="ml-2 text-sky-700">
                  {booking.contactInfo.email}
                </Text>
              </StyledView>
              <StyledView className="flex-row items-center">
                <Icon icon="BsPhone" size={16} color={colors.primary} />
                <Text preset="formHelper" className="ml-2 text-sky-700">
                  {booking.contactInfo.phone}
                </Text>
              </StyledView>
            </StyledView>
          </StyledView>
        </StyledView>
      </StyledScrollView>

      {/* Footer con Botones */}
      {booking.status === "confirmed" && (
        <StyledView className="px-4 py-4 border-t border-neutral-100">
          <StyledView className="flex-row justify-between">
            <Button
              preset="default"
              text="Modificar"
              className="flex-1 mr-2"
              onPress={() => {
                // Handle modification
              }}
            />
            <Button
              preset="filled"
              text="Cancelar Reserva"
              className="flex-1 ml-2 bg-red-500"
              onPress={() => {
                // Handle cancellation
              }}
            />
          </StyledView>
        </StyledView>
      )}
    </Screen>
  )
}
