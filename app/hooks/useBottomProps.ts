import { Platform } from "react-native"

interface BottomProps {
  KeyboardAvoidingViewProps?: {
    behavior: undefined
  }
}

export function useBottomProps(): BottomProps {
  const isAndroid = Platform.OS === "android"

  return isAndroid ? { KeyboardAvoidingViewProps: { behavior: undefined } } : {}
}
