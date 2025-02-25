import { FC } from "react"
import { Image, View } from "react-native"
import { Screen } from "@/components/Screen"
import { useHeader } from "@/utils/useHeader"
import { useBottomProps } from "@/hooks/useBottomProps"
import { BottomHomeTabScreenProps } from "@/navigators/BottomNavigator"
import { styled } from "nativewind"

const StyledView = styled(View)
const StyledImage = styled(Image)

const StyledView = styled(View)
const StyledScrollView = styled(ScrollView)
const StyledTextInput = styled(TextInput)
const StyledImage = styled(Image)

export const HomeScreen: FC<BottomHomeTabScreenProps<"Home">> = function HomeScreen(_props) {
  const bottomProps = useBottomProps()

const ACTIVITY_CARD_WIDTH = 280

export function HomeScreen() {
  const { name: hotelName } = useHotelConfig()
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>()

  const handleActivityPress = (activity: Activity) => {
    navigation.navigate("ActivityDetail", { activityId: activity.id })
  }

  const handleDestinationPress = (destination: Destination) => {
    navigation.navigate("DestinationDetail", { destinationId: destination.id })
  }

  return (
    <Screen preset="scroll" contentClassName="px-4 py-6" {...bottomProps}>
      <StyledView className="h-14 self-start justify-center">
        <StyledImage source={logo} className="h-[42px] w-[77px]" resizeMode="contain" />
      </StyledView>
    </Screen>
  )
}
