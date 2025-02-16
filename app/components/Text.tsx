import { TOptions } from "i18next"
import { StyleProp, Text as RNText, TextProps as RNTextProps, TextStyle } from "react-native"
import { isRTL, translate, TxKeyPath } from "@/i18n"
import { typography } from "@/theme/typography"
import { ReactNode } from "react"
import { nwMerge } from "@/utils/nativeWindMerge"

type Sizes = keyof typeof $sizeStyles
type Weights = keyof typeof typography.primary
type Presets = "default" | "bold" | "heading" | "subheading" | "formLabel" | "formHelper"

export interface TextProps extends RNTextProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TxKeyPath
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: TOptions
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>
  /**
   * One of the different types of text presets.
   */
  preset?: Presets
  /**
   * Text weight modifier.
   */
  weight?: Weights
  /**
   * Text size modifier.
   */
  size?: Sizes
  /**
   * Children components.
   */
  children?: ReactNode
  /**
   * NativeWind class names
   */
  className?: string
}

/**
 * For your text displaying needs.
 * This component is a HOC over the built-in React Native one.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Text/}
 * @param {TextProps} props - The props for the `Text` component.
 * @returns {JSX.Element} The rendered `Text` component.
 */
export function Text(props: TextProps) {
  const {
    weight = "normal",
    size = "sm",
    tx,
    txOptions,
    text,
    children,
    className,
    preset = "default",
    ...rest
  } = props

  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  const TEXT_CLASSES = {
    size: {
      xxl: "text-[36px] leading-[44px]",
      xl: "text-[24px] leading-[34px]",
      lg: "text-[20px] leading-[32px]",
      md: "text-[18px] leading-[26px]",
      sm: "text-[16px] leading-[24px]",
      xs: "text-[14px] leading-[21px]",
      xxs: "text-[12px] leading-[18px]",
    },
    weight: {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semiBold: "font-semibold",
      bold: "font-bold",
    },
    preset: {
      default: "text-base font-normal text-text",
      bold: "text-base font-bold text-text",
      heading: "text-[36px] leading-[44px] font-bold text-text",
      subheading: "text-[20px] leading-[32px] font-medium text-text",
      formLabel: "text-base font-medium text-text",
      formHelper: "text-base font-normal text-text",
    },
  } as const

  return (
    <RNText
      {...rest}
      className={nwMerge(
        TEXT_CLASSES.preset[preset],
        TEXT_CLASSES.size[size],
        TEXT_CLASSES.weight[weight],
        {
          "text-right": Boolean(isRTL),
        },
        className,
      )}
    >
      {content}
    </RNText>
  )
}
