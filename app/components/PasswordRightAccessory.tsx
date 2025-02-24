import { ComponentType, useMemo } from "react"
import { TextFieldAccessoryProps } from "./TextField"
import { Icon } from "./Icon"
import { useAppColors } from "@/hooks/useAppColors"

interface Props {
  isPasswordHidden: boolean
  onTogglePassword: () => void
}

export function PasswordRightAccessory({
  isPasswordHidden,
  onTogglePassword,
}: Props): ComponentType<TextFieldAccessoryProps> {
  const { text } = useAppColors()

  return useMemo(
    () =>
      function PasswordRightAccessoryComponent() {
        return (
          <Icon
            icon={isPasswordHidden ? "BsEye" : "BsEyeSlash"}
            color={text.primary}
            size="md"
            onPress={onTogglePassword}
          />
        )
      },
    [isPasswordHidden, text.primary],
  )
}
