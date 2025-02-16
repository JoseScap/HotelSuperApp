import { ComponentType, ReactNode } from "react"
import { Pressable, PressableProps, PressableStateCallbackType } from "react-native"
import { Text, TextProps } from "./Text"
import { nwMerge } from "@/utils/nativeWindMerge"

type Presets = "default" | "filled" | "reversed"

const BUTTON_CLASSES = {
  base: "min-h-[56px] rounded flex-row justify-center items-center py-2 px-4",
  text: {
    base: "text-base font-medium text-center flex-shrink flex-grow-0 z-[2]",
    default: "text-text",
    filled: "text-text",
    reversed: "text-palette-neutral100",
  },
  accessory: {
    left: "mr-2 z-[1]",
    right: "ml-2 z-[1]",
  },
  preset: {
    default: "border border-palette-neutral400 bg-palette-neutral100 active:bg-palette-neutral200",
    filled: "bg-palette-neutral300 active:bg-palette-neutral400",
    reversed: "bg-palette-neutral800 active:bg-palette-neutral700",
  },
} as const

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
   * One of the different types of button presets.
   */
  preset?: Presets
  /**
   * An optional component to render on the right side of the text.
   */
  RightAccessory?: ComponentType<ButtonAccessoryProps>
  /**
   * An optional component to render on the left side of the text.
   */
  LeftAccessory?: ComponentType<ButtonAccessoryProps>
  /**
   * Children components.
   */
  children?: ReactNode
  /**
   * disabled prop
   */
  disabled?: boolean
  /**
   * NativeWind class names
   */
  className?: string
}

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
    children,
    RightAccessory,
    LeftAccessory,
    disabled,
    className,
    preset = "default",
    ...rest
  } = props

  return (
    <Pressable
      className={nwMerge(
        BUTTON_CLASSES.base,
        BUTTON_CLASSES.preset[preset],
        { "opacity-50": Boolean(disabled) },
        className,
      )}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      {...rest}
      disabled={disabled}
    >
      {({ pressed }) => (
        <>
          {!!LeftAccessory && (
            <LeftAccessory
              className={BUTTON_CLASSES.accessory.left}
              pressableState={{ pressed }}
              disabled={disabled}
            />
          )}

          <Text
            tx={tx}
            text={text}
            txOptions={txOptions}
            className={nwMerge(BUTTON_CLASSES.text.base, BUTTON_CLASSES.text[preset], {
              "opacity-90": pressed,
              "opacity-50": Boolean(disabled),
            })}
          >
            {children}
          </Text>

          {!!RightAccessory && (
            <RightAccessory
              className={BUTTON_CLASSES.accessory.right}
              pressableState={{ pressed }}
              disabled={disabled}
            />
          )}
        </>
      )}
    </Pressable>
  )
}
