import { FC, useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native"
import { AppStackScreenProps } from "@/navigators/AppNavigator"
import { Icon, Header } from "@/components"
import { useSafeAreaInsets } from "react-native-safe-area-context"

interface RoomCategory {
  id: string
  name: string
  description: string
  amenities: string[]
  maxOccupancy: number
  basePrice: number
  imageUrl: string
  available: boolean
}

const DUMMY_ROOM_CATEGORIES: RoomCategory[] = [
  {
    id: "1",
    name: "Habitación Estándar",
    description:
      "Habitación confortable con todas las comodidades básicas para una estancia agradable.",
    amenities: ["WiFi gratis", "TV", "Aire acondicionado", "Baño privado"],
    maxOccupancy: 2,
    basePrice: 120,
    imageUrl:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    available: true,
  },
  {
    id: "2",
    name: "Habitación Deluxe",
    description: "Habitación espaciosa con amenidades premium y vista a la ciudad.",
    amenities: [
      "WiFi gratis",
      "TV",
      "Aire acondicionado",
      "Baño privado",
      "Mini bar",
      "Vista a la ciudad",
    ],
    maxOccupancy: 2,
    basePrice: 180,
    imageUrl:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    available: true,
  },
  {
    id: "3",
    name: "Suite",
    description: "Suite de lujo con sala de estar separada y comodidades premium.",
    amenities: [
      "WiFi gratis",
      "TV",
      "Aire acondicionado",
      "Baño privado",
      "Mini bar",
      "Sala de estar",
      "Cama king",
    ],
    maxOccupancy: 3,
    basePrice: 250,
    imageUrl:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    available: true,
  },
  {
    id: "4",
    name: "Habitación Familiar",
    description: "Perfecta para familias con espacio extra y comodidades.",
    amenities: [
      "WiFi gratis",
      "TV",
      "Aire acondicionado",
      "Baño privado",
      "Mini bar",
      "2 camas Queen",
    ],
    maxOccupancy: 4,
    basePrice: 220,
    imageUrl:
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    available: false,
  },
]

export const SelectRoomScreen: FC<AppStackScreenProps<"SelectRoom">> = function SelectRoomScreen({
  navigation,
  route,
}) {
  const insets = useSafeAreaInsets()
  const { checkIn, checkOut } = route.params
  const [loading, _setLoading] = useState(false)
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null)
  const [roomCategories, _setRoomCategories] = useState<RoomCategory[]>(DUMMY_ROOM_CATEGORIES)

  // Calculate number of nights between check-in and check-out
  const checkInDate = new Date(checkIn)
  const checkOutDate = new Date(checkOut)
  const nights = Math.round(
    (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24),
  )

  // Function to handle room selection
  const handleRoomSelect = (id: string) => {
    setSelectedRoomId(id)
  }

  // Function to proceed to payment
  const handleContinue = () => {
    if (selectedRoomId) {
      navigation.navigate("Payment", {
        roomId: selectedRoomId,
        checkIn,
        checkOut,
      })
    }
  }

  // Function to format dates to display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  // Render item for the flat list
  const renderRoomItem = ({ item }: { item: RoomCategory }) => (
    <TouchableOpacity
      className={`mb-4 bg-white rounded-lg overflow-hidden shadow ${
        !item.available ? "opacity-60" : ""
      }`}
      onPress={() => item.available && handleRoomSelect(item.id)}
      activeOpacity={item.available ? 0.7 : 1}
      disabled={!item.available}
    >
      <Image source={{ uri: item.imageUrl }} className="w-full h-48" resizeMode="cover" />

      {selectedRoomId === item.id && (
        <View className="absolute top-2 right-2 bg-primary rounded-full p-2">
          <Icon icon="check" size={20} className="text-white" />
        </View>
      )}

      {!item.available && (
        <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/10 justify-center items-center">
          <View className="bg-red-500/90 px-4 py-2 rounded-lg">
            <Text className="text-white font-bold">No disponible</Text>
          </View>
        </View>
      )}

      <View className="p-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-lg font-bold">{item.name}</Text>
          <Text className="text-lg font-bold text-primary">
            ${item.basePrice} <Text className="text-sm text-gray-500">/ noche</Text>
          </Text>
        </View>

        <Text className="text-gray-600 mt-1 mb-3">{item.description}</Text>

        <View className="flex-row flex-wrap mb-2">
          <View className="flex-row items-center mr-4 mb-1">
            <Icon icon="people" size={16} className="text-gray-500 mr-1" />
            <Text className="text-sm text-gray-500">Máx: {item.maxOccupancy}</Text>
          </View>

          <View className="flex-row items-center mr-4 mb-1">
            <Icon icon="wifi" size={16} className="text-gray-500 mr-1" />
            <Text className="text-sm text-gray-500">WiFi gratis</Text>
          </View>

          <View className="flex-row items-center mb-1">
            <Icon icon="checkmark" size={16} className="text-gray-500 mr-1" />
            <Text className="text-sm text-gray-500">{item.amenities.length} comodidades</Text>
          </View>
        </View>

        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => {
            // Show amenities detail (could be in a modal or new screen)
          }}
        >
          <Text className="text-primary text-sm">Ver detalles</Text>
          <Icon icon="caretRight" size={12} className="text-primary ml-1" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )

  return (
    <View className="flex-1 bg-white">
      {/* Header with back button */}
      <View className="pt-[20px]" style={{ paddingTop: insets.top }}>
        <Header
          leftIcon="caretLeft"
          leftIconColor="#000"
          onLeftPress={() => navigation.goBack()}
          title="Seleccionar habitación"
          titleClassName="text-black"
          backgroundColor="white"
        />
      </View>

      {/* Scrollable content */}
      <ScrollView showsVerticalScrollIndicator={true} className="pb-5">
        <View className="bg-primary/10 p-4 mb-4">
          <View className="flex-row justify-between mb-2">
            <View>
              <Text className="text-gray-500 text-sm">Entrada</Text>
              <Text className="font-medium">{formatDate(checkIn)}</Text>
            </View>

            <View>
              <Text className="text-gray-500 text-sm">Salida</Text>
              <Text className="font-medium">{formatDate(checkOut)}</Text>
            </View>

            <View>
              <Text className="text-gray-500 text-sm">Estancia</Text>
              <Text className="font-medium">{nights} noches</Text>
            </View>
          </View>
        </View>

        <View className="px-4">
          <Text className="text-xl font-bold mb-4">Habitaciones Disponibles</Text>

          {loading ? (
            <View className="py-8 items-center">
              <ActivityIndicator size="large" color="#10B981" />
              <Text className="mt-2 text-gray-500">Buscando habitaciones disponibles...</Text>
            </View>
          ) : (
            <FlatList
              data={roomCategories}
              renderItem={renderRoomItem}
              keyExtractor={(item) => item.id}
              className="pb-5"
              scrollEnabled={false}
            />
          )}
        </View>
      </ScrollView>

      {/* Room selection footer */}
      <View
        className="bg-white p-4 flex-row items-center pb-10"
        style={{ paddingBottom: insets.bottom + 10 }}
      >
        <TouchableOpacity
          className={`p-4 rounded-lg justify-center items-center ${
            selectedRoomId ? "bg-primary" : "bg-gray-300"
          } flex-1`}
          onPress={handleContinue}
          disabled={!selectedRoomId}
        >
          <Text className={`font-semibold ${selectedRoomId ? "text-white" : "text-gray-500"}`}>
            Continuar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
