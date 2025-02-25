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
    <Screen
      preset="fixed"
      safeAreaEdges={["top", "bottom"]}
      contentClassName="items-center px-8 pt-10 flex-1"
    >
      <StyledView className="flex-1 items-center">
        <Icon icon="ladybug" size={64} />
        <Text className="text-red-500 mb-4" preset="subheading" tx="errorScreen:title" />
        <Text tx="errorScreen:friendlySubtitle" />
      </StyledView>

      <StyledScrollView className="flex-2 p-4 bg-neutral-200 my-4 rounded-lg">
        <Text className="text-red-500 font-bold" text={`${props.error}`.trim()} />
        <Text
          selectable
          className="mt-4 text-neutral-600"
          text={`${props.errorInfo?.componentStack ?? ""}`.trim()}
        />
      </StyledScrollView>

      <Button
        preset="reversed"
        className="bg-red-500 px-12"
        onPress={props.onReset}
        tx="errorScreen:reset"
      />
    </Screen>
  )
}
