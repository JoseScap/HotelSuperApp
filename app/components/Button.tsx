import { ComponentType } from "react"
import { Pressable, PressableProps, PressableStateCallbackType, View } from "react-native"
import { Text, TextProps } from "./Text"
import { styled } from "nativewind"
import { nwMerge } from "@/utils/nwMerge"
import { useAppTheme } from "@/utils/useAppTheme"

const StyledPressable = styled(Pressable)
const StyledText = styled(Text)
const StyledView = styled(View)

type Presets = "default" | "filled" | "reversed"

export interface ButtonAccessoryProps {
  className?: string
  pressableState: PressableStateCallbackType
  disabled?: boolean
}

export interface ButtonProps extends PressableProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TextProps["tx"]
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: TextProps["text"]
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: TextProps["txOptions"]
  /**
   * An optional style override useful for padding & margin.
   */
  className?: string
  /**
   * An optional style override for the "pressed" state.
   */
  pressedClassName?: string
  /**
   * An optional style override for the button text when in the "disabled" state.
   */
  disabledClassName?: string
  /**
   * An optional style override for the button text.
   */
  textClassName?: string
  /**
   * An optional style override for the button text when in the "pressed" state.
   */
  pressedTextClassName?: string
  /**
   * An optional style override for the button text when in the "disabled" state.
   */
  disabledTextClassName?: string
  /**
   * One of the different types of button presets.
   */
  preset?: Presets
  /**
   * An optional component to render on the right side of the text.
   * Example: `RightAccessory={(props) => <View {...props} />}`
   */
  RightAccessory?: ComponentType<ButtonAccessoryProps>
  /**
   * An optional component to render on the left side of the text.
   * Example: `LeftAccessory={(props) => <View {...props} />}`
   */
  LeftAccessory?: ComponentType<ButtonAccessoryProps>
  /**
   * Children components.
   */
  children?: React.ReactNode
  /**
   * disabled prop, accessed directly for declarative styling reasons.
   * https://reactnative.dev/docs/pressable#disabled
   */
  disabled?: boolean
}

interface PresetStyle {
  base: {
    light: string
    dark: string
  }
  pressed: {
    light: string
    dark: string
  }
  text: {
    light: string
    dark: string
  }
}

// Base styles
const BUTTON_BASE =
  "min-h-[56px] rounded-[4px] justify-center items-center py-3 px-3 overflow-hidden flex-row"
const BUTTON_TEXT_BASE =
  "text-[16px] leading-[20px] font-medium text-center flex-shrink flex-grow-0 z-[2]"

// Preset styles con soporte para dark mode
const BUTTON_PRESETS: Record<Presets, PresetStyle> = {
  default: {
    base: {
      light: "border border-neutral-400 bg-neutral-100",
      dark: "border border-neutral-600 bg-neutral-900",
    },
    pressed: {
      light: "bg-neutral-200",
      dark: "bg-neutral-800",
    },
    text: {
      light: "text-neutral-800",
      dark: "text-neutral-200",
    },
  },
  filled: {
    base: {
      light: "bg-neutral-300",
      dark: "bg-neutral-700",
    },
    pressed: {
      light: "bg-neutral-400",
      dark: "bg-neutral-600",
    },
    text: {
      light: "text-neutral-800",
      dark: "text-neutral-200",
    },
  },
  reversed: {
    base: {
      light: "bg-neutral-800",
      dark: "bg-neutral-200",
    },
    pressed: {
      light: "bg-neutral-700",
      dark: "bg-neutral-300",
    },
    text: {
      light: "text-neutral-100",
      dark: "text-neutral-900",
    },
  },
}

const ACCESSORY_CLASSES = "z-[1]"
const LEFT_ACCESSORY_CLASSES = nwMerge(ACCESSORY_CLASSES, "me-2")
const RIGHT_ACCESSORY_CLASSES = nwMerge(ACCESSORY_CLASSES, "ms-2")

/**
 * A component that allows users to take actions and make choices.
 * Wraps the Text component with a Pressable component.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Button/}
 * @param {ButtonProps} props - The props for the `Button` component.
 * @returns {JSX.Element} The rendered `Button` component.
 * @example
 * <Button
 *   tx="common:ok"
 *   style={styles.button}
 *   textStyle={styles.buttonText}
 *   onPress={handleButtonPress}
 * />
 */
export function Button(props: ButtonProps) {
  const {
    tx,
    text,
    txOptions,
    className,
    pressedClassName,
    disabledClassName,
    textClassName,
    pressedTextClassName,
    disabledTextClassName,
    children,
    RightAccessory,
    LeftAccessory,
    disabled,
    preset = "default",
    ...rest
  } = props

  const { themeContext } = useAppTheme()
  const isDark = themeContext === "dark"
  const presetStyles = BUTTON_PRESETS[preset]

  const getButtonClasses = (state: PressableStateCallbackType) => {
    return nwMerge(
      BUTTON_BASE,
      isDark ? presetStyles.base.dark : presetStyles.base.light,
      state.pressed && (isDark ? presetStyles.pressed.dark : presetStyles.pressed.light),
      state.pressed && pressedClassName,
      disabled && "opacity-50",
      disabled && disabledClassName,
      className,
    )
  }

  const getTextClasses = (state: PressableStateCallbackType) => {
    return nwMerge(
      BUTTON_TEXT_BASE,
      isDark ? presetStyles.text.dark : presetStyles.text.light,
      state.pressed && "opacity-90",
      state.pressed && pressedTextClassName,
      disabled && disabledTextClassName,
      textClassName,
    )
  }

  const renderContent = (state: PressableStateCallbackType) => {
    const buttonClasses = getButtonClasses(state)
    const textClasses = getTextClasses(state)

    return (
      <StyledView className={buttonClasses}>
        {!!LeftAccessory && (
          <LeftAccessory
            className={LEFT_ACCESSORY_CLASSES}
            pressableState={state}
            disabled={disabled}
          />
        )}

        <StyledText tx={tx} text={text} txOptions={txOptions} className={textClasses}>
          {children}
        </StyledText>

        {!!RightAccessory && (
          <RightAccessory
            className={RIGHT_ACCESSORY_CLASSES}
            pressableState={state}
            disabled={disabled}
          />
        )}
      </StyledView>
    )
  }

  return (
    <StyledPressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      {...rest}
    >
      {renderContent}
    </StyledPressable>
  )
}
