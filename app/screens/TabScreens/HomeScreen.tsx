import { FC } from "react"
import { Image, View } from "react-native"
import { Screen } from "@/components/Screen"
import { useHeader } from "@/utils/useHeader"
import { useBottomProps } from "@/hooks/useBottomProps"
import { BottomHomeTabScreenProps } from "@/navigators/BottomNavigator"
import { styled } from "nativewind"

const StyledView = styled(View)
const StyledImage = styled(Image)

const logo = require("../../../assets/images/logo.png")

export const HomeScreen: FC<BottomHomeTabScreenProps<"Home">> = function HomeScreen(_props) {
  const bottomProps = useBottomProps()

  useHeader({
    leftTx: "homeScreen:title",
  })

  return (
    <Screen preset="scroll" contentClassName="px-4 py-6" {...bottomProps}>
      <StyledView className="h-14 self-start justify-center">
        <StyledImage source={logo} className="h-[42px] w-[77px]" resizeMode="contain" />
      </StyledView>
    </Screen>
  )
}
