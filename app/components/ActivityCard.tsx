import { View, Image, TouchableOpacity } from "react-native"
import { styled } from "nativewind"
import { Text } from "./Text"
import { Icon } from "./Icon"
import { useAppColors } from "@/hooks/useAppColors"
import { ActivityCardProps } from "@/types/activities"
import { translate } from "@/i18n"

const StyledView = styled(View)
const StyledTouchableOpacity = styled(TouchableOpacity)
const StyledImage = styled(Image)

export function ActivityCard({ activity, onPress }: ActivityCardProps) {
  const colors = useAppColors()

  return (
    <StyledTouchableOpacity
      className="bg-white rounded-2xl shadow-sm overflow-hidden mb-4 active:opacity-80"
      onPress={() => onPress?.(activity)}
    >
      {/* Imagen y Badge de Categoría */}
      <StyledView className="relative">
        <StyledImage
          source={{ uri: activity.imageUrl }}
          className="w-full h-48"
          resizeMode="cover"
        />
        <StyledView
          className="absolute top-4 left-4 px-3 py-1 rounded-full"
          style={{ backgroundColor: colors.primary }}
        >
          <Text preset="formHelper" className="text-white capitalize">
            {activity.category}
          </Text>
        </StyledView>
      </StyledView>

      {/* Contenido */}
      <StyledView className="p-4">
        <Text preset="heading" className="text-lg text-sky-900 mb-2">
          {activity.title}
        </Text>
        <Text preset="formHelper" className="text-sky-700 mb-3" numberOfLines={2}>
          {activity.description}
        </Text>

        {/* Detalles */}
        <StyledView className="flex-row items-center justify-between">
          <StyledView className="flex-row items-center">
            <Icon icon="BsCalendarPlus" size={16} color={colors.primary} />
            <Text preset="formHelper" className="ml-2 text-sky-700">
              {translate("common.duration")}
              {activity.duration}
            </Text>
          </StyledView>
          <Text preset="formLabel" style={{ color: colors.primary }}>
            {translate("common.currency")}
            {activity.price}
          </Text>
        </StyledView>
      </StyledView>
    </StyledTouchableOpacity>
  )
} 