import { View, ScrollView } from "react-native"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { styled } from "nativewind"
import { useHotelConfig } from "@/hooks/useHotelConfig"
import { useRoute, useNavigation } from "@react-navigation/native"
import { useHeader } from "@/utils/useHeader"
import { mockReservations } from "./ReservationsScreen"
import { BsCaretLeft } from "react-icons/bs"

const StyledView = styled(View)
const StyledScrollView = styled(ScrollView)

export function ReservationDetailScreen() {
  const route = useRoute()
  const navigation = useNavigation()
  const { name: hotelName } = useHotelConfig()
  const { id } = route.params as { id: string }

  const reservation = mockReservations.find((r) => r.id === id)

  useHeader({
    leftIcon: BsCaretLeft,
    onLeftPress: () => navigation.goBack(),
  })

  if (!reservation) {
    return (
      <Screen preset="scroll" safeAreaEdges={["top"]} className="bg-white">
        <StyledView className="flex-1 items-center justify-center">
          <Text preset="default">Reserva no encontrada</Text>
        </StyledView>
      </Screen>
    )
  }

  const isCompleted = reservation.status === "completed"

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} className="bg-white">
      {/* Header */}
      <StyledView className="bg-sky-500 px-4 py-6 pt-10">
        <Text preset="heading" className="text-2xl text-white mb-2">
          {hotelName}
        </Text>
        <Text preset="formHelper" className="text-white/90">
          Detalle de Reserva
        </Text>
      </StyledView>

      <StyledScrollView className="p-4">
        {/* Información Principal */}
        <StyledView className="bg-white border border-neutral-200 rounded-lg p-4 mb-6">
          <StyledView className="flex-row justify-between items-start mb-4">
            <Text preset="heading" className="text-xl text-sky-900">
              {reservation.roomType}
            </Text>
            <Text
              preset="formLabel"
              className={
                isCompleted
                  ? "text-neutral-500"
                  : reservation.status === "checked-in"
                    ? "text-green-600"
                    : "text-sky-500"
              }
            >
              {isCompleted
                ? "Completada"
                : reservation.status === "checked-in"
                  ? "Check-in realizado"
                  : "Confirmada"}
            </Text>
          </StyledView>

          <StyledView className="space-y-2 mb-4">
            <Text preset="formHelper" className="text-neutral-600">
              Check-in: {reservation.checkIn}
              {reservation.checkInTime ? ` - ${reservation.checkInTime}` : ""}
            </Text>
            <Text preset="formHelper" className="text-neutral-600">
              Check-out: {reservation.checkOut}
              {reservation.checkOutTime ? ` - ${reservation.checkOutTime}` : ""}
            </Text>
            <Text preset="formHelper" className="text-neutral-600">
              Habitación: {reservation.roomNumber}
            </Text>
            <Text preset="formHelper" className="text-neutral-600">
              Huéspedes: {reservation.adults} adultos
              {reservation.children > 0 ? ` + ${reservation.children} niños` : ""}
            </Text>
          </StyledView>

          <StyledView className="flex-row flex-wrap gap-2">
            {reservation.amenities.map((amenity, index) => (
              <StyledView key={index} className="bg-sky-50 px-3 py-1 rounded-full">
                <Text preset="formHelper" className="text-sky-700">
                  {amenity}
                </Text>
              </StyledView>
            ))}
          </StyledView>
        </StyledView>

        {/* Actividades */}
        {reservation.activities && reservation.activities.length > 0 && (
          <StyledView className="mb-6">
            <Text preset="subheading" className="mb-4 text-sky-900">
              Actividades
            </Text>
            {reservation.activities.map((activity) => (
              <StyledView
                key={activity.id}
                className="bg-white border border-neutral-200 rounded-lg p-4 mb-3"
              >
                <StyledView className="flex-row justify-between items-start mb-2">
                  <Text preset="formLabel" className="text-sky-900">
                    {activity.title}
                  </Text>
                  <Text
                    preset="formHelper"
                    className={
                      activity.status === "completed"
                        ? "text-green-600"
                        : activity.status === "cancelled"
                          ? "text-red-500"
                          : "text-sky-500"
                    }
                  >
                    {activity.status === "completed"
                      ? "Realizada"
                      : activity.status === "cancelled"
                        ? "Cancelada"
                        : "Programada"}
                  </Text>
                </StyledView>

                <Text preset="formHelper" className="text-neutral-600 mb-2">
                  {`${activity.date} - ${activity.time}`}
                </Text>

                <StyledView className="flex-row justify-between items-center">
                  <Text preset="formHelper" className="text-neutral-600">
                    {activity.participants} {activity.participants === 1 ? "persona" : "personas"}
                  </Text>
                  {activity.cost && (
                    <Text preset="formLabel" className="text-sky-500">
                      ${activity.cost}
                    </Text>
                  )}
                </StyledView>
              </StyledView>
            ))}
          </StyledView>
        )}

        {/* Gastos (solo para reservas completadas) */}
        {isCompleted && reservation.expenses && (
          <StyledView className="mb-6">
            <Text preset="subheading" className="mb-4 text-sky-900">
              Resumen de Gastos
            </Text>

            {reservation.expenses.map((expense) => (
              <StyledView
                key={expense.id}
                className="bg-white border border-neutral-200 rounded-lg p-4 mb-3"
              >
                <StyledView className="flex-row justify-between items-start mb-2">
                  <Text preset="formLabel" className="text-sky-900">
                    {expense.description}
                  </Text>
                  <Text preset="formLabel" className="text-sky-500">
                    ${expense.amount}
                  </Text>
                </StyledView>

                <StyledView className="flex-row justify-between items-center">
                  <Text preset="formHelper" className="text-neutral-600">
                    {expense.category}
                  </Text>
                  <Text preset="formHelper" className="text-neutral-600">
                    {`${expense.date} ${expense.time}`}
                  </Text>
                </StyledView>
              </StyledView>
            ))}

            <StyledView className="bg-sky-50 rounded-lg p-4 mt-4">
              <StyledView className="flex-row justify-between items-center">
                <Text preset="formLabel" className="text-sky-900">
                  Total
                </Text>
                <Text preset="formLabel" className="text-sky-900">
                  ${reservation.totalAmount}
                </Text>
              </StyledView>
            </StyledView>
          </StyledView>
        )}
      </StyledScrollView>
    </Screen>
  )
}
