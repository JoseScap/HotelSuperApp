import { forwardRef, ReactElement } from "react"
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native"
import { Icon, IconTypes } from "./Icon"
import { Text, TextProps } from "./Text"
import { styled } from "nativewind"
import { nwMerge } from "@/utils/nwMerge"

const StyledView = styled(View)
const StyledTouchableOpacity = styled(TouchableOpacity)

export interface ListItemProps extends Omit<TouchableOpacityProps, "style"> {
  /**
   * How tall the list item should be.
   * Default: 56
   */
  height?: number
  /**
   * Whether to show the top separator.
   * Default: false
   */
  topSeparator?: boolean
  /**
   * Whether to show the bottom separator.
   * Default: false
   */
  bottomSeparator?: boolean
  /**
   * Text to display if not using `tx` or nested components.
   */
  text?: TextProps["text"]
  /**
   * Text which is looked up via i18n.
   */
  tx?: TextProps["tx"]
  /**
   * Children components.
   */
  children?: TextProps["children"]
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: TextProps["txOptions"]
  /**
   * Optional text style override.
   */
  textClassName?: string
  /**
   * Pass any additional props directly to the Text component.
   */
  TextProps?: TextProps
  /**
   * Optional View container style override.
   */
  containerClassName?: string
  /**
   * Optional TouchableOpacity style override.
   */
  className?: string
  /**
   * Icon that should appear on the left.
   */
  leftIcon?: IconTypes
  /**
   * An optional tint color for the left icon
   */
  leftIconColor?: string
  /**
   * Icon that should appear on the right.
   */
  rightIcon?: IconTypes
  /**
   * An optional tint color for the right icon
   */
  rightIconColor?: string
  /**
   * Right action custom ReactElement.
   * Overrides `rightIcon`.
   */
  RightComponent?: ReactElement
  /**
   * Left action custom ReactElement.
   * Overrides `leftIcon`.
   */
  LeftComponent?: ReactElement
}

interface ListItemActionProps {
  icon?: IconTypes
  iconColor?: string
  Component?: ReactElement
  size: number
  side: "left" | "right"
}

/**
 * A styled row component that can be used in FlatList, SectionList, or by itself.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/ListItem/}
 * @param {ListItemProps} props - The props for the `ListItem` component.
 * @returns {JSX.Element} The rendered `ListItem` component.
 */
export const ListItem = forwardRef<View, ListItemProps>(function ListItem(
  props: ListItemProps,
  ref,
) {
  const {
    bottomSeparator,
    children,
    height = 56,
    LeftComponent,
    leftIcon,
    leftIconColor,
    RightComponent,
    rightIcon,
    rightIconColor,
    className,
    text,
    TextProps,
    topSeparator,
    tx,
    txOptions,
    textClassName,
    containerClassName,
    ...TouchableOpacityProps
  } = props

  const containerClasses = nwMerge(
    topSeparator && "border-t border-secondary",
    bottomSeparator && "border-b border-secondary",
    containerClassName,
  )

  const touchableClasses = nwMerge("flex-row items-start", `min-h-[${height}px]`, className)

  const textClasses = nwMerge(
    "py-2 self-center flex-1 shrink text-text-primary",
    textClassName,
    TextProps?.className,
  )

  return (
    <StyledView ref={ref} className={containerClasses}>
      <StyledTouchableOpacity {...TouchableOpacityProps} className={touchableClasses}>
        <ListItemAction
          side="left"
          size={height}
          icon={leftIcon}
          iconColor={leftIconColor}
          Component={LeftComponent}
        />

        <Text {...TextProps} tx={tx} text={text} txOptions={txOptions} className={textClasses}>
          {children}
        </Text>

        <ListItemAction
          side="right"
          size={height}
          icon={rightIcon}
          iconColor={rightIconColor}
          Component={RightComponent}
        />
      </StyledTouchableOpacity>
    </StyledView>
  )
})

/**
 * @param {ListItemActionProps} props - The props for the `ListItemAction` component.
 * @returns {JSX.Element | null} The rendered `ListItemAction` component.
 */
function ListItemAction(props: ListItemActionProps) {
  const { icon, Component, iconColor, size, side } = props

  const iconContainerClasses = nwMerge(
    "justify-center items-center flex-grow-0",
    side === "left" && "mr-4",
    side === "right" && "ml-4",
    `h-[${size}px]`,
  )

  if (Component) return Component

  if (icon !== undefined) {
    return (
      <Icon size={24} icon={icon} color={iconColor} containerClassName={iconContainerClasses} />
    )
  }

  return null
}
