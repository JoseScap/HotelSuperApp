import { TOptions } from "i18next"
import { Text as RNText, TextProps as RNTextProps } from "react-native"
import { isRTL, translate, TxKeyPath } from "@/i18n"
import { ReactNode } from "react"
import { styled } from "nativewind"
import { nwMerge } from "@/utils/nwMerge"

const StyledText = styled(RNText)

type Sizes = "xxl" | "xl" | "lg" | "md" | "sm" | "xs" | "xxs"
type Weights = "light" | "normal" | "medium" | "semibold" | "bold"

const SIZES: Record<Sizes, string> = {
  xxl: "text-4xl",
  xl: "text-3xl",
  lg: "text-2xl",
  md: "text-base",
  sm: "text-sm",
  xs: "text-xs",
  xxs: "text-[10px]",
}

const WEIGHTS: Record<Weights, string> = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
}

const PRESETS = {
  default: "",
  bold: WEIGHTS.bold,
  heading: `${SIZES.xxl} ${WEIGHTS.bold}`,
  subheading: `${SIZES.lg} ${WEIGHTS.medium}`,
  formLabel: `${SIZES.sm} ${WEIGHTS.medium}`,
  formHelper: SIZES.sm,
}

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
   * Children components.
   */
  children?: ReactNode
  /**
   * The size of the text.
   */
  size?: Sizes
  /**
   * The weight of the text.
   */
  weight?: Weights
  /**
   * One of the different types of text presets.
   */
  preset?: keyof typeof PRESETS
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
    weight,
    size,
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

  const classes = nwMerge(
    "text-text-primary",
    PRESETS[preset],
    weight && WEIGHTS[weight],
    size && SIZES[size],
    isRTL && "text-right",
    className,
  )

  return (
    <StyledText {...rest} className={classes}>
      {content}
    </StyledText>
  )
}
