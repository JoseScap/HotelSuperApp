import { ComponentType, useMemo } from "react"
import { TextFieldAccessoryProps } from "./TextField"
import { Icon } from "./Icon"
import { useAppTheme } from "@/utils/useAppTheme"

interface Props {
  isPasswordHidden: boolean
  onTogglePassword: () => void
}

export function PasswordRightAccessory({
  isPasswordHidden,
  onTogglePassword,
}: Props): ComponentType<TextFieldAccessoryProps> {
  const {
    theme: { colors },
  } = useAppTheme()

  return useMemo(
    () =>
      function PasswordRightAccessoryComponent(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={onTogglePassword}
          />
        )
      },
    [isPasswordHidden, colors.palette.neutral800],
  )
}
