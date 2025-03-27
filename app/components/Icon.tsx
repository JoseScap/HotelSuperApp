import { ComponentType } from "react"
import { Image, TouchableOpacity, TouchableOpacityProps, View, ViewProps } from "react-native"
import { styled } from "nativewind"
import { nwMerge } from "@/utils/nwMerge"
import { IconProvider, IconSet } from "./IconProvider"

const StyledImage = styled(Image)
const StyledView = styled(View)
const StyledTouchableOpacity = styled(TouchableOpacity)

export type IconTypes = keyof typeof iconRegistry

export interface IconProps extends Omit<TouchableOpacityProps, "style"> {
  /**
   * The name of the icon - either an image icon from iconRegistry or a vector icon name
   */
  icon: IconTypes | string

  /**
   * The icon set to use for vector icons
   */
  iconSet?: IconSet

  /**
   * An optional tint color for the icon
   */
  color?: string

  /**
   * An optional size for the icon. If not provided, the icon will be sized to the icon's resolution.
   */
  size?: number

  /**
   * Style overrides for the icon
   */
  className?: string

  /**
   * Style overrides for the icon container
   */
  containerClassName?: string

  /**
   * Whether to force use a vector icon instead of an image icon.
   * If false, we'll try to find a matching image icon first, and if not found, use vector icon.
   */
  isVectorIcon?: boolean
}

/**
 * A component to render a registered icon or a vector icon.
 * It is wrapped in a <TouchableOpacity /> if `onPress` is provided, otherwise a <View />.
 * @param {IconProps} props - The props for the `Icon` component.
 * @returns {JSX.Element} The rendered `Icon` component.
 */
export function Icon(props: IconProps) {
  const {
    icon,
    iconSet = "MaterialIcons",
    color,
    size,
    className,
    containerClassName,
    isVectorIcon = false,
    ...WrapperProps
  } = props

  const isPressable = !!WrapperProps.onPress
  const Wrapper = (WrapperProps?.onPress ? StyledTouchableOpacity : StyledView) as ComponentType<
    { className?: string } & (TouchableOpacityProps | ViewProps)
  >

  const imageClasses = nwMerge("object-contain", className)

  // Determine if we should use a vector icon or an image icon
  // Use vector icon if:
  // 1. isVectorIcon is true OR
  // 2. icon is not in the iconRegistry (assuming it's a vector icon name)
  const useVectorIcon = isVectorIcon || !Object.prototype.hasOwnProperty.call(iconRegistry, icon)

  return (
    <Wrapper
      accessibilityRole={isPressable ? "imagebutton" : undefined}
      {...WrapperProps}
      className={containerClassName}
    >
      {useVectorIcon ? (
        <IconProvider
          name={icon as string}
          iconSet={iconSet}
          size={size || 24}
          color={color || "black"}
          style={[]}
        />
      ) : (
        <StyledImage
          className={imageClasses}
          style={[
            color ? { tintColor: color } : undefined,
            size ? { width: size, height: size } : undefined,
          ].filter(Boolean)}
          source={iconRegistry[icon as IconTypes]}
        />
      )}
    </Wrapper>
  )
}

// Legacy image icons (consider migrating these to vector icons)
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
