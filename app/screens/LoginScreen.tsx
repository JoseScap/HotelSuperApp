import { observer } from "mobx-react-lite"
import { FC } from "react"
import { StatusBar } from "react-native"
import { AppStackScreenProps } from "../navigators"
import { useLoginScreen } from "@/hooks/useLoginScreen"
import { NavigatorScreenParams } from "@react-navigation/native"
import { BottomHomeParamList } from "@/navigators/BottomNavigator"
import { Icon } from "../components"
import {
  StyledView,
  StyledText,
  StyledTextInput,
  StyledTouchableOpacity,
  StyledSafeAreaView,
  StyledScrollView,
} from "@/components/StyledComponents"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const { navigation } = _props
  const {
    // Values
    email,
    password,
    isAuthPasswordHidden,
    isSubmitted,

    // Validations
    emailValidation,
    passwordValidation,
    loginError,

    // Actions
    setPassword,
    setEmail,
    togglePassword,
    login,
  } = useLoginScreen()

  const handleLogin = async () => {
    if (!email || !password) return

    const success = await login()
    if (success) {
      // Navigate to main app or handle successful login
      navigation.replace("BottomNavigator", {
        screen: "Home",
      } as NavigatorScreenParams<BottomHomeParamList>)
    }
  }

  const handleSkip = () => {
    navigation.replace("BottomNavigator", {
      screen: "Home",
    } as NavigatorScreenParams<BottomHomeParamList>)
  }

  return (
    <StyledSafeAreaView className="flex-1 bg-white">
      <StatusBar backgroundColor="#304FFE" barStyle="light-content" />

      {/* Header */}
      <StyledView className="bg-primary p-4 pb-5">
        <StyledTouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          className="flex-row items-center py-1.5"
        >
          <Icon icon="caretLeft" size={24} color="white" />
          <StyledText className="text-white text-lg font-semibold ml-2.5">Volver atrás</StyledText>
        </StyledTouchableOpacity>
      </StyledView>

      {/* Content */}
      <StyledScrollView
        className="flex-1"
        contentContainerClassName="p-[20px] pb-10"
        showsVerticalScrollIndicator={false}
      >
        <StyledText className="text-2xl font-bold text-[#333] mb-2">Log In</StyledText>
        <StyledText className="text-base text-[#666] mb-6">
          Para entrar a tu cuenta complete con los siguientes datos.
        </StyledText>

        {/* Form */}
        <StyledView className="mb-6">
          <StyledText className="text-sm font-medium text-[#333] mb-2">Email</StyledText>
          <StyledTextInput
            value={email ?? ""}
            onChangeText={setEmail}
            className="border border-[#ddd] rounded-lg p-3 mb-4 text-base"
            placeholder="usuario@example.com"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            keyboardType="email-address"
          />
          {isSubmitted && emailValidation && (
            <StyledText className="text-[#FF3B30] text-xs -mt-3 mb-4">{emailValidation}</StyledText>
          )}

          <StyledText className="text-sm font-medium text-[#333] mb-2">Contraseña</StyledText>
          <StyledView className="relative mb-4">
            <StyledTextInput
              value={password ?? ""}
              onChangeText={setPassword}
              className="border border-[#ddd] rounded-lg p-3 pr-10 text-base"
              placeholder="********"
              secureTextEntry={isAuthPasswordHidden}
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect={false}
            />
            <StyledTouchableOpacity onPress={togglePassword} className="absolute right-3 top-3">
              <Icon
                icon={isAuthPasswordHidden ? "eye-off" : "eye"}
                iconSet="MaterialCommunityIcons"
                isVectorIcon
                size={20}
                color="#9E9E9E"
              />
            </StyledTouchableOpacity>
          </StyledView>
          {isSubmitted && passwordValidation && (
            <StyledText className="text-[#FF3B30] text-xs -mt-3 mb-4">
              {passwordValidation}
            </StyledText>
          )}
        </StyledView>

        {/* Login Button */}
        <StyledTouchableOpacity
          className="bg-primary rounded-lg p-3.5 items-center mb-3"
          onPress={handleLogin}
        >
          <StyledText className="text-white text-base font-semibold">Log In</StyledText>
        </StyledTouchableOpacity>

        {/* Skip Button */}
        <StyledTouchableOpacity className="rounded-lg p-3.5 items-center mb-4" onPress={handleSkip}>
          <StyledText className="text-primary text-base font-medium">Hacer más tarde</StyledText>
        </StyledTouchableOpacity>

        {loginError && (
          <StyledText className="text-[#FF3B30] text-sm text-center mb-4">{loginError}</StyledText>
        )}

        {/* Separator */}
        <StyledView className="flex-row items-center my-5">
          <StyledView className="flex-1 h-px bg-[#E5E5E5]" />
          <StyledText className="mx-2.5 text-[#666] text-xs">Iniciar con</StyledText>
          <StyledView className="flex-1 h-px bg-[#E5E5E5]" />
        </StyledView>

        {/* Social Login */}
        <StyledView className="mb-5">
          <StyledTouchableOpacity className="flex-row items-center justify-center border border-[#E5E5E5] rounded-lg p-3 mb-3">
            <StyledView className="mr-3">
              <Icon icon="logo-google" iconSet="Ionicons" isVectorIcon size={20} color="#DB4437" />
            </StyledView>
            <StyledText className="text-sm text-[#333]">Log in con Google</StyledText>
          </StyledTouchableOpacity>

          <StyledTouchableOpacity className="flex-row items-center justify-center border border-[#E5E5E5] rounded-lg p-3">
            <StyledView className="mr-3">
              <Icon icon="logo-apple" iconSet="Ionicons" isVectorIcon size={20} color="#000000" />
            </StyledView>
            <StyledText className="text-sm text-[#333]">Log in con Apple</StyledText>
          </StyledTouchableOpacity>
        </StyledView>

        <StyledText className="text-center text-xs text-[#666]">
          Ingresar con tu cuenta actual para guardar los cambios
        </StyledText>
      </StyledScrollView>
    </StyledSafeAreaView>
  )
})
