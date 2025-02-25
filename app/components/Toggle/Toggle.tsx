import { ComponentType, FC, useMemo } from "react"
import {
  GestureResponderEvent,
  SwitchProps,
  TextInputProps,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
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
  inputOuterClassName?: string
  /**
   * Optional input style override.
   * This gives the inputs their inner characteristics and "on" background-color.
   */
  inputInnerClassName?: string
  /**
   * Optional detail style override.
   * See Checkbox, Radio, and Switch for more details
   */
  inputDetailClassName?: string
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
  outerClassName?: string
  innerClassName?: string
  detailClassName?: string
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

  const Wrapper = useMemo(
    () =>
      (disabled ? StyledView : StyledTouchableOpacity) as ComponentType<
        { className?: string } & (TouchableOpacityProps | ViewProps)
      >,
    [disabled],
  )

  function handlePress(e: GestureResponderEvent) {
    if (disabled) return
    onValueChange?.(!value)
    onPress?.(e)
  }

  return (
    <Wrapper
      activeOpacity={1}
      accessibilityRole={accessibilityRole}
      accessibilityState={{ checked: value, disabled }}
      {...WrapperProps}
      className={className}
      onPress={handlePress}
    >
      <StyledView className={nwMerge("flex-row", inputWrapperClassName)}>
        {labelPosition === "left" && <FieldLabel<T> {...props} labelPosition={labelPosition} />}

        <ToggleInput
          on={!!value}
          disabled={!!disabled}
          status={status}
          outerClassName={props.inputOuterClassName}
          innerClassName={props.inputInnerClassName}
          detailClassName={props.inputDetailClassName}
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
            "mt-1 text-text-secondary",
            status === "error" && "text-red-500",
            HelperTextProps?.className,
          )}
        />
      )}
    </Wrapper>
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

  const labelClasses = nwMerge(
    "text-text-primary flex-1",
    status === "error" && "text-red-500",
    labelPosition === "right" && "ml-2",
    labelPosition === "left" && "mr-2",
    labelClassName,
    LabelTextProps?.className,
  )

  return (
    <Text
      preset="formLabel"
      text={label}
      tx={labelTx}
      txOptions={labelTxOptions}
      {...LabelTextProps}
      className={labelClasses}
    />
  )
}
