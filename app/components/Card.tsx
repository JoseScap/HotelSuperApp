import { ComponentType, Fragment, ReactElement } from "react"
import { TouchableOpacity, TouchableOpacityProps, View, ViewProps } from "react-native"
import { Text, TextProps } from "./Text"
import { styled } from "nativewind"
import { nwMerge } from "@/utils/nwMerge"

const StyledView = styled(View)
const StyledTouchableOpacity = styled(TouchableOpacity)

type Presets = "default" | "reversed"

interface CardProps extends Omit<TouchableOpacityProps, "style"> {
  /**
   * One of the different types of text presets.
   */
  preset?: Presets
  /**
   * How the content should be aligned vertically. This is especially (but not exclusively) useful
   * when the card is a fixed height but the content is dynamic.
   *
   * `top` (default) - aligns all content to the top.
   * `center` - aligns all content to the center.
   * `space-between` - spreads out the content evenly.
   * `force-footer-bottom` - aligns all content to the top, but forces the footer to the bottom.
   */
  verticalAlignment?: "top" | "center" | "space-between" | "force-footer-bottom"
  /**
   * Custom component added to the left of the card body.
   */
  LeftComponent?: ReactElement
  /**
   * Custom component added to the right of the card body.
   */
  RightComponent?: ReactElement
  /**
   * The heading text to display if not using `headingTx`.
   */
  heading?: TextProps["text"]
  /**
   * Heading text which is looked up via i18n.
   */
  headingTx?: TextProps["tx"]
  /**
   * Optional heading options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  headingTxOptions?: TextProps["txOptions"]
  /**
   * Style overrides for heading text.
   */
  headingClassName?: string
  /**
   * Pass any additional props directly to the heading Text component.
   */
  HeadingTextProps?: TextProps
  /**
   * Custom heading component.
   * Overrides all other `heading*` props.
   */
  HeadingComponent?: ReactElement
  /**
   * The content text to display if not using `contentTx`.
   */
  content?: TextProps["text"]
  /**
   * Content text which is looked up via i18n.
   */
  contentTx?: TextProps["tx"]
  /**
   * Optional content options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  contentTxOptions?: TextProps["txOptions"]
  /**
   * Style overrides for content text.
   */
  contentClassName?: string
  /**
   * Pass any additional props directly to the content Text component.
   */
  ContentTextProps?: TextProps
  /**
   * Custom content component.
   * Overrides all other `content*` props.
   */
  ContentComponent?: ReactElement
  /**
   * The footer text to display if not using `footerTx`.
   */
  footer?: TextProps["text"]
  /**
   * Footer text which is looked up via i18n.
   */
  footerTx?: TextProps["tx"]
  /**
   * Optional footer options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  footerTxOptions?: TextProps["txOptions"]
  /**
   * Style overrides for footer text.
   */
  footerClassName?: string
  /**
   * Pass any additional props directly to the footer Text component.
   */
  FooterTextProps?: TextProps
  /**
   * Custom footer component.
   * Overrides all other `footer*` props.
   */
  FooterComponent?: ReactElement
  /**
   * Style override for the container
   */
  className?: string
}

const CONTAINER_PRESETS: Record<Presets, string> = {
  default: "bg-background-primary border border-secondary rounded-lg p-4",
  reversed: "bg-background-secondary border border-secondary rounded-lg p-4",
}

const HEADING_PRESETS: Record<Presets, string> = {
  default: "text-text-primary",
  reversed: "text-text-primary",
}

const CONTENT_PRESETS: Record<Presets, string> = {
  default: "text-text-secondary",
  reversed: "text-text-secondary",
}

const FOOTER_PRESETS: Record<Presets, string> = {
  default: "text-text-secondary text-xs",
  reversed: "text-text-secondary text-xs",
}

const ALIGNMENT_WRAPPER_FLEX: Record<NonNullable<CardProps["verticalAlignment"]>, string> = {
  "top": "justify-start",
  "center": "justify-center",
  "space-between": "justify-between",
  "force-footer-bottom": "justify-between",
}

/**
 * Cards are useful for displaying related information in a contained way.
 * If a ListItem displays content horizontally, a Card can be used to display content vertically.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Card/}
 * @param {CardProps} props - The props for the `Card` component.
 * @returns {JSX.Element} The rendered `Card` component.
 */
export function Card(props: CardProps) {
  const {
    content,
    contentTx,
    contentTxOptions,
    footer,
    footerTx,
    footerTxOptions,
    heading,
    headingTx,
    headingTxOptions,
    ContentComponent,
    HeadingComponent,
    FooterComponent,
    LeftComponent,
    RightComponent,
    verticalAlignment = "top",
    className,
    contentClassName,
    headingClassName,
    footerClassName,
    ContentTextProps,
    HeadingTextProps,
    FooterTextProps,
    ...WrapperProps
  } = props

  const preset: Presets = props.preset ?? "default"
  const isPressable = !!WrapperProps.onPress
  const isHeadingPresent = !!(HeadingComponent || heading || headingTx)
  const isContentPresent = !!(ContentComponent || content || contentTx)
  const isFooterPresent = !!(FooterComponent || footer || footerTx)

  const Wrapper = (isPressable ? StyledTouchableOpacity : StyledView) as ComponentType<
    { className?: string } & (TouchableOpacityProps | ViewProps)
  >
  const HeaderContentWrapper = verticalAlignment === "force-footer-bottom" ? StyledView : Fragment

  const containerClasses = nwMerge(CONTAINER_PRESETS[preset], className)

  const headingClasses = nwMerge(
    HEADING_PRESETS[preset],
    (isFooterPresent || isContentPresent) && "mb-1",
    headingClassName,
    HeadingTextProps?.className,
  )

  const contentClasses = nwMerge(
    CONTENT_PRESETS[preset],
    isHeadingPresent && "mt-1",
    isFooterPresent && "mb-1",
    contentClassName,
    ContentTextProps?.className,
  )

  const footerClasses = nwMerge(
    FOOTER_PRESETS[preset],
    (isHeadingPresent || isContentPresent) && "mt-1",
    footerClassName,
    FooterTextProps?.className,
  )

  const alignmentWrapperClasses = nwMerge(
    "flex-1",
    ALIGNMENT_WRAPPER_FLEX[verticalAlignment],
    LeftComponent && "ml-4",
    RightComponent && "mr-4",
  )

  return (
    <Wrapper
      className={containerClasses}
      activeOpacity={0.8}
      accessibilityRole={isPressable ? "button" : undefined}
      {...WrapperProps}
    >
      {LeftComponent}

      <StyledView className={alignmentWrapperClasses}>
        <HeaderContentWrapper>
          {HeadingComponent ||
            (isHeadingPresent && (
              <Text
                weight="bold"
                text={heading}
                tx={headingTx}
                txOptions={headingTxOptions}
                {...HeadingTextProps}
                className={headingClasses}
              />
            ))}

          {ContentComponent ||
            (isContentPresent && (
              <Text
                weight="normal"
                text={content}
                tx={contentTx}
                txOptions={contentTxOptions}
                {...ContentTextProps}
                className={contentClasses}
              />
            ))}
        </HeaderContentWrapper>

        {FooterComponent ||
          (isFooterPresent && (
            <Text
              weight="normal"
              size="xs"
              text={footer}
              tx={footerTx}
              txOptions={footerTxOptions}
              {...FooterTextProps}
              className={footerClasses}
            />
          ))}
      </StyledView>

      {RightComponent}
    </Wrapper>
  )
}
