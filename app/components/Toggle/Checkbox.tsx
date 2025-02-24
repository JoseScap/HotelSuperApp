import { useEffect, useRef } from "react"
import { Animated, View, ViewStyle } from "react-native"
import { styled } from "nativewind"
import { useAppColors } from "@/hooks/useAppColors"
import { Icon } from "@/components/Icon"
import { BaseToggleInputProps, Toggle, ToggleProps } from "./Toggle"

const StyledView = styled(View)
const StyledAnimatedView = styled(Animated.View)

export interface CheckboxToggleProps extends Omit<ToggleProps<CheckboxInputProps>, "ToggleInput"> {
  /**
   * Optional style prop that affects the outer View.
   * Note: `width` and `height` rules should be points (numbers), not percentages.
   */
  inputOuterStyle?: ViewStyle
  /**
   * Optional style prop that affects the inner View.
   */
  inputInnerStyle?: ViewStyle
}

interface CheckboxInputProps extends BaseToggleInputProps<CheckboxToggleProps> {}

/**
 * @param {CheckboxToggleProps} props - The props for the `Checkbox` component.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Checkbox}
 * @returns {JSX.Element} The rendered `Checkbox` component.
 */
export function Checkbox(props: CheckboxToggleProps) {
  return <Toggle accessibilityRole="checkbox" {...props} ToggleInput={CheckboxInput} />
}

function CheckboxInput(props: CheckboxInputProps) {
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
    primary,
  ].filter(Boolean)[0]

  const iconColor = [
    disabled && text.secondary,
    status === "error" && "#EF4444",
    background.primary,
  ].filter(Boolean)[0]

  return (
    <StyledView
      className="h-6 w-6 rounded border"
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
        <Icon icon="BsCheckLg" size="sm" color={iconColor} />
      </StyledAnimatedView>
    </StyledView>
  )
}
