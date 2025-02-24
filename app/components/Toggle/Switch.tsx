import { useEffect, useRef, useCallback } from "react"
import { Animated, Image, Platform, View } from "react-native"
import { iconRegistry } from "@/components/Icon"
import { isRTL } from "@/i18n"
import { BaseToggleInputProps, Toggle, ToggleProps } from "./Toggle"
import { styled } from "nativewind"
import { nwMerge } from "@/utils/nwMerge"

const StyledView = styled(View)
const StyledImage = styled(Image)
const StyledAnimatedView = styled(Animated.View)

export interface SwitchToggleProps extends Omit<ToggleProps<SwitchInputProps>, "ToggleInput"> {
  /**
   * Switch-only prop that adds a text/icon label for on/off states.
   */
  accessibilityMode?: "text" | "icon"
  /**
   * Optional class name for the switch knob
   */
  inputDetailClassName?: string
}

interface SwitchInputProps extends BaseToggleInputProps<SwitchToggleProps> {
  accessibilityMode?: SwitchToggleProps["accessibilityMode"]
}

/**
 * @param {SwitchToggleProps} props - The props for the `Switch` component.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Switch}
 * @returns {JSX.Element} The rendered `Switch` component.
 */
export function Switch(props: SwitchToggleProps) {
  const { accessibilityMode, ...rest } = props
  const switchInput = useCallback(
    (toggleProps: SwitchInputProps) => (
      <SwitchInput {...toggleProps} accessibilityMode={accessibilityMode} />
    ),
    [accessibilityMode],
  )
  return <Toggle accessibilityRole="switch" {...rest} ToggleInput={switchInput} />
}

function SwitchInput(props: SwitchInputProps) {
  const { on, status, disabled, outerClassName, innerClassName, detailClassName } = props

  const animate = useRef(new Animated.Value(on ? 1 : 0))
  const opacity = useRef(new Animated.Value(0))

  useEffect(() => {
    Animated.timing(animate.current, {
      toValue: on ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [on])

  useEffect(() => {
    Animated.timing(opacity.current, {
      toValue: on ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [on])

  const rtlAdjustment = isRTL ? -1 : 1
  const knobWidth = 24 // Fixed width for the knob
  const paddingHorizontal = 4 // Fixed padding for the switch

  const outputRange =
    Platform.OS === "web"
      ? isRTL
        ? [knobWidth + paddingHorizontal, paddingHorizontal]
        : [paddingHorizontal, knobWidth + paddingHorizontal]
      : [rtlAdjustment * paddingHorizontal, rtlAdjustment * (knobWidth + paddingHorizontal)]

  const $animatedSwitchKnob = animate.current.interpolate({
    inputRange: [0, 1],
    outputRange,
  })

  const outerClasses = nwMerge(
    "h-8 w-14 rounded-full",
    disabled && "bg-neutral-400",
    status === "error" && "bg-red-100",
    !disabled && !status && "bg-neutral-300",
    outerClassName,
  )

  const innerClasses = nwMerge(
    "absolute inset-0 rounded-full",
    disabled && "bg-transparent",
    status === "error" && "bg-red-100",
    !disabled && !status && "bg-secondary",
    innerClassName,
  )

  const knobClasses = nwMerge(
    "absolute w-6 h-6 rounded-full left-0",
    on
      ? nwMerge(
          status === "error" && "bg-red-500",
          disabled && "bg-neutral-600",
          !disabled && !status && "bg-background-primary",
        )
      : nwMerge(
          disabled && "bg-neutral-600",
          status === "error" && "bg-red-500",
          !disabled && !status && "bg-neutral-200",
        ),
    detailClassName,
  )

  return (
    <StyledView className={outerClasses}>
      <StyledAnimatedView style={{ opacity: opacity.current }} className={innerClasses} />

      <SwitchAccessibilityLabel {...props} role="on" />
      <SwitchAccessibilityLabel {...props} role="off" />

      <StyledAnimatedView
        style={{ transform: [{ translateX: $animatedSwitchKnob }] }}
        className={knobClasses}
      />
    </StyledView>
  )
}

function SwitchAccessibilityLabel(props: SwitchInputProps & { role: "on" | "off" }) {
  const { on, disabled, status, accessibilityMode, role } = props

  if (!accessibilityMode) return null

  const shouldLabelBeVisible = (on && role === "on") || (!on && role === "off")

  const containerClasses = nwMerge(
    "absolute",
    role === "off" && "right-[5%]",
    role === "on" && "left-[5%]",
  )

  const indicatorClasses = nwMerge(
    role === "on" && "w-3 h-0.5",
    role === "off" && "w-2 h-2 rounded-full border",
    disabled && "border-neutral-600 bg-neutral-600",
    status === "error" && "border-red-500 bg-red-500",
    !disabled && !status && !on && "border-secondary bg-secondary",
    !disabled && !status && on && "border-background-primary bg-background-primary",
  )

  const iconClasses = nwMerge(
    "w-4 h-4",
    disabled && "tint-neutral-600",
    status === "error" && "tint-red-500",
    !disabled && !status && !on && "tint-secondary",
    !disabled && !status && on && "tint-background-primary",
  )

  return (
    <StyledView className={containerClasses}>
      {accessibilityMode === "text" && shouldLabelBeVisible && (
        <StyledView className={indicatorClasses} />
      )}

      {accessibilityMode === "icon" && shouldLabelBeVisible && (
        <StyledImage
          className={iconClasses}
          source={role === "off" ? iconRegistry.hidden : iconRegistry.view}
          resizeMode="contain"
        />
      )}
    </StyledView>
  )
}
