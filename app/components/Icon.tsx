import { TouchableOpacity, TouchableOpacityProps, View } from "react-native"
import { styled } from "nativewind"
import { useAppColors } from "@/hooks/useAppColors"
import { iconMapping, IconName } from "@/utils/iconMapping"

const StyledView = styled(View)
const StyledTouchableOpacity = styled(TouchableOpacity)

type IconSize = "sm" | "md" | "lg" | "xl" | number
type IconColor = "primary" | "secondary" | "danger" | string

interface IconProps extends TouchableOpacityProps {
  /**
   * The name of the icon from our icon mapping
   */
  icon: IconName

  /**
   * The size of the icon
   * sm: 16px
   * md: 24px
   * lg: 32px
   * xl: 48px
   * or a custom number value
   */
  size?: IconSize

  /**
   * The color variant of the icon
   * primary: theme primary color
   * secondary: theme secondary color
   * danger: red color for error states
   * or a custom color string
   */
  color?: IconColor

  /**
   * Optional style overrides for the icon container
   */
  className?: string

  /**
   * Whether the icon should be wrapped in a TouchableOpacity
   */
  touchable?: boolean
}

const sizeMap: Record<Exclude<IconSize, number>, number> = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
}

/**
 * A standardized icon component that wraps react-icons components
 * with consistent styling and behavior.
 *
 * @param props - The props for the Icon component
 * @returns A rendered icon with standardized styling
 *
 * @example
 * ```tsx
 * import { FaHeart } from "react-icons/fa"
 *
 * // Basic usage
 * <Icon icon={FaHeart} size="md" color="primary" />
 *
 * // As a button
 * <Icon
 *   icon={FaHeart}
 *   size="lg"
 *   color="secondary"
 *   touchable
 *   onPress={() => console.log("Pressed!")}
 * />
 * ```
 */
export function Icon({
  icon,
  size = "md",
  color = "primary",
  className,
  touchable = false,
  ...touchableProps
}: IconProps) {
  const { primary, secondary } = useAppColors()

  const iconSize = typeof size === "string" ? sizeMap[size] : size

  const iconColor = (() => {
    switch (color) {
      case "primary":
        return primary
      case "secondary":
        return secondary
      case "danger":
        return "#EF4444" // Tailwind's red-500
      default:
        return color
    }
  })()

  const { family: IconComponent, name } = iconMapping[icon]

  const content = (
    <StyledView className={className}>
      <IconComponent name={name} size={iconSize} color={iconColor} />
    </StyledView>
  )

  if (touchable) {
    return (
      <StyledTouchableOpacity activeOpacity={0.7} {...touchableProps}>
        {content}
      </StyledTouchableOpacity>
    )
  }

  return content
}
