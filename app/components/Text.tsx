import { TOptions } from "i18next"
import { Text as RNText, TextProps as RNTextProps } from "react-native"
import { isRTL, translate, TxKeyPath } from "@/i18n"
import { ReactNode } from "react"
import { styled } from "nativewind"
import { nwMerge } from "@/utils/nwMerge"
import { typography } from "@/theme/typography"

const StyledText = styled(RNText)

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
  className?: string
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
}

const $sizeStyles = {
  xxl: "text-[36px] leading-[44px]",
  xl: "text-[24px] leading-[34px]",
  lg: "text-[20px] leading-[32px]",
  md: "text-[18px] leading-[26px]",
  sm: "text-[16px] leading-[24px]",
  xs: "text-[14px] leading-[21px]",
  xxs: "text-[12px] leading-[18px]",
} as const

const $presets = {
  default: "text-base font-normal text-neutral-900 dark:text-neutral-100",
  bold: "text-base font-bold text-neutral-900 dark:text-neutral-100",
  heading: "text-[36px] leading-[44px] font-bold text-neutral-900 dark:text-neutral-100",
  subheading: "text-[20px] leading-[32px] font-medium text-neutral-900 dark:text-neutral-100",
  formLabel: "text-base font-medium text-neutral-900 dark:text-neutral-100",
  formHelper: "text-sm font-normal text-neutral-900 dark:text-neutral-100",
} as const

/**
 * For your text displaying needs.
 * This component is a HOC over the built-in React Native one.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Text/}
 * @param {TextProps} props - The props for the `Text` component.
 * @returns {JSX.Element} The rendered `Text` component.
 */
export function Text(props: TextProps) {
  const { size, tx, txOptions, text, children, className, preset = "default", ...rest } = props

  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  const classes = nwMerge(
    $presets[preset],
    size && $sizeStyles[size],
    isRTL && "writing-rtl",
    className,
  )

  return (
    <StyledText {...rest} className={classes}>
      {content}
    </StyledText>
  )
}
