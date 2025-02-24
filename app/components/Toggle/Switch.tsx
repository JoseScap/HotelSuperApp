import { useEffect, useRef, useCallback } from "react"
import { Animated, Platform, View, ViewStyle } from "react-native"

import { isRTL } from "@/i18n"
import { BaseToggleInputProps, Toggle, ToggleProps } from "./Toggle"
import { styled } from "nativewind"
import { nwMerge } from "@/utils/nwMerge"
import { useAppColors } from "@/hooks/useAppColors"
import { Icon } from "@/components/Icon"

const StyledView = styled(View)
const StyledAnimatedView = styled(Animated.View)

export interface SwitchToggleProps extends Omit<ToggleProps<SwitchInputProps>, "ToggleInput"> {
  /**
   * Switch-only prop that adds a text/icon label for on/off states.
   */
  accessibilityMode?: "text" | "icon"
  /**
   * Optional style prop that affects the knob View.
   * Note: `width` and `height` rules should be points (numbers), not percentages.
   */
  inputDetailStyle?: Omit<ViewStyle, "width" | "height"> & { width?: number; height?: number }
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
  const {
    on,
    status,
    disabled,
    outerStyle: $outerStyleOverride,
    innerStyle: $innerStyleOverride,
    detailStyle: $detailStyleOverride,
  } = props

  const { primary, text, background } = useAppColors()

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

  const knobSizeFallback = 2

  const knobWidth = [$detailStyleOverride?.width, 24, knobSizeFallback].find(
    (v) => typeof v === "number",
  )

  const knobHeight = [$detailStyleOverride?.height, 24, knobSizeFallback].find(
    (v) => typeof v === "number",
  )

  const offBackgroundColor = [
    disabled && text.secondary,
    status === "error" && "#FEE2E2",
    "#E2E8F0",
  ].filter(Boolean)[0]

  const onBackgroundColor = [
    disabled && "transparent",
    status === "error" && "#FEE2E2",
    primary,
  ].filter(Boolean)[0]

  const knobBackgroundColor = (function () {
    if (on) {
      return [
        $detailStyleOverride?.backgroundColor,
        status === "error" && "#EF4444",
        disabled && text.secondary,
        background.primary,
      ].filter(Boolean)[0]
    } else {
      return [
        $innerStyleOverride?.backgroundColor,
        disabled && text.secondary,
        status === "error" && "#EF4444",
        "#CBD5E1",
      ].filter(Boolean)[0]
    }
  })()

  const rtlAdjustment = isRTL ? -1 : 1
  const paddingStart = 4
  const paddingEnd = 4

  const offsetLeft = ($innerStyleOverride?.paddingStart ||
    $innerStyleOverride?.paddingLeft ||
    paddingStart ||
    0) as number

  const offsetRight = ($innerStyleOverride?.paddingEnd ||
    $innerStyleOverride?.paddingRight ||
    paddingEnd ||
    0) as number

  const outputRange =
    Platform.OS === "web"
      ? isRTL
        ? [+(knobWidth || 0) + offsetRight, offsetLeft]
        : [offsetLeft, +(knobWidth || 0) + offsetRight]
      : [rtlAdjustment * offsetLeft, rtlAdjustment * (+(knobWidth || 0) + offsetRight)]

  const $animatedSwitchKnob = animate.current.interpolate({
    inputRange: [0, 1],
    outputRange,
  })

  return (
    <StyledView
      className="h-8 w-14 rounded-2xl"
      style={[{ backgroundColor: offBackgroundColor }, $outerStyleOverride]}
    >
      <StyledAnimatedView
        className="absolute inset-0 rounded-2xl"
        style={[
          { backgroundColor: onBackgroundColor },
          $innerStyleOverride,
          { opacity: opacity.current },
        ]}
      />

      <SwitchAccessibilityLabel {...props} role="on" />
      <SwitchAccessibilityLabel {...props} role="off" />

      <StyledAnimatedView
        className="absolute rounded-xl"
        style={[
          $detailStyleOverride,
          { transform: [{ translateX: $animatedSwitchKnob }] },
          { width: knobWidth, height: knobHeight },
          { backgroundColor: knobBackgroundColor },
        ]}
      />
    </StyledView>
  )
}

/**
 * @param {ToggleInputProps & { role: "on" | "off" }} props - The props for the `SwitchAccessibilityLabel` component.
 * @returns {JSX.Element} The rendered `SwitchAccessibilityLabel` component.
 */
function SwitchAccessibilityLabel(props: SwitchInputProps & { role: "on" | "off" }) {
  const { on, disabled, status, accessibilityMode, role, innerStyle, detailStyle } = props
  const { primary, text, background } = useAppColors()

  if (!accessibilityMode) return null

  const shouldLabelBeVisible = (on && role === "on") || (!on && role === "off")

  const color = (function () {
    if (disabled) return text.secondary
    if (status === "error") return "#EF4444"
    if (!on) return innerStyle?.backgroundColor || primary
    return detailStyle?.backgroundColor || background.primary
  })()

  return (
    <StyledView
      className={nwMerge(
        "absolute top-1/2 -translate-y-1/2",
        role === "off" ? "right-[5%]" : "left-[5%]",
      )}
    >
      {accessibilityMode === "text" && shouldLabelBeVisible && (
        <StyledView
          className={nwMerge(
            role === "on" ? "h-[2px] w-[2px]" : "h-[4px] w-[4px] rounded-full border",
          )}
          style={[
            role === "on" && { backgroundColor: color },
            role === "off" && { borderColor: color },
          ]}
        />
      )}

      {accessibilityMode === "icon" && shouldLabelBeVisible && (
        <Icon icon={role === "off" ? "BsEyeSlashFill" : "BsEyeFill"} size="sm" color="primary" />
      )}
    </StyledView>
  )
}
