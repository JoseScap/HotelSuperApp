import { ComponentType, forwardRef, Ref, useImperativeHandle, useRef } from "react"
import {
  ImageStyle,
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { isRTL, translate } from "@/i18n"
import { Text, TextProps } from "./Text"
import { useAppTheme } from "@/utils/useAppTheme"
import { nwMerge } from "@/utils/nativeWindMerge"

export interface TextFieldAccessoryProps {
  style?: StyleProp<ViewStyle | TextStyle | ImageStyle>
  className?: string
  status: TextFieldProps["status"]
  multiline: boolean
  editable: boolean
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
  style?: StyleProp<TextStyle>
  /**
   * Style overrides for the container
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * Style overrides for the input wrapper
   */
  inputWrapperStyle?: StyleProp<ViewStyle>
  /**
   * An optional component to render on the right side of the input.
   */
  RightAccessory?: ComponentType<TextFieldAccessoryProps>
  /**
   * An optional component to render on the left side of the input.
   */
  LeftAccessory?: ComponentType<TextFieldAccessoryProps>
  /**
   * NativeWind class names for the container
   */
  className?: string
}

/**
 * A component that allows for the entering and editing of text.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/TextField/}
 * @param {TextFieldProps} props - The props for the `TextField` component.
 * @returns {JSX.Element} The rendered `TextField` component.
 */
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

  function focusInput() {
    if (disabled) return
    input.current?.focus()
  }

  useImperativeHandle(ref, () => input.current as TextInput)

  return (
    <TouchableOpacity
      activeOpacity={1}
      className={className}
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
          className="mb-1"
        />
      )}

      <View
        className={nwMerge(
          "flex-row items-start border rounded overflow-hidden",
          "bg-palette-neutral200 border-palette-neutral400",
          {
            "border-error": status === "error",
            "min-h-[112px]": Boolean(TextInputProps.multiline),
            "h-12": !TextInputProps.multiline,
            "pl-0": Boolean(LeftAccessory),
            "pl-2": !LeftAccessory,
            "pr-0": Boolean(RightAccessory),
            "pr-2": !RightAccessory,
          },
        )}
      >
        {!!LeftAccessory && (
          <LeftAccessory
            className="ml-1 h-10 justify-center items-center"
            status={status}
            editable={!disabled}
            multiline={TextInputProps.multiline ?? false}
          />
        )}

        <TextInput
          ref={input}
          underlineColorAndroid={colors.transparent}
          textAlignVertical="top"
          placeholder={placeholderContent}
          placeholderTextColor={colors.textDim}
          {...TextInputProps}
          editable={!disabled}
          className={nwMerge("flex-1 self-stretch font-normal text-base", "py-2 text-text", {
            "text-textDim": Boolean(disabled),
            "text-right": Boolean(isRTL),
            "h-auto": Boolean(TextInputProps.multiline),
            "h-8": !TextInputProps.multiline,
          })}
        />

        {!!RightAccessory && (
          <RightAccessory
            className="mr-1 h-10 justify-center items-center"
            status={status}
            editable={!disabled}
            multiline={TextInputProps.multiline ?? false}
          />
        )}
      </View>

      {!!(helper || helperTx) && (
        <Text
          preset="formHelper"
          text={helper}
          tx={helperTx}
          txOptions={helperTxOptions}
          {...HelperTextProps}
          className={nwMerge("mt-1", { "text-error": status === "error" })}
        />
      )}
    </TouchableOpacity>
  )
})
