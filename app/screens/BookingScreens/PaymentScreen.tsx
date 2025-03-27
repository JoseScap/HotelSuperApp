import { FC, useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native"
import { AppStackScreenProps } from "@/navigators/AppNavigator"
import { Icon } from "@/components"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Header } from "@/components/Header"

interface PaymentMethod {
  id: string
  name: string
  last4: string
  expiryDate: string
  icon: string
}

interface RoomCategory {
  id: string
  name: string
  description: string
  basePrice: number
}

const DUMMY_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "1",
    name: "VISA",
    last4: "4242",
    expiryDate: "12/25",
    icon: "credit-card",
  },
  {
    id: "2",
    name: "MasterCard",
    last4: "8888",
    expiryDate: "10/24",
    icon: "credit-card",
  },
]

const DUMMY_ROOM_CATEGORIES: Record<string, RoomCategory> = {
  "1": {
    id: "1",
    name: "Habitación Estándar",
    description:
      "Habitación confortable con todas las comodidades básicas para una estancia agradable.",
    basePrice: 120,
  },
  "2": {
    id: "2",
    name: "Habitación Deluxe",
    description: "Habitación espaciosa con amenidades premium y vista a la ciudad.",
    basePrice: 180,
  },
  "3": {
    id: "3",
    name: "Suite",
    description: "Suite de lujo con sala de estar separada y comodidades premium.",
    basePrice: 250,
  },
}

export const PaymentScreen: FC<AppStackScreenProps<"Payment">> = function PaymentScreen({
  navigation,
  route,
}) {
  const { roomId, checkIn, checkOut } = route.params
  const [loading, setLoading] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null)
  const [addingNewCard, setAddingNewCard] = useState(false)
  const insets = useSafeAreaInsets()

  // Passenger form state
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [age, setAge] = useState("")

  // Credit card form state (for new card)
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCVV, setCardCVV] = useState("")

  // Get room details
  const room = DUMMY_ROOM_CATEGORIES[roomId]

  // Calculate stay details
  const checkInDate = new Date(checkIn)
  const checkOutDate = new Date(checkOut)
  const nights = Math.round(
    (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24),
  )

  // Calculate costs
  const roomTotal = room.basePrice * nights
  const taxesAndFees = roomTotal * 0.12 // 12% tax
  const totalAmount = roomTotal + taxesAndFees

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  // Function to validate passenger form
  const validatePassengerForm = () => {
    if (!firstName.trim()) return "El nombre es obligatorio"
    if (!lastName.trim()) return "El apellido es obligatorio"
    if (!email.trim()) return "El email es obligatorio"
    if (!email.includes("@") || !email.includes(".")) return "Se requiere un email válido"
    if (!phone.trim()) return "El teléfono es obligatorio"
    if (!age.trim()) return "La edad es obligatoria"
    if (isNaN(Number(age)) || Number(age) < 18) return "Se requiere una edad válida (18+)"
    return null
  }

  // Function to validate new card form
  const validateCardForm = () => {
    if (addingNewCard) {
      if (!cardNumber.trim() || cardNumber.length < 16)
        return "Se requiere un número de tarjeta válido"
      if (!cardName.trim()) return "El nombre del titular es obligatorio"
      if (!cardExpiry.trim() || cardExpiry.length < 5)
        return "Se requiere una fecha de caducidad válida (MM/AA)"
      if (!cardCVV.trim() || cardCVV.length < 3) return "Se requiere un CVV válido"
    } else if (!selectedPaymentMethod) {
      return "Por favor selecciona un método de pago"
    }
    return null
  }

  // Function to handle payment submission
  const handlePayment = () => {
    // Validate passenger form
    const passengerError = validatePassengerForm()
    if (passengerError) {
      Alert.alert("Error", passengerError)
      return
    }

    // Validate payment method
    const cardError = validateCardForm()
    if (cardError) {
      Alert.alert("Error", cardError)
      return
    }

    // Process payment
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)

      // Create reservation object matching the schema
      const _reservationData = {
        categoryId: roomId,
        checkInDate: checkIn,
        checkInTime: "14:00",
        checkOutDate: checkOut,
        checkOutTime: "12:00",
        notes: "",
        extraDiscount: 0,
        discountId: null,
        mainPassenger: {
          firstName,
          lastName,
          age: Number(age),
          email,
          phone,
        },
        source: "APP",
      }

      // Navigate to confirmation screen
      navigation.navigate("BookingConfirmation", {
        bookingId: "RES" + Date.now().toString().substring(5),
      })
    }, 2000)
  }

  return (
    <View className="flex-1 bg-white">
      {/* Header with back button */}
      <View className="pt-[20px]" style={{ paddingTop: insets.top }}>
        <Header
          leftIcon="caretLeft"
          leftIconColor="#000"
          onLeftPress={() => navigation.goBack()}
          title="Método de pago"
          titleClassName="text-black"
          backgroundColor="white"
        />
      </View>

      {/* Scrollable content */}
      <ScrollView showsVerticalScrollIndicator={true} className="pb-5">
        {/* Booking summary */}
        <View className="bg-primary/10 p-4">
          <Text className="font-bold text-lg mb-2">Resumen de Reserva</Text>

          <View className="flex-row justify-between mb-1">
            <Text className="text-gray-600">Habitación:</Text>
            <Text className="font-medium">{room.name}</Text>
          </View>

          <View className="flex-row justify-between mb-1">
            <Text className="text-gray-600">Entrada:</Text>
            <Text>{formatDate(checkIn)}</Text>
          </View>

          <View className="flex-row justify-between mb-1">
            <Text className="text-gray-600">Salida:</Text>
            <Text>{formatDate(checkOut)}</Text>
          </View>

          <View className="flex-row justify-between mb-1">
            <Text className="text-gray-600">Estancia:</Text>
            <Text>{nights} noches</Text>
          </View>

          <View className="border-t border-gray-300 my-2" />

          <View className="flex-row justify-between mb-1">
            <Text className="text-gray-600">Total habitación:</Text>
            <Text>${roomTotal.toFixed(2)}</Text>
          </View>

          <View className="flex-row justify-between mb-1">
            <Text className="text-gray-600">Impuestos y tasas:</Text>
            <Text>${taxesAndFees.toFixed(2)}</Text>
          </View>

          <View className="flex-row justify-between mt-2">
            <Text className="font-bold">Total:</Text>
            <Text className="font-bold text-primary">${totalAmount.toFixed(2)}</Text>
          </View>
        </View>

        {/* Main passenger information form */}
        <View className="p-4">
          <Text className="font-bold text-lg mb-4">Información del Huésped Principal</Text>

          <View className="mb-4">
            <Text className="text-gray-600 mb-1">Nombre</Text>
            <TextInput
              className="border border-gray-300 p-3 rounded-lg"
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Introduce tu nombre"
            />
          </View>

          <View className="mb-4">
            <Text className="text-gray-600 mb-1">Apellido</Text>
            <TextInput
              className="border border-gray-300 p-3 rounded-lg"
              value={lastName}
              onChangeText={setLastName}
              placeholder="Introduce tu apellido"
            />
          </View>

          <View className="mb-4">
            <Text className="text-gray-600 mb-1">Email</Text>
            <TextInput
              className="border border-gray-300 p-3 rounded-lg"
              value={email}
              onChangeText={setEmail}
              placeholder="Introduce tu email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View className="mb-4">
            <Text className="text-gray-600 mb-1">Teléfono</Text>
            <TextInput
              className="border border-gray-300 p-3 rounded-lg"
              value={phone}
              onChangeText={setPhone}
              placeholder="Introduce tu teléfono"
              keyboardType="phone-pad"
            />
          </View>

          <View className="mb-4">
            <Text className="text-gray-600 mb-1">Edad</Text>
            <TextInput
              className="border border-gray-300 p-3 rounded-lg"
              value={age}
              onChangeText={setAge}
              placeholder="Introduce tu edad"
              keyboardType="number-pad"
            />
          </View>
        </View>

        {/* Payment method selection */}
        <View className="p-4 border-t border-gray-200">
          <Text className="font-bold text-lg mb-4">Método de Pago</Text>

          {!addingNewCard && (
            <div>
              {DUMMY_PAYMENT_METHODS.map((method) => (
                <TouchableOpacity
                  key={method.id}
                  className={`flex-row justify-between items-center p-4 border rounded-lg mb-3 ${
                    selectedPaymentMethod === method.id ? "border-primary" : "border-gray-300"
                  }`}
                  onPress={() => setSelectedPaymentMethod(method.id)}
                >
                  <View className="flex-row items-center">
                    <Icon icon={method.icon} size={24} className="text-primary mr-3" />
                    <View>
                      <Text className="font-medium">
                        {method.name} •••• {method.last4}
                      </Text>
                      <Text className="text-gray-500 text-sm">Vence {method.expiryDate}</Text>
                    </View>
                  </View>
                  {selectedPaymentMethod === method.id && (
                    <Icon icon="check" size={20} className="text-primary" />
                  )}
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                className="flex-row items-center justify-center p-3 border border-dashed border-gray-300 rounded-lg"
                onPress={() => setAddingNewCard(true)}
              >
                <Icon icon="plus" size={20} className="text-gray-500 mr-2" />
                <Text className="text-gray-500">Añadir nuevo método de pago</Text>
              </TouchableOpacity>
            </div>
          )}

          {/* New card form */}
          {addingNewCard && (
            <div>
              <View className="mb-4">
                <Text className="text-gray-600 mb-1">Número de Tarjeta</Text>
                <TextInput
                  className="border border-gray-300 p-3 rounded-lg"
                  value={cardNumber}
                  onChangeText={setCardNumber}
                  placeholder="Introduce el número de tarjeta"
                  keyboardType="number-pad"
                  maxLength={16}
                />
              </View>

              <View className="mb-4">
                <Text className="text-gray-600 mb-1">Nombre del Titular</Text>
                <TextInput
                  className="border border-gray-300 p-3 rounded-lg"
                  value={cardName}
                  onChangeText={setCardName}
                  placeholder="Introduce el nombre del titular"
                />
              </View>

              <View className="flex-row mb-4">
                <View className="flex-1 mr-2">
                  <Text className="text-gray-600 mb-1">Fecha de Caducidad</Text>
                  <TextInput
                    className="border border-gray-300 p-3 rounded-lg"
                    value={cardExpiry}
                    onChangeText={setCardExpiry}
                    placeholder="MM/AA"
                    maxLength={5}
                  />
                </View>

                <View className="flex-1 ml-2">
                  <Text className="text-gray-600 mb-1">CVV</Text>
                  <TextInput
                    className="border border-gray-300 p-3 rounded-lg"
                    value={cardCVV}
                    onChangeText={setCardCVV}
                    placeholder="123"
                    keyboardType="number-pad"
                    maxLength={4}
                    secureTextEntry
                  />
                </View>
              </View>

              <View className="flex-row justify-between">
                <TouchableOpacity className="px-4 py-2" onPress={() => setAddingNewCard(false)}>
                  <Text className="text-primary">Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="bg-primary px-4 py-2 rounded-lg"
                  onPress={() => {
                    // Add the new card to saved cards and select it
                    setAddingNewCard(false)
                    setSelectedPaymentMethod("new")
                  }}
                >
                  <Text className="text-white">Guardar Tarjeta</Text>
                </TouchableOpacity>
              </View>
            </div>
          )}
        </View>
      </ScrollView>

      {/* Bottom payment button */}
      <View
        className="bg-white p-4 flex-row items-center"
        style={{ paddingBottom: insets.bottom + 10 }}
      >
        <TouchableOpacity
          className="bg-primary p-4 rounded-lg justify-center items-center"
          onPress={handlePayment}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text className="font-semibold text-white">
              Completar Reserva - ${totalAmount.toFixed(2)}
            </Text>
          )}
        </TouchableOpacity>

        <Text className="text-center text-gray-500 text-xs mt-3">
          Al completar esta reserva, aceptas nuestros Términos y Condiciones y Política de
          Privacidad.
        </Text>
      </View>
    </View>
  )
}
