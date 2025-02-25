import { View, Image, ScrollView } from "react-native"
import { styled } from "nativewind"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { Button } from "@/components/Button"
import { Icon } from "@/components/Icon"
import { useAppColors } from "@/hooks/useAppColors"
import { useNavigation, useRoute } from "@react-navigation/native"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { HomeStackParamList } from "@/navigators/types"
import { popularDestinations, recommendations } from "@/data/mockData"

const StyledView = styled(View)
const StyledScrollView = styled(ScrollView)
const StyledImage = styled(Image)

type Props = NativeStackScreenProps<HomeStackParamList, "DestinationDetail">

export function DestinationDetailScreen() {
  const colors = useAppColors()
  const navigation = useNavigation()
  const route = useRoute<Props["route"]>()
  const { destinationId } = route.params

  const destination = [...popularDestinations, ...recommendations].find(
    (d) => d.id === destinationId,
  )

  if (!destination) {
    return (
      <Screen preset="scroll" safeAreaEdges={["top"]} className="bg-white">
        <StyledView className="flex-1 items-center justify-center">
          <Text preset="heading" className="text-sky-900">
            Destino no encontrado
          </Text>
        </StyledView>
      </Screen>
    )
  }

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} className="bg-white">
      {/* Imagen Principal */}
      <StyledView className="relative">
        <StyledImage
          source={{ uri: destination.imageUrl }}
          className="w-full h-64"
          resizeMode="cover"
        />
        <StyledView className="absolute inset-0 bg-black/30" />

        {/* Header Flotante */}
        <StyledView className="absolute top-12 left-0 right-0 px-4">
          <StyledView className="flex-row items-center justify-between">
            <StyledView className="flex-row items-center">
              <Button
                preset="default"
                className="bg-white/20 border-0 w-10 h-10 rounded-full p-0 items-center justify-center"
                onPress={() => navigation.goBack()}
              >
                <Icon icon="BsBack" size={20} color="white" />
              </Button>
            </StyledView>
            <Button
              preset="default"
              className="bg-white/20 border-0 w-10 h-10 rounded-full p-0 items-center justify-center"
            >
              <Icon icon="BsHeart" size={20} color="white" />
            </Button>
          </StyledView>
        </StyledView>
      </StyledView>

      {/* Contenido */}
      <StyledScrollView className="px-4 pt-6">
        {/* Título y Ubicación */}
        <StyledView className="mb-6">
          <Text preset="heading" className="text-2xl text-sky-900 mb-2">
            {destination.name}
          </Text>
          <StyledView className="flex-row items-center mb-3">
            <Icon icon="BsLocation" size={16} color={colors.primary} />
            <Text preset="formHelper" className="ml-2 text-sky-700">
              {destination.location}
            </Text>
          </StyledView>
          {destination.distance && (
            <StyledView className="flex-row items-center mb-3">
              <Icon icon="BsWalk" size={16} color={colors.primary} />
              <Text preset="formHelper" className="ml-2 text-sky-700">
                {destination.distance} minutos caminando
              </Text>
            </StyledView>
          )}
          {destination.rating && (
            <StyledView className="flex-row items-center">
              <Icon icon="BsStar" size={16} color={colors.primary} />
              <Text preset="formHelper" className="ml-2 text-sky-700">
                {destination.rating} / 5.0
              </Text>
            </StyledView>
          )}
        </StyledView>

        {/* Descripción */}
        <StyledView className="mb-6">
          <Text preset="subheading" className="text-sky-900 mb-3">
            Descripción
          </Text>
          <Text preset="formHelper" className="text-sky-700">
            {destination.description}
          </Text>
        </StyledView>

        {/* Características */}
        <StyledView className="mb-8">
          <Text preset="subheading" className="text-sky-900 mb-4">
            Características
          </Text>
          <StyledView className="flex-row flex-wrap">
            {["WiFi Gratis", "Aire Acondicionado", "Servicio a la Habitación", "Vista al Mar"].map(
              (feature, index) => (
                <StyledView
                  key={index}
                  className="flex-row items-center bg-sky-50 rounded-full px-4 py-2 mr-2 mb-2"
                >
                  <Icon icon="BsCheck" size={16} color={colors.primary} />
                  <Text preset="formHelper" className="ml-2 text-sky-700">
                    {feature}
                  </Text>
                </StyledView>
              ),
            )}
          </StyledView>
        </StyledView>
      </StyledScrollView>

      {/* Footer con Botón */}
      <StyledView className="px-4 py-4 border-t border-neutral-100">
        <Button preset="filled" text="Explorar Más" className="w-full" />
      </StyledView>
    </Screen>
  )
}
