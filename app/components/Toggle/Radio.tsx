import { useEffect, useRef } from "react"
import { View, Animated } from "react-native"
import { BaseToggleInputProps, ToggleProps, Toggle } from "./Toggle"
import { styled } from "nativewind"
import { nwMerge } from "@/utils/nwMerge"

const StyledView = styled(View)
const StyledAnimatedView = styled(Animated.View)

export interface RadioToggleProps extends Omit<ToggleProps<RadioInputProps>, "ToggleInput"> {
  /**
   * Optional class name for the radio dot
   */
  inputDetailClassName?: string
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
  const { on, status, disabled, outerClassName, innerClassName, detailClassName } = props

  const opacity = useRef(new Animated.Value(0))

  useEffect(() => {
    Animated.timing(opacity.current, {
      toValue: on ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [on])

  const outerClasses = nwMerge(
    "h-[32px] w-[32px] rounded-full border-2 justify-center items-center",
    disabled && "bg-neutral-400 border-neutral-400",
    status === "error" && "bg-red-100 border-red-500",
    !disabled && !status && !on && "border-neutral-800 bg-neutral-200",
    !disabled && !status && on && "border-secondary bg-neutral-200",
    outerClassName,
  )

  const innerClasses = nwMerge(
    "absolute inset-0 justify-center items-center",
    disabled && "bg-transparent",
    status === "error" && "bg-red-100",
    !disabled && !status && "bg-background-primary",
    innerClassName,
  )

  const dotClasses = nwMerge(
    "w-3 h-3 rounded-full",
    disabled && "bg-neutral-600",
    status === "error" && "bg-red-500",
    !disabled && !status && "bg-secondary",
    detailClassName,
  )

  return (
    <StyledView className={outerClasses}>
      <StyledAnimatedView style={{ opacity: opacity.current }} className={innerClasses}>
        <StyledView className={dotClasses} />
      </StyledAnimatedView>
    </StyledView>
  )
}
