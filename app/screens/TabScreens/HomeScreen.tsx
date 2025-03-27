import { FC, useState } from "react"
import { View, Text, TouchableOpacity, ScrollView, ImageBackground, Modal } from "react-native"
import { BottomHomeTabScreenProps } from "../../navigators/BottomNavigator"
import { Icon, Header } from "../../components"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { colors } from "@/constants/colors"

interface Activity {
  id: string
  title: string
  description: string
  image: any
}

// Componente para Card de experiencia/actividad
const ExperienceCard: FC<{
  title: string
  description: string
  image: any
  onPress: () => void
}> = ({ title, description, image, onPress }) => (
  <TouchableOpacity onPress={onPress} className="mr-3 w-64">
    <ImageBackground source={image} className="h-40 rounded-xl overflow-hidden justify-end">
      <View className="bg-black/25 h-full w-full justify-end">
        <View className="p-3">
          <Text className="text-white font-bold text-lg">{title}</Text>
          <Text className="text-white/80 text-sm">{description}</Text>
        </View>
      </View>
    </ImageBackground>
  </TouchableOpacity>
)

// Componente para Card de característica
const FeatureCard: FC<{
  title: string
  description: string
  image: any
  onPress: () => void
}> = ({ title, description, image, onPress }) => (
  <TouchableOpacity onPress={onPress} className="mb-4">
    <ImageBackground source={image} className="h-44 rounded-xl overflow-hidden">
      <View className="bg-black/25 h-full w-full justify-center">
        <View className="p-5">
          <Text className="text-white font-bold text-xl mb-1">{title}</Text>
          <Text className="text-white/90 text-base">{description}</Text>
        </View>
      </View>
    </ImageBackground>
  </TouchableOpacity>
)

// Componente para actividades rápidas
const QuickActivity: FC<{
  title: string
  icon: string
  onPress: () => void
}> = ({ title, icon, onPress }) => (
  <TouchableOpacity onPress={onPress} className="mr-3 items-center">
    <View className="w-14 h-14 bg-gray-100 rounded-full items-center justify-center mb-2">
      <Icon icon={icon} iconSet="MaterialIcons" isVectorIcon size={24} color={colors.primary} />
    </View>
    <Text className="text-center text-xs">{title}</Text>
  </TouchableOpacity>
)

export const HomeScreen: FC<BottomHomeTabScreenProps<"Home">> = function HomeScreen({
  navigation,
}) {
  const [modalVisible, setModalVisible] = useState(false)
  const insets = useSafeAreaInsets()

  // Datos de ejemplo
  const activities: Activity[] = [
    {
      id: "1",
      title: "Tour de la Ciudad",
      description: "Recorre los lugares históricos",
      image: {
        uri: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      },
    },
    {
      id: "2",
      title: "Gastronomía Local",
      description: "Descubre sabores típicos",
      image: {
        uri: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      },
    },
    {
      id: "3",
      title: "Bienestar",
      description: "Relájate en nuestro spa",
      image: {
        uri: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      },
    },
  ]

  return (
    <View className="flex-1 bg-primary">
      {/* Status bar padding */}
      <View style={{ paddingTop: insets.top }} />

      {/* Scrollable content */}
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 pt-2">
        {/* Header with profile and notification buttons */}
        <View className="flex-row justify-between items-center px-4 py-8 bg-primary">
          <Text className="text-2xl font-bold text-white">Hola, Ana!</Text>
          <View className="flex-row">
            <TouchableOpacity onPress={() => navigation.navigate("Chat")} className="mr-3">
              <Icon icon="chat" iconSet="MaterialIcons" isVectorIcon size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
              <Icon
                icon="notifications"
                iconSet="MaterialIcons"
                isVectorIcon
                size={24}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View className="bg-white rounded-t-3xl">
          {/* Book now feature */}
          <View className="px-4 pt-6 w-full">
            <FeatureCard
              title="Reserva tu habitación"
              description="Encuentra la mejor tarifa garantizada"
              image={{
                uri: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
              }}
              onPress={() => setModalVisible(true)}
            />

            {/* Quick actions */}
            <Text className="text-lg font-bold mb-3">Acciones rápidas</Text>
            <View className="mb-6 w-full flex-row justify-around items-center">
              <QuickActivity
                title="Check-in"
                icon="login"
                onPress={() => navigation.navigate("CheckIn", { bookingId: "B12345" })}
              />
              <QuickActivity title="Restaurante" icon="restaurant" onPress={() => {}} />
              <QuickActivity title="Servicio" icon="room_service" onPress={() => {}} />
              <QuickActivity title="Spa" icon="spa" onPress={() => {}} />
            </View>
          </View>

          {/* Experiences section */}
          <View className="px-4">
            <Text className="text-lg font-bold mb-3">Experiencias</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {activities.map((activity) => (
                <ExperienceCard
                  key={activity.id}
                  title={activity.title}
                  description={activity.description}
                  image={activity.image}
                  onPress={() => {}}
                />
              ))}
            </ScrollView>
          </View>

          {/* Offers section */}
          <View className="px-4">
            <Text className="text-lg font-bold mb-3">Ofertas especiales</Text>
            <FeatureCard
              title="15% de descuento"
              description="En reservas de más de 3 noches"
              image={{
                uri: "https://images.unsplash.com/photo-1580785692938-2c09dbaf9146?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
              }}
              onPress={() => {}}
            />
          </View>

          {/* Featured amenities */}
          <View className="px-4 mb-4">
            <Text className="text-lg font-bold mb-3">Servicios destacados</Text>
            <FeatureCard
              title="Restaurante estrella"
              description="Disfruta de alta cocina"
              image={{
                uri: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
              }}
              onPress={() => {}}
            />
          </View>
        </View>
      </ScrollView>

      {/* Modal for selecting dates */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1">
          {/* Crear componente separado o una vista simple en lugar de usar SelectDatesScreen */}
          <View className="flex-1 bg-white">
            <Header
              leftIcon="caretLeft"
              leftIconColor="#000"
              onLeftPress={() => setModalVisible(false)}
              title="Seleccionar fechas"
              titleClassName="text-black"
              backgroundColor="white"
            />
            <TouchableOpacity
              className="p-4 bg-primary mx-4 my-4 rounded-lg items-center"
              onPress={() => {
                // Simulación de selección de fechas
                const today = new Date()
                const checkOut = new Date()
                checkOut.setDate(today.getDate() + 3)

                // Formato YYYY-MM-DD
                const checkInFormatted = today.toISOString().split("T")[0]
                const checkOutFormatted = checkOut.toISOString().split("T")[0]

                // Navegar a la selección de habitación
                navigation.navigate("SelectRoom", {
                  checkIn: checkInFormatted,
                  checkOut: checkOutFormatted,
                })

                // Cerrar modal
                setModalVisible(false)
              }}
            >
              <Text className="text-white font-bold">Seleccionar fechas</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}
