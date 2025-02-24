import { View, TouchableOpacity, Image, Dimensions } from "react-native"
import { styled } from "nativewind"
import { Text } from "./Text"
import { HotelPromotion } from "@/types"
import { useNavigation } from "@react-navigation/native"

const StyledView = styled(View)
const StyledTouchableOpacity = styled(TouchableOpacity)
const StyledImage = styled(Image)

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window")
const HEADER_HEIGHT = 100 // Altura aproximada del header + safe area
const CARD_GAP = 24 // Espacio entre tarjetas
const CARD_HEIGHT = SCREEN_HEIGHT - HEADER_HEIGHT - CARD_GAP - 125

interface PromotionCardProps {
  promotion: HotelPromotion
  onActionPress?: (link: string) => void
}

export function PromotionCard({ promotion, onActionPress }: PromotionCardProps) {
  const navigation = useNavigation()

  const handlePress = () => {
    if (promotion.callToAction?.text.toLowerCase().includes("reservar")) {
      navigation.navigate("Booking" as never)
    } else if (promotion.callToAction?.link && onActionPress) {
      onActionPress(promotion.callToAction.link)
    }
  }

  return (
    <StyledView
      className="items-start justify-start py-3"
      style={{ height: SCREEN_HEIGHT - HEADER_HEIGHT }}
    >
      <StyledView
        className="bg-white rounded-3xl shadow-lg overflow-hidden mx-4 border border-gray-200"
        style={{ height: CARD_HEIGHT, width: SCREEN_WIDTH - 32 }}
      >
        {/* Imagen */}
        <StyledView className="flex-1">
          <StyledImage
            source={{ uri: promotion.gifUrl }}
            className="w-full h-full"
            resizeMode="cover"
          />
          {/* Overlay gradiente */}
          <StyledView className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </StyledView>

        {/* Contenido */}
        <StyledView className="p-6 bg-white">
          <Text preset="heading" className="text-xl text-sky-900 mb-2">
            {promotion.title}
          </Text>
          <Text preset="formHelper" className="text-sky-700 mb-4">
            {promotion.description}
          </Text>

          {promotion.callToAction && (
            <StyledTouchableOpacity
              className="bg-sky-500 rounded-full py-3 px-6 self-start active:opacity-80"
              onPress={handlePress}
            >
              <Text preset="formLabel" className="text-white">
                {promotion.callToAction.text}
              </Text>
            </StyledTouchableOpacity>
          )}
        </StyledView>
      </StyledView>
    </StyledView>
  )
}
