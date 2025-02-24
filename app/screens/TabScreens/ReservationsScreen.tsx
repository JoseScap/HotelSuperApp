import { View, ScrollView } from "react-native"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { styled } from "nativewind"
import { useHotelConfig } from "@/hooks/useHotelConfig"
import { Reservation } from "@/types"
import { Button } from "@/components/Button"
import { useNavigation } from "@react-navigation/native"

const StyledView = styled(View)
const StyledScrollView = styled(ScrollView)

// Mock data para ejemplo
export const mockReservations: Reservation[] = [
  {
    id: "1",
    checkIn: "2024-03-01",
    checkOut: "2024-03-05",
    roomType: "Suite Deluxe",
    guests: 2,
    status: "confirmed",
    totalAmount: 1200,
    roomNumber: "304",
    totalNights: 4,
    adults: 2,
    children: 0,
    amenities: ["King Bed", "Ocean View", "Balcony"],
    activities: [
      {
        id: "1",
        type: "spa",
        title: "Masaje Relajante",
        date: "2024-03-02",
        time: "15:00",
        participants: 2,
        status: "upcoming",
        cost: 180,
      },
    ],
  },
  {
    id: "2",
    checkIn: "2024-02-15",
    checkOut: "2024-02-18",
    roomType: "Junior Suite",
    guests: 3,
    status: "completed",
    totalAmount: 850,
    roomNumber: "210",
    totalNights: 3,
    adults: 2,
    children: 1,
    amenities: ["Queen Bed", "City View"],
    checkInTime: "14:30",
    checkOutTime: "11:00",
    activities: [
      {
        id: "1",
        type: "restaurant",
        title: "Cena Gourmet",
        date: "2024-02-16",
        time: "20:00",
        participants: 2,
        status: "completed",
        cost: 150,
      },
      {
        id: "2",
        type: "spa",
        title: "Tratamiento Facial",
        date: "2024-02-17",
        time: "11:00",
        participants: 1,
        status: "completed",
        cost: 90,
      },
    ],
    expenses: [
      {
        id: "1",
        category: "food",
        description: "Cena Restaurante Principal",
        amount: 150,
        date: "2024-02-16",
        time: "20:00",
      },
      {
        id: "2",
        category: "spa",
        description: "Tratamiento Facial",
        amount: 90,
        date: "2024-02-17",
        time: "11:00",
      },
      {
        id: "3",
        category: "extras",
        description: "Servicio a la habitación",
        amount: 45,
        date: "2024-02-17",
        time: "21:30",
      },
    ],
  },
]

export function ReservationsScreen() {
  const { name: hotelName } = useHotelConfig()
  const navigation = useNavigation()

  const activeReservations = mockReservations.filter(
    (res) => res.status === "confirmed" || res.status === "checked-in",
  )
  const pastReservations = mockReservations.filter((res) => res.status === "completed")

  const handleReservationPress = () => {
    navigation.navigate("ReservationDetail" as never)
  }

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} className="bg-white">
      {/* Header */}
      <StyledView className="bg-sky-500 px-4 py-6">
        <Text preset="heading" className="text-2xl text-white mb-2">
          {hotelName}
        </Text>
        <Text preset="formHelper" className="text-white/90">
          Mis Reservas
        </Text>
      </StyledView>

      <StyledScrollView className="p-4">
        {/* Reservas Activas */}
        <StyledView className="mb-8">
          <Text preset="subheading" className="mb-4 text-sky-900">
            Reservas Activas
          </Text>

          {activeReservations.map((reservation) => (
            <StyledView
              key={reservation.id}
              className="bg-white border border-neutral-200 rounded-lg p-4 mb-4"
            >
              <StyledView className="flex-row justify-between items-start mb-2">
                <Text preset="formLabel" className="text-sky-900">
                  {reservation.roomType}
                </Text>
                <Text
                  preset="formLabel"
                  className={
                    reservation.status === "checked-in" ? "text-green-600" : "text-sky-500"
                  }
                >
                  {reservation.status === "checked-in" ? "Check-in realizado" : "Confirmada"}
                </Text>
              </StyledView>

              <Text preset="formHelper" className="text-neutral-600 mb-4">
                {`Check-in: ${reservation.checkIn} - Check-out: ${reservation.checkOut}`}
              </Text>

              <Button
                text="Ver Detalles"
                preset="default"
                className="border-sky-500"
                textClassName="text-sky-500"
                onPress={() => handleReservationPress()}
              />
            </StyledView>
          ))}
        </StyledView>

        {/* Historial de Reservas */}
        <StyledView>
          <Text preset="subheading" className="mb-4 text-sky-900">
            Historial de Reservas
          </Text>

          {pastReservations.map((reservation) => (
            <StyledView
              key={reservation.id}
              className="bg-white border border-neutral-200 rounded-lg p-4 mb-4"
            >
              <StyledView className="flex-row justify-between items-start mb-2">
                <Text preset="formLabel" className="text-sky-900">
                  {reservation.roomType}
                </Text>
                <Text preset="formHelper" className="text-neutral-500">
                  Completada
                </Text>
              </StyledView>

              <Text preset="formHelper" className="text-neutral-600 mb-2">
                {`${reservation.checkIn} - ${reservation.checkOut}`}
              </Text>

              <StyledView className="flex-row justify-between items-center mb-4">
                <Text preset="formHelper" className="text-neutral-600">
                  {`${reservation.activities?.length || 0} actividades realizadas`}
                </Text>
                <Text preset="formLabel" className="text-sky-500">
                  ${reservation.totalAmount}
                </Text>
              </StyledView>

              <Button
                text="Ver Resumen"
                preset="default"
                className="border-sky-500"
                textClassName="text-sky-500"
                onPress={() => handleReservationPress()}
              />
            </StyledView>
          ))}
        </StyledView>
      </StyledScrollView>
    </Screen>
  )
}
