import { ComponentType, useMemo } from "react"
import { TextFieldAccessoryProps } from "./TextField"
import { Icon } from "./Icon"

interface Props {
  isPasswordHidden: boolean
  onTogglePassword: () => void
}

export function PasswordRightAccessory({
  isPasswordHidden,
  onTogglePassword,
}: Props): ComponentType<TextFieldAccessoryProps> {
  return useMemo(
    () =>
      function PasswordRightAccessoryComponent() {
        return (
          <Icon
            icon={isPasswordHidden ? "view" : "hidden"}
            containerClassName={props.className}
            className="tint-neutral-800"
            size={20}
            onPress={onTogglePassword}
          />
        )
      },
    [isPasswordHidden],
  )
}
