import { observer } from "mobx-react-lite"
import { FC } from "react"
import { StatusBar } from "react-native"
import { AppStackScreenProps } from "../navigators"
import {
  StyledView,
  StyledText,
  StyledTouchableOpacity,
  StyledSafeAreaView,
} from "@/components/StyledComponents"

interface LandingScreenProps extends AppStackScreenProps<"Landing"> {}

export const LandingScreen: FC<LandingScreenProps> = observer(function LandingScreen(_props) {
  const { navigation } = _props

  return (
    <StyledSafeAreaView className="flex-1 bg-white">
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <StyledView className="flex-1 justify-between px-5 pt-[60px] pb-10">
        {/* Blue Circle */}
        <StyledView className="flex-1 items-center justify-center">
          <StyledView className="w-[100px] h-[100px] rounded-full bg-primary" />
        </StyledView>

        {/* Welcome Text */}
        <StyledView className="items-center mb-10">
          <StyledText className="text-[28px] font-bold text-[#333] mb-2.5 text-center">
            Bienvenido
          </StyledText>
          <StyledText className="text-base text-[#666] text-center px-5">
            Inicia sesión o crea una cuenta con pocos pasos
          </StyledText>
        </StyledView>

        {/* Buttons */}
        <StyledView className="gap-2.5">
          <StyledTouchableOpacity
            className="bg-primary rounded-lg p-4 items-center"
            onPress={() => navigation.navigate("Login")}
          >
            <StyledText className="text-white text-base font-semibold">Iniciar Sesión</StyledText>
          </StyledTouchableOpacity>

          <StyledTouchableOpacity
            className="p-4 items-center"
            onPress={() => navigation.navigate("Register")}
          >
            <StyledText className="text-primary text-base font-semibold">Registrarse</StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>
    </StyledSafeAreaView>
  )
})
