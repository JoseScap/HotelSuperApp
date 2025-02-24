import { View, TouchableOpacity } from "react-native"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { styled } from "nativewind"
import { useNavigation } from "@react-navigation/native"
import { useHotelConfig } from "@/hooks/useHotelConfig"
import type { Payment } from "@/types"

const StyledView = styled(View)
const StyledTouchableOpacity = styled(TouchableOpacity)

// Datos de ejemplo
const mockPayments: Payment[] = [
  {
    id: "1",
    title: "Cena en Restaurante Principal",
    amount: 120.5,
    date: "2024-02-20",
    time: "20:30",
    status: "completed",
    items: [
      { name: "Entrada - Carpaccio", amount: 25.0 },
      { name: "Plato Principal - Salmón", amount: 45.0 },
      { name: "Postre - Tiramisú", amount: 15.0 },
      { name: "Vino - Copa", amount: 18.0 },
      { name: "Agua Mineral", amount: 5.5 },
      { name: "Café", amount: 12.0 },
    ],
    subtotal: 108.5,
    tax: 12.0,
    total: 120.5,
    paymentMethod: "Cargo a la habitación",
    roomNumber: "304",
  },
  {
    id: "2",
    title: "Servicio de Spa - Masaje",
    amount: 85.0,
    date: "2024-02-19",
    time: "15:00",
    status: "completed",
    items: [
      { name: "Masaje Relajante 60min", amount: 75.0 },
      { name: "Aromaterapia", amount: 10.0 },
    ],
    subtotal: 77.27,
    tax: 7.73,
    total: 85.0,
    paymentMethod: "Tarjeta de Crédito",
    roomNumber: "304",
  },
  {
    id: "3",
    title: "Bar de la Piscina",
    amount: 45.75,
    date: "2024-02-19",
    time: "14:20",
    status: "pending",
    items: [
      { name: "Mojito", amount: 15.0 },
      { name: "Nachos con Guacamole", amount: 18.0 },
      { name: "Agua con Gas", amount: 4.75 },
      { name: "Helado", amount: 8.0 },
    ],
    subtotal: 41.59,
    tax: 4.16,
    total: 45.75,
    paymentMethod: "Pendiente de pago",
    roomNumber: "304",
  },
]

export function PaymentsScreen() {
  const navigation = useNavigation()
  const { name: hotelName } = useHotelConfig()

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} className="bg-white">
      {/* Header sticky */}
      <StyledView className="absolute top-0 left-0 right-0 z-10">
        <StyledView className="bg-sky-500 px-4 py-6">
          <Text preset="heading" className="text-2xl text-white">
            {hotelName}
          </Text>
          <Text preset="formHelper" className="text-white/90">
            Historial de consumos y pagos
          </Text>
        </StyledView>
      </StyledView>

      {/* Spacer para el header */}
      <StyledView className="h-32" />

      {/* Content section */}
      <StyledView className="flex-1 px-4">
        {/* Lista de pagos */}
        <StyledView className="space-y-4">
          {mockPayments.map((payment) => (
            <StyledTouchableOpacity
              key={payment.id}
              className="bg-white border border-neutral-200 rounded-lg p-4 active:opacity-70"
              onPress={() => navigation.navigate("PaymentDetail" as never)}
            >
              <StyledView className="flex-row justify-between items-start mb-2">
                <Text preset="formLabel" className="text-sky-900 flex-1">
                  {payment.title}
                </Text>
                <Text preset="formLabel" className="text-sky-500">
                  ${payment.amount.toFixed(2)}
                </Text>
              </StyledView>

              <StyledView className="flex-row justify-between items-center">
                <Text preset="formHelper" className="text-neutral-500">
                  {payment.date} {payment.time}
                </Text>
                <StyledView
                  className={`px-2 py-1 rounded ${
                    payment.status === "completed" ? "bg-green-100" : "bg-yellow-100"
                  }`}
                >
                  <Text
                    preset="formHelper"
                    className={
                      payment.status === "completed" ? "text-green-700" : "text-yellow-700"
                    }
                  >
                    {payment.status === "completed" ? "Completado" : "Pendiente"}
                  </Text>
                </StyledView>
              </StyledView>
            </StyledTouchableOpacity>
          ))}
        </StyledView>
      </StyledView>
    </Screen>
  )
}
