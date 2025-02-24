import { ReactElement } from "react"
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native"
import { isRTL, translate } from "@/i18n"
import { ExtendedEdge, useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { Icon, IconTypes } from "./Icon"
import { Text, TextProps } from "./Text"
import { styled } from "nativewind"
import { nwMerge } from "@/utils/nwMerge"

const StyledView = styled(View)
const StyledTouchableOpacity = styled(TouchableOpacity)

export interface HeaderProps {
  /**
   * The layout of the title relative to the action components.
   * - `center` will force the title to always be centered relative to the header. If the title or the action buttons are too long, the title will be cut off.
   * - `flex` will attempt to center the title relative to the action buttons. If the action buttons are different widths, the title will be off-center relative to the header.
   */
  titleMode?: "center" | "flex"
  /**
   * Optional title style class name.
   */
  titleClassName?: string
  /**
   * Optional outer title container class name.
   */
  titleContainerClassName?: string
  /**
   * Optional inner header wrapper class name.
   */
  className?: string
  /**
   * Optional outer header container class name.
   */
  containerClassName?: string
  /**
   * Background color class from Tailwind
   */
  backgroundClassName?: string
  /**
   * Title text to display if not using `tx` or nested components.
   */
  title?: TextProps["text"]
  /**
   * Title text which is looked up via i18n.
   */
  titleTx?: TextProps["tx"]
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  titleTxOptions?: TextProps["txOptions"]
  /**
   * Icon that should appear on the left.
   * Can be used with `onLeftPress`.
   */
  leftIcon?: IconTypes
  /**
   * An optional tint color for the left icon
   */
  leftIconColor?: string
  /**
   * Left action text to display if not using `leftTx`.
   * Can be used with `onLeftPress`. Overrides `leftIcon`.
   */
  leftText?: TextProps["text"]
  /**
   * Left action text text which is looked up via i18n.
   * Can be used with `onLeftPress`. Overrides `leftIcon`.
   */
  leftTx?: TextProps["tx"]
  /**
   * Left action custom ReactElement if the built in action props don't suffice.
   * Overrides `leftIcon`, `leftTx` and `leftText`.
   */
  LeftActionComponent?: ReactElement
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  leftTxOptions?: TextProps["txOptions"]
  /**
   * What happens when you press the left icon or text action.
   */
  onLeftPress?: TouchableOpacityProps["onPress"]
  /**
   * Icon that should appear on the right.
   * Can be used with `onRightPress`.
   */
  rightIcon?: IconTypes
  /**
   * An optional tint color for the right icon
   */
  rightIconColor?: string
  /**
   * Right action text to display if not using `rightTx`.
   * Can be used with `onRightPress`. Overrides `rightIcon`.
   */
  rightText?: TextProps["text"]
  /**
   * Right action text text which is looked up via i18n.
   * Can be used with `onRightPress`. Overrides `rightIcon`.
   */
  rightTx?: TextProps["tx"]
  /**
   * Right action custom ReactElement if the built in action props don't suffice.
   * Overrides `rightIcon`, `rightTx` and `rightText`.
   */
  RightActionComponent?: ReactElement
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  rightTxOptions?: TextProps["txOptions"]
  /**
   * What happens when you press the right icon or text action.
   */
  onRightPress?: TouchableOpacityProps["onPress"]
  /**
   * Override the default edges for the safe area.
   */
  safeAreaEdges?: ExtendedEdge[]
}

interface HeaderActionProps {
  backgroundClassName?: string
  icon?: IconTypes
  iconColor?: string
  text?: TextProps["text"]
  tx?: TextProps["tx"]
  txOptions?: TextProps["txOptions"]
  onPress?: TouchableOpacityProps["onPress"]
  ActionComponent?: ReactElement
}

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 * The Header is meant to be used with the `screenOptions.header` option on navigators, routes, or screen components via `navigation.setOptions({ header })`.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Header/}
 * @param {HeaderProps} props - The props for the `Header` component.
 * @returns {JSX.Element} The rendered `Header` component.
 */
export function Header(props: HeaderProps) {
  const {
    backgroundClassName = "bg-background-primary",
    LeftActionComponent,
    leftIcon,
    leftIconColor,
    leftText,
    leftTx,
    leftTxOptions,
    onLeftPress,
    onRightPress,
    RightActionComponent,
    rightIcon,
    rightIconColor,
    rightText,
    rightTx,
    rightTxOptions,
    safeAreaEdges = ["top"],
    title,
    titleMode = "center",
    titleTx,
    titleTxOptions,
    titleContainerClassName,
    className,
    titleClassName,
    containerClassName,
  } = props

  const $containerInsets = useSafeAreaInsetsStyle(safeAreaEdges)

  const titleContent = titleTx ? translate(titleTx, titleTxOptions) : title

  const containerClasses = nwMerge(backgroundClassName, containerClassName)
  const wrapperClasses = nwMerge("flex-row items-center min-h-[56px] px-4", className)
  const titleWrapperClasses = nwMerge(
    "flex-1",
    titleMode === "center" && "absolute inset-x-0 items-center justify-center",
    titleMode === "flex" && "mx-2 justify-center",
    titleContainerClassName,
  )
  const titleClasses = nwMerge("text-text-primary text-base", isRTL && "text-right", titleClassName)

  return (
    <StyledView style={$containerInsets} className={containerClasses}>
      <StyledView className={wrapperClasses}>
        <HeaderAction
          tx={leftTx}
          text={leftText}
          icon={leftIcon}
          iconColor={leftIconColor}
          onPress={onLeftPress}
          txOptions={leftTxOptions}
          backgroundClassName={backgroundClassName}
          ActionComponent={LeftActionComponent}
        />

        {!!titleContent && (
          <StyledView className={titleWrapperClasses} pointerEvents="none">
            <Text weight="medium" size="md" text={titleContent} className={titleClasses} />
          </StyledView>
        )}

        <HeaderAction
          tx={rightTx}
          text={rightText}
          icon={rightIcon}
          iconColor={rightIconColor}
          onPress={onRightPress}
          txOptions={rightTxOptions}
          backgroundClassName={backgroundClassName}
          ActionComponent={RightActionComponent}
        />
      </StyledView>
    </StyledView>
  )
}

function HeaderAction(props: HeaderActionProps) {
  const { backgroundClassName, icon, text, tx, txOptions, onPress, ActionComponent, iconColor } =
    props

  const content = tx ? translate(tx, txOptions) : text

  if (ActionComponent) return ActionComponent

  if (content) {
    return (
      <StyledTouchableOpacity
        className={nwMerge("flex-row items-center min-h-[56px] px-4", backgroundClassName)}
        onPress={onPress}
        disabled={!onPress}
        activeOpacity={0.8}
      >
        <Text
          weight="medium"
          size="md"
          text={content}
          className={nwMerge("text-text-primary", isRTL && "text-right")}
        />
      </StyledTouchableOpacity>
    )
  }

  if (icon) {
    return (
      <StyledTouchableOpacity
        className={nwMerge("items-center justify-center min-h-[56px] px-4", backgroundClassName)}
        onPress={onPress}
        disabled={!onPress}
        activeOpacity={0.8}
      >
        <Icon size={24} icon={icon} color={iconColor} />
      </StyledTouchableOpacity>
    )
  }

  return <StyledView className="min-h-[56px] px-4" />
}
