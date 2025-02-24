import { View, Image, TouchableOpacity } from "react-native"
import { styled } from "nativewind"
import { Text } from "./Text"
import { Icon } from "./Icon"
import { useAppColors } from "@/hooks/useAppColors"
import { DestinationCardProps } from "@/types/destinations"

const StyledView = styled(View)
const StyledTouchableOpacity = styled(TouchableOpacity)
const StyledImage = styled(Image)

export function DestinationCard({ destination, onPress }: DestinationCardProps) {
  const colors = useAppColors()

  return (
    <StyledTouchableOpacity
      className="bg-white rounded-2xl shadow-sm overflow-hidden mr-4 active:opacity-80"
      style={{ width: 280 }}
      onPress={() => onPress?.(destination)}
    >
      {/* Imagen */}
      <StyledImage
        source={{ uri: destination.imageUrl }}
        className="w-full h-40"
        resizeMode="cover"
      />

      {/* Contenido */}
      <StyledView className="p-4">
        <Text preset="heading" className="text-lg text-sky-900 mb-1">
          {destination.name}
        </Text>
        <StyledView className="flex-row items-center mb-2">
          <Icon icon="BsMenuApp" size={16} color={colors.primary} />
          <Text preset="formHelper" className="ml-2 text-sky-700">
            {destination.location}
          </Text>
        </StyledView>

        {destination.description && (
          <Text preset="formHelper" className="text-sky-700" numberOfLines={2}>
            {destination.description}
          </Text>
        )}

        {/* Rating y Distancia */}
        {(destination.rating || destination.distance) && (
          <StyledView className="flex-row items-center justify-between mt-3">
            {destination.rating && (
              <StyledView className="flex-row items-center">
                <Icon icon="BsHeart" size={16} color={colors.primary} />
                <Text preset="formHelper" className="ml-2" style={{ color: colors.primary }}>
                  {destination.rating.toFixed(1)}
                </Text>
              </StyledView>
            )}
            {destination.distance && (
              <Text preset="formHelper" className="text-sky-700">
                {destination.distance}
              </Text>
            )}
          </StyledView>
        )}
      </StyledView>
    </StyledTouchableOpacity>
  )
} 