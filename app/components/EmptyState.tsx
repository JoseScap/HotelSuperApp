import { Image, ImageProps, View } from "react-native"
import { Button, ButtonProps } from "./Button"
import { Text, TextProps } from "./Text"
import { translate } from "@/i18n/translate"
import { styled } from "nativewind"
import { nwMerge } from "@/utils/nwMerge"

const sadFace = require("../../assets/images/sad-face.png")

const StyledView = styled(View)
const StyledImage = styled(Image)

interface EmptyStateProps {
  /**
   * An optional prop that specifies the text/image set to use for the empty state.
   */
  preset?: "generic"
  /**
   * Style override for the container.
   */
  className?: string
  /**
   * An Image source to be displayed above the heading.
   */
  imageSource?: ImageProps["source"]
  /**
   * Style overrides for image.
   */
  imageClassName?: string
  /**
   * Pass any additional props directly to the Image component.
   */
  ImageProps?: Omit<ImageProps, "source">
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
   * The button text to display if not using `buttonTx`.
   */
  button?: TextProps["text"]
  /**
   * Button text which is looked up via i18n.
   */
  buttonTx?: TextProps["tx"]
  /**
   * Optional button options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  buttonTxOptions?: TextProps["txOptions"]
  /**
   * Style overrides for button.
   */
  buttonClassName?: string
  /**
   * Called when the button is pressed.
   */
  buttonOnPress?: ButtonProps["onPress"]
  /**
   * Pass any additional props directly to the Button component.
   */
  ButtonProps?: ButtonProps
}

interface EmptyStatePresetItem {
  imageSource: ImageProps["source"]
  heading: TextProps["text"]
  content: TextProps["text"]
  button: TextProps["text"]
}

const EmptyStatePresets = {
  generic: {
    imageSource: sadFace,
    heading: translate("emptyStateComponent:generic.heading"),
    content: translate("emptyStateComponent:generic.content"),
    button: translate("emptyStateComponent:generic.button"),
  } as EmptyStatePresetItem,
} as const

/**
 * A component to use when there is no data to display. It can be utilized to direct the user what to do next.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/EmptyState/}
 * @param {EmptyStateProps} props - The props for the `EmptyState` component.
 * @returns {JSX.Element} The rendered `EmptyState` component.
 */
export function EmptyState(props: EmptyStateProps) {
  const preset = EmptyStatePresets[props.preset ?? "generic"]

  const {
    button = preset.button,
    buttonTx,
    buttonOnPress,
    buttonTxOptions,
    content = preset.content,
    contentTx,
    contentTxOptions,
    heading = preset.heading,
    headingTx,
    headingTxOptions,
    imageSource = preset.imageSource,
    className,
    buttonClassName,
    contentClassName,
    headingClassName,
    imageClassName,
    ButtonProps,
    ContentTextProps,
    HeadingTextProps,
    ImageProps,
  } = props

  const isImagePresent = !!imageSource
  const isHeadingPresent = !!(heading || headingTx)
  const isContentPresent = !!(content || contentTx)
  const isButtonPresent = !!(button || buttonTx)

  const containerClasses = nwMerge("items-center justify-center", className)

  const imageClasses = nwMerge(
    "self-center",
    (isHeadingPresent || isContentPresent || isButtonPresent) && "mb-1",
    imageClassName,
  )

  const headingClasses = nwMerge(
    "text-center px-4 text-text-primary",
    isImagePresent && "mt-1",
    (isContentPresent || isButtonPresent) && "mb-1",
    headingClassName,
  )

  const contentClasses = nwMerge(
    "text-center px-4 text-text-secondary",
    (isImagePresent || isHeadingPresent) && "mt-1",
    isButtonPresent && "mb-1",
    contentClassName,
  )

  const buttonClasses = nwMerge(
    (isImagePresent || isHeadingPresent || isContentPresent) && "mt-8",
    buttonClassName,
  )

  return (
    <StyledView className={containerClasses}>
      {isImagePresent && (
        <StyledImage source={imageSource} {...ImageProps} className={imageClasses} />
      )}

      {isHeadingPresent && (
        <Text
          preset="subheading"
          text={heading}
          tx={headingTx}
          txOptions={headingTxOptions}
          {...HeadingTextProps}
          className={headingClasses}
        />
      )}

      {isContentPresent && (
        <Text
          text={content}
          tx={contentTx}
          txOptions={contentTxOptions}
          {...ContentTextProps}
          className={contentClasses}
        />
      )}

      {isButtonPresent && (
        <Button
          onPress={buttonOnPress}
          text={button}
          tx={buttonTx}
          txOptions={buttonTxOptions}
          {...ButtonProps}
          className={buttonClasses}
        />
      )}
    </StyledView>
  )
}
