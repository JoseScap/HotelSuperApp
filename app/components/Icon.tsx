import { ComponentType } from "react"
import { Image, TouchableOpacity, TouchableOpacityProps, View, ViewProps } from "react-native"
import { styled } from "nativewind"
import { nwMerge } from "@/utils/nwMerge"

const StyledImage = styled(Image)
const StyledView = styled(View)
const StyledTouchableOpacity = styled(TouchableOpacity)

const StyledView = styled(View)
const StyledTouchableOpacity = styled(TouchableOpacity)

type IconSize = "sm" | "md" | "lg" | "xl" | number
type IconColor = "primary" | "secondary" | "danger" | string

interface IconProps extends Omit<TouchableOpacityProps, "style"> {
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
   * Style overrides for the icon
   */
  className?: string

  /**
   * Whether the icon should be wrapped in a TouchableOpacity
   */
  containerClassName?: string
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
export function Icon(props: IconProps) {
  const { icon, color, size, className, containerClassName, ...WrapperProps } = props

  const isPressable = !!WrapperProps.onPress
  const Wrapper = (WrapperProps?.onPress ? StyledTouchableOpacity : StyledView) as ComponentType<
    { className?: string } & (TouchableOpacityProps | ViewProps)
  >

  const imageClasses = nwMerge("object-contain", className)

  return (
    <Wrapper
      accessibilityRole={isPressable ? "imagebutton" : undefined}
      {...WrapperProps}
      className={containerClassName}
    >
      <StyledImage
        className={imageClasses}
        style={[
          color ? { tintColor: color } : undefined,
          size ? { width: size, height: size } : undefined,
        ].filter(Boolean)}
        source={iconRegistry[icon]}
      />
    </Wrapper>
  )

export const iconRegistry = {
  back: require("../../assets/icons/back.png"),
  bell: require("../../assets/icons/bell.png"),
  caretLeft: require("../../assets/icons/caretLeft.png"),
  caretRight: require("../../assets/icons/caretRight.png"),
  check: require("../../assets/icons/check.png"),
  clap: require("../../assets/icons/demo/clap.png"),
  community: require("../../assets/icons/demo/community.png"),
  components: require("../../assets/icons/demo/components.png"),
  debug: require("../../assets/icons/demo/debug.png"),
  github: require("../../assets/icons/demo/github.png"),
  heart: require("../../assets/icons/demo/heart.png"),
  hidden: require("../../assets/icons/hidden.png"),
  ladybug: require("../../assets/icons/ladybug.png"),
  lock: require("../../assets/icons/lock.png"),
  menu: require("../../assets/icons/menu.png"),
  more: require("../../assets/icons/more.png"),
  pin: require("../../assets/icons/demo/pin.png"),
  podcast: require("../../assets/icons/demo/podcast.png"),
  settings: require("../../assets/icons/settings.png"),
  slack: require("../../assets/icons/demo/slack.png"),
  view: require("../../assets/icons/view.png"),
  x: require("../../assets/icons/x.png"),
}
