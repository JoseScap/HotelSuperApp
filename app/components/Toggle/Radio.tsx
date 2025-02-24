import { useEffect, useRef } from "react"
import { View, ViewStyle, Animated } from "react-native"
import { BaseToggleInputProps, ToggleProps, Toggle } from "./Toggle"
import { styled } from "nativewind"
import { useAppColors } from "@/hooks/useAppColors"

const StyledView = styled(View)
const StyledAnimatedView = styled(Animated.View)

export interface RadioToggleProps extends Omit<ToggleProps<RadioInputProps>, "ToggleInput"> {
  /**
   * Optional style prop that affects the dot View.
   */
  inputDetailStyle?: ViewStyle
}

interface RadioInputProps extends BaseToggleInputProps<RadioToggleProps> {}

/**
 * @param {RadioToggleProps} props - The props for the `Radio` component.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Radio}
 * @returns {JSX.Element} The rendered `Radio` component.
 */
export function Radio(props: RadioToggleProps) {
  return <Toggle accessibilityRole="radio" {...props} ToggleInput={RadioInput} />
}

function RadioInput(props: RadioInputProps) {
  const {
    on,
    status,
    disabled,
    outerStyle: $outerStyleOverride,
    innerStyle: $innerStyleOverride,
  } = props

  const { primary, text, background } = useAppColors()

  const opacity = useRef(new Animated.Value(0))

  useEffect(() => {
    Animated.timing(opacity.current, {
      toValue: on ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [on])

  const offBackgroundColor = [
    disabled && text.secondary,
    status === "error" && "#FEE2E2",
    "#E2E8F0",
  ].filter(Boolean)[0]

  const outerBorderColor = [
    disabled && text.secondary,
    status === "error" && "#EF4444",
    !on && text.primary,
    primary,
  ].filter(Boolean)[0]

  const onBackgroundColor = [
    disabled && "transparent",
    status === "error" && "#FEE2E2",
    background.primary,
  ].filter(Boolean)[0]

  const dotBackgroundColor = [
    disabled && text.secondary,
    status === "error" && "#EF4444",
    primary,
  ].filter(Boolean)[0]

  return (
    <StyledView
      className="h-6 w-6 rounded-full border"
      style={[
        { backgroundColor: offBackgroundColor, borderColor: outerBorderColor },
        $outerStyleOverride,
      ]}
    >
      <StyledAnimatedView
        className="flex h-full w-full items-center justify-center"
        style={[
          { backgroundColor: onBackgroundColor },
          $innerStyleOverride,
          { opacity: opacity.current },
        ]}
      >
        <StyledView
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: dotBackgroundColor }}
        />
      </StyledAnimatedView>
    </StyledView>
  )
}
