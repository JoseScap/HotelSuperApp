import { ComponentType } from "react"
import { Image, TouchableOpacity, TouchableOpacityProps, View, ViewProps } from "react-native"
import { styled } from "nativewind"
import { nwMerge } from "@/utils/nwMerge"

const StyledImage = styled(Image)
const StyledView = styled(View)
const StyledTouchableOpacity = styled(TouchableOpacity)

export type IconTypes = keyof typeof iconRegistry

interface IconProps extends Omit<TouchableOpacityProps, "style"> {
  /**
   * The name of the icon
   */
  icon: IconTypes

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
}

/**
 * A component to render a registered icon.
 * It is wrapped in a <TouchableOpacity /> if `onPress` is provided, otherwise a <View />.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Icon/}
 * @param {IconProps} props - The props for the `Icon` component.
 * @returns {JSX.Element} The rendered `Icon` component.
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
}

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
