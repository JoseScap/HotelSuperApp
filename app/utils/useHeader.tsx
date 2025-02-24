import { HeaderProps } from "@/components/Header"
import { useLayoutEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { Text } from "@/components/Text"
import { TouchableOpacity } from "react-native"
import { Icon } from "@/components/Icon"
import { styled } from "nativewind"

const StyledTouchableOpacity = styled(TouchableOpacity)

/**
 * A hook that can be used to easily set the Header of a react-navigation screen from within the screen's component.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/utility/useHeader/}
 * @param {HeaderProps} headerProps - The props for the `Header` component.
 */
export function useHeader(headerProps: HeaderProps) {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerStyle: {
        backgroundColor: "#0EA5E9",
      },
      headerTitleStyle: {
        color: "white",
      },
      headerShadowVisible: false,
      headerBackVisible: false,
      headerLeft: () => {
        if (!headerProps.leftIcon) return null
        return (
          <StyledTouchableOpacity
            className="h-12 w-12 justify-center items-center"
            onPress={headerProps.onLeftPress}
            activeOpacity={0.7}
          >
            <Icon icon={headerProps.leftIcon} size={24} color="white" />
          </StyledTouchableOpacity>
        )
      },
      headerRight: () => {
        if (!headerProps.rightTx) return null
        return (
          <StyledTouchableOpacity
            className="h-12 px-4 justify-center items-center"
            onPress={headerProps.onRightPress}
            activeOpacity={0.7}
          >
            <Text tx={headerProps.rightTx} className="text-white font-medium" />
          </StyledTouchableOpacity>
        )
      },
    })
  }, [headerProps, navigation])
}
