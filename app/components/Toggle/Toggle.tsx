import { FC } from "react"
import {
  GestureResponderEvent,
  ImageStyle,
  SwitchProps,
  TextInputProps,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native"
import { Text, TextProps } from "../Text"
import { styled } from "nativewind"
import { nwMerge } from "@/utils/nwMerge"

const StyledView = styled(View)
const StyledTouchableOpacity = styled(TouchableOpacity)

export interface ToggleProps<T> extends Omit<TouchableOpacityProps, "style"> {
  /**
   * A style modifier for different input states.
   */
  status?: "error" | "disabled"
  /**
   * If false, input is not editable. The default value is true.
   */
  editable?: TextInputProps["editable"]
  /**
   * The value of the field. If true the component will be turned on.
   */
  value?: boolean
  /**
   * Invoked with the new value when the value changes.
   */
  onValueChange?: SwitchProps["onValueChange"]
  /**
   * Style overrides for the container
   */
  className?: string
  /**
   * Style overrides for the input wrapper
   */
  inputWrapperClassName?: string
  /**
   * Optional input wrapper style override.
   * This gives the inputs their size, shape, "off" background-color, and outer border.
   */
  inputOuterStyle?: ViewStyle
  /**
   * Optional input style override.
   * This gives the inputs their inner characteristics and "on" background-color.
   */
  inputInnerStyle?: ViewStyle
  /**
   * Optional detail style override.
   * See Checkbox, Radio, and Switch for more details
   */
  inputDetailStyle?: ViewStyle
  /**
   * The position of the label relative to the action component.
   * Default: right
   */
  labelPosition?: "left" | "right"
  /**
   * The label text to display if not using `labelTx`.
   */
  label?: TextProps["text"]
  /**
   * Label text which is looked up via i18n.
   */
  labelTx?: TextProps["tx"]
  /**
   * Optional label options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  labelTxOptions?: TextProps["txOptions"]
  /**
   * Style overrides for label text.
   */
  labelClassName?: string
  /**
   * Pass any additional props directly to the label Text component.
   */
  LabelTextProps?: TextProps
  /**
   * The helper text to display if not using `helperTx`.
   */
  helper?: TextProps["text"]
  /**
   * Helper text which is looked up via i18n.
   */
  helperTx?: TextProps["tx"]
  /**
   * Optional helper options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  helperTxOptions?: TextProps["txOptions"]
  /**
   * Pass any additional props directly to the helper Text component.
   */
  HelperTextProps?: TextProps
  /**
   * The input control for the type of toggle component
   */
  ToggleInput: FC<BaseToggleInputProps<T>>
}

export interface BaseToggleInputProps<T> {
  on: boolean
  status: ToggleProps<T>["status"]
  disabled: boolean
  outerStyle: ViewStyle
  innerStyle: ViewStyle
  detailStyle: Omit<ViewStyle & ImageStyle, "overflow">
}

/**
 * Renders a boolean input.
 * This is a controlled component that requires an onValueChange callback that updates the value prop in order for the component to reflect user actions. If the value prop is not updated, the component will continue to render the supplied value prop instead of the expected result of any user actions.
 * @param {ToggleProps} props - The props for the `Toggle` component.
 * @returns {JSX.Element} The rendered `Toggle` component.
 */
export function Toggle<T>(props: ToggleProps<T>) {
  const {
    editable = true,
    status,
    value,
    onPress,
    onValueChange,
    labelPosition = "right",
    helper,
    helperTx,
    helperTxOptions,
    HelperTextProps,
    className,
    inputWrapperClassName,
    ToggleInput,
    accessibilityRole,
    ...WrapperProps
  } = props

  const disabled = editable === false || status === "disabled" || props.disabled

  function handlePress(e: GestureResponderEvent) {
    if (disabled) return
    onValueChange?.(!value)
    onPress?.(e)
  }

  const content = (
    <>
      <StyledView className={nwMerge("flex-row items-center", inputWrapperClassName)}>
        {labelPosition === "left" && <FieldLabel<T> {...props} labelPosition={labelPosition} />}

        <ToggleInput
          on={!!value}
          disabled={!!disabled}
          status={status}
          outerStyle={props.inputOuterStyle ?? {}}
          innerStyle={props.inputInnerStyle ?? {}}
          detailStyle={props.inputDetailStyle ?? {}}
        />

        {labelPosition === "right" && <FieldLabel<T> {...props} labelPosition={labelPosition} />}
      </StyledView>

      {!!(helper || helperTx) && (
        <Text
          preset="formHelper"
          text={helper}
          tx={helperTx}
          txOptions={helperTxOptions}
          {...HelperTextProps}
          className={nwMerge(
            "mt-1",
            status === "error" ? "text-error" : "text-text-dim",
            HelperTextProps?.className,
          )}
        />
      )}
    </>
  )

  if (disabled) {
    return (
      <StyledView
        accessibilityRole={accessibilityRole}
        accessibilityState={{ checked: value, disabled }}
        {...WrapperProps}
        className={className}
      >
        {content}
      </StyledView>
    )
  }

  return (
    <StyledTouchableOpacity
      activeOpacity={1}
      accessibilityRole={accessibilityRole}
      accessibilityState={{ checked: value, disabled }}
      {...WrapperProps}
      className={className}
      onPress={handlePress}
    >
      {content}
    </StyledTouchableOpacity>
  )
}

/**
 * @param {ToggleProps} props - The props for the `FieldLabel` component.
 * @returns {JSX.Element} The rendered `FieldLabel` component.
 */
function FieldLabel<T>(props: ToggleProps<T>) {
  const { status, label, labelTx, labelTxOptions, LabelTextProps, labelPosition, labelClassName } =
    props

  if (!label && !labelTx && !LabelTextProps?.children) return null

  return (
    <Text
      preset="formLabel"
      text={label}
      tx={labelTx}
      txOptions={labelTxOptions}
      {...LabelTextProps}
      className={nwMerge(
        labelPosition === "right" ? "ml-2" : "mr-2",
        status === "error" ? "text-error" : "text-text",
        labelClassName,
        LabelTextProps?.className,
      )}
    />
  )
}
