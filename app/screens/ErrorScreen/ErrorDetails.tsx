import { ErrorInfo } from "react"
import { ScrollView, View } from "react-native"
import { Button, Icon, Screen, Text } from "../../components"
import { styled } from "nativewind"

const StyledView = styled(View)
const StyledScrollView = styled(ScrollView)

export interface ErrorDetailsProps {
  error: Error
  errorInfo: ErrorInfo | null
  onReset(): void
}

/**
 * Renders the error details screen.
 * @param {ErrorDetailsProps} props - The props for the `ErrorDetails` component.
 * @returns {JSX.Element} The rendered `ErrorDetails` component.
 */
export function ErrorDetails(props: ErrorDetailsProps) {
  return (
    <Screen preset="fixed" safeAreaEdges={["top", "bottom"]}>
      <StyledView className="flex-1 items-center">
        <Icon icon="BsBug" size={64} />
        <Text preset="subheading" tx="errorScreen:title" />
        <Text tx="errorScreen:friendlySubtitle" />
      </StyledView>

      <StyledScrollView>
        <Text weight="bold" text={`${props.error}`.trim()} />
        <Text selectable text={`${props.errorInfo?.componentStack ?? ""}`.trim()} />
      </StyledScrollView>

      <Button preset="reversed" onPress={props.onReset} tx="errorScreen:reset" />
    </Screen>
  )
}
