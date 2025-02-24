import { FC } from "react"
import { EmptyState, Screen } from "../components"
import { AppStackScreenProps } from "../navigators"

const checkIcon = require("../../assets/icons/check.png")

interface RegisterSuccessScreenProps extends AppStackScreenProps<"RegisterSuccess"> {}

export const RegisterSuccessScreen: FC<RegisterSuccessScreenProps> = function RegisterSuccessScreen(
  _props,
) {
  const { navigation } = _props

  return (
    <Screen preset="auto">
      <EmptyState
        headingTx="registerSuccessScreen:heading"
        contentTx="registerSuccessScreen:content"
        buttonTx="registerSuccessScreen:button"
        buttonOnPress={() => navigation.navigate("Login")}
        imageSource={checkIcon}
      />
    </Screen>
  )
}
