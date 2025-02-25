import { useEffect, useRef, useCallback } from "react"
import { Image, Animated, View } from "react-native"
import { iconRegistry, IconTypes } from "../Icon"
import { BaseToggleInputProps, ToggleProps, Toggle } from "./Toggle"
import { styled } from "nativewind"
import { nwMerge } from "@/utils/nwMerge"

const StyledView = styled(View)
const StyledImage = styled(Image)
const StyledAnimatedView = styled(Animated.View)

export interface CheckboxToggleProps extends Omit<ToggleProps<CheckboxInputProps>, "ToggleInput"> {
  /**
   * Checkbox-only prop that changes the icon used for the "on" state.
   */
  icon?: IconTypes
  /**
   * Optional class name for the checkbox detail (icon)
   */
  inputDetailClassName?: string
}

interface CheckboxInputProps extends BaseToggleInputProps<CheckboxToggleProps> {
  icon?: CheckboxToggleProps["icon"]
}

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
    icon = "check",
    outerClassName,
    innerClassName,
    detailClassName,
  } = props

  const opacity = useRef(new Animated.Value(0))

  useEffect(() => {
    Animated.timing(opacity.current, {
      toValue: on ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [on])

  const outerClasses = nwMerge(
    "h-[32px] w-[32px] rounded border-2 justify-center items-center",
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
    !disabled && !status && "bg-secondary",
    innerClassName,
  )

  const iconClasses = nwMerge(
    "w-5 h-5",
    disabled && "tint-neutral-600",
    status === "error" && "tint-red-500",
    !disabled && !status && "tint-background-primary",
    detailClassName,
  )

  return (
    <StyledView className={outerClasses}>
      <StyledAnimatedView style={{ opacity: opacity.current }} className={innerClasses}>
        <StyledImage
          source={icon ? iconRegistry[icon] : iconRegistry.check}
          className={iconClasses}
          resizeMode="contain"
        />
      </StyledAnimatedView>
    </StyledView>
  )
}
