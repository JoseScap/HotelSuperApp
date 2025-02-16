import { ComponentType, forwardRef, Ref, useImperativeHandle, useRef } from "react"
import { TextInput, TextInputProps, TouchableOpacity, View } from "react-native"
import { isRTL, translate } from "@/i18n"
import { Text, TextProps } from "./Text"
import { styled } from "nativewind"
import { nwMerge } from "@/utils/nwMerge"
import { useAppTheme } from "@/utils/useAppTheme"

const StyledTextInput = styled(TextInput)
const StyledTouchableOpacity = styled(TouchableOpacity)
const StyledView = styled(View)

export interface TextFieldAccessoryProps {
  className?: string
  status?: TextFieldProps["status"]
  multiline?: boolean
  editable?: boolean
}

export interface TextFieldProps extends Omit<TextInputProps, "ref"> {
  /**
   * A style modifier for different input states.
   */
  status?: "error" | "disabled"
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
   * The placeholder text to display if not using `placeholderTx`.
   */
  placeholder?: TextProps["text"]
  /**
   * Placeholder text which is looked up via i18n.
   */
  placeholderTx?: TextProps["tx"]
  /**
   * Optional placeholder options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  placeholderTxOptions?: TextProps["txOptions"]
  /**
   * Optional input style override.
   */
  className?: string
  /**
   * Style overrides for the container
   */
  containerClassName?: string
  /**
   * Style overrides for the input wrapper
   */
  inputWrapperClassName?: string
  /**
   * An optional component to render on the right side of the input.
   * Example: `RightAccessory={(props) => <Icon icon="search" {...props} />}`
   */
  RightAccessory?: ComponentType<TextFieldAccessoryProps>
  /**
   * An optional component to render on the left side of the input.
   * Example: `LeftAccessory={(props) => <Icon icon="search" {...props} />}`
   */
  LeftAccessory?: ComponentType<TextFieldAccessoryProps>
}

// Base styles
const CONTAINER_BASE = ""
const LABEL_BASE = "mb-1"
const INPUT_WRAPPER_BASE =
  "flex-row items-start border rounded overflow-hidden bg-neutral-200 dark:bg-neutral-800 border-neutral-400 dark:border-neutral-600"
const INPUT_BASE =
  "flex-1 self-stretch font-normal text-base py-0 px-0 my-2 mx-3 text-neutral-900 dark:text-neutral-100"
const HELPER_BASE = "mt-1"
const ACCESSORY_BASE = "h-10 justify-center items-center z-[1]"

// Estado error
const ERROR_INPUT_WRAPPER = "border-error"
const ERROR_HELPER = "text-error"

// Estado disabled
const DISABLED_INPUT = "text-neutral-600 dark:text-neutral-400"

export const TextField = forwardRef(function TextField(props: TextFieldProps, ref: Ref<TextInput>) {
  const {
    labelTx,
    label,
    labelTxOptions,
    placeholderTx,
    placeholder,
    placeholderTxOptions,
    helper,
    helperTx,
    helperTxOptions,
    status,
    RightAccessory,
    LeftAccessory,
    HelperTextProps,
    LabelTextProps,
    className,
    containerClassName,
    inputWrapperClassName,
    ...TextInputProps
  } = props

  const input = useRef<TextInput>(null)

  const {
    theme: { colors },
  } = useAppTheme()

  const disabled = TextInputProps.editable === false || status === "disabled"

  const placeholderContent = placeholderTx
    ? translate(placeholderTx, placeholderTxOptions)
    : placeholder

  const containerClasses = nwMerge(CONTAINER_BASE, containerClassName)

  const labelClasses = nwMerge(LABEL_BASE, LabelTextProps?.className)

  const inputWrapperClasses = nwMerge(
    INPUT_WRAPPER_BASE,
    status === "error" && ERROR_INPUT_WRAPPER,
    TextInputProps.multiline && "min-h-[112px]",
    LeftAccessory && "pl-0",
    RightAccessory && "pr-0",
    inputWrapperClassName,
  )

  const inputClasses = nwMerge(
    INPUT_BASE,
    disabled && DISABLED_INPUT,
    isRTL && "text-right",
    TextInputProps.multiline && "h-auto",
    className,
  )

  const helperClasses = nwMerge(
    HELPER_BASE,
    status === "error" && ERROR_HELPER,
    HelperTextProps?.className,
  )

  const leftAccessoryClasses = nwMerge(ACCESSORY_BASE, "ml-2")
  const rightAccessoryClasses = nwMerge(ACCESSORY_BASE, "mr-2")

  function focusInput() {
    if (disabled) return
    input.current?.focus()
  }

  useImperativeHandle(ref, () => input.current as TextInput)

  return (
    <StyledTouchableOpacity
      activeOpacity={1}
      className={containerClasses}
      onPress={focusInput}
      accessibilityState={{ disabled }}
    >
      {!!(label || labelTx) && (
        <Text
          preset="formLabel"
          text={label}
          tx={labelTx}
          txOptions={labelTxOptions}
          {...LabelTextProps}
          className={labelClasses}
        />
      )}

      <StyledView className={inputWrapperClasses}>
        {!!LeftAccessory && (
          <LeftAccessory
            className={leftAccessoryClasses}
            status={status}
            editable={!disabled}
            multiline={TextInputProps.multiline ?? false}
          />
        )}

        <StyledTextInput
          ref={input}
          underlineColorAndroid={colors.transparent}
          textAlignVertical="top"
          placeholder={placeholderContent}
          placeholderTextColor={colors.textDim}
          {...TextInputProps}
          editable={!disabled}
          className={inputClasses}
        />

        {!!RightAccessory && (
          <RightAccessory
            className={rightAccessoryClasses}
            status={status}
            editable={!disabled}
            multiline={TextInputProps.multiline ?? false}
          />
        )}
      </StyledView>

      {!!(helper || helperTx) && (
        <Text
          preset="formHelper"
          text={helper}
          tx={helperTx}
          txOptions={helperTxOptions}
          {...HelperTextProps}
          className={helperClasses}
        />
      )}
    </StyledTouchableOpacity>
  )
})
