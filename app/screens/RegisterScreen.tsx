import { observer } from "mobx-react-lite"
import { FC } from "react"
import { StatusBar } from "react-native"
import { AppStackScreenProps } from "../navigators"
import { useRegisterScreen } from "@/hooks/useRegisterScreen"
import { Icon } from "../components"
import { NavigatorScreenParams } from "@react-navigation/native"
import { BottomHomeParamList } from "@/navigators/BottomNavigator"
import {
  StyledView,
  StyledText,
  StyledTextInput,
  StyledTouchableOpacity,
  StyledSafeAreaView,
  StyledScrollView,
} from "@/components/StyledComponents"
import { colors } from "@/constants/colors"

interface RegisterScreenProps extends AppStackScreenProps<"Register"> {}

export const RegisterScreen: FC<RegisterScreenProps> = observer(function RegisterScreen(props) {
  const { navigation } = props
  const {
    // Values
    email,
    password,
    confirmPassword,
    isPasswordHidden,
    isConfirmPasswordHidden,
    isSubmitted,

    // Validations
    emailValidation,
    passwordValidation,
    confirmPasswordValidation,
    signUpError,

    // Actions
    setEmail,
    setPassword,
    setConfirmPassword,
    togglePassword,
    toggleConfirmPassword,
    register,
  } = useRegisterScreen(props)

  const handleSkip = () => {
    navigation.replace("BottomNavigator", {
      screen: "Home",
    } as NavigatorScreenParams<BottomHomeParamList>)
  }

  return (
    <StyledSafeAreaView className="flex-1 bg-white">
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />

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
        className="flex-1 p-4 "
        contentContainerClassName="p-[20px] pb-10"
        showsVerticalScrollIndicator={false}
      >
        <StyledText className="text-2xl font-bold text-[#333] mb-2">Crear cuenta</StyledText>
        <StyledText className="text-base text-[#666] mb-6">
          Con tu email y una contraseña segura podrás iniciar sesión.
        </StyledText>

        {/* Form */}
        <StyledView className="mb-6">
          <StyledText className="text-sm font-medium text-[#333] mb-2">
            Nombre y apellido
          </StyledText>
          <StyledTextInput
            className="border border-[#ddd] rounded-lg p-3 mb-4 text-base"
            placeholder="Nombre completo"
          />

          <StyledText className="text-sm font-medium text-[#333] mb-2">Email</StyledText>
          <StyledTextInput
            value={email ?? ""}
            onChangeText={setEmail}
            className="border border-[#ddd] rounded-lg p-3 mb-4 text-base"
            placeholder="usuario200@gmail.com"
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
              secureTextEntry={isPasswordHidden}
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect={false}
            />
            <StyledTouchableOpacity onPress={togglePassword} className="absolute right-3 top-3">
              <Icon
                icon={isPasswordHidden ? "eye-off" : "eye"}
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

          <StyledText className="text-sm font-medium text-[#333] mb-2">
            Confirmar Contraseña
          </StyledText>
          <StyledView className="relative mb-4">
            <StyledTextInput
              value={confirmPassword ?? ""}
              onChangeText={setConfirmPassword}
              className="border border-[#ddd] rounded-lg p-3 pr-10 text-base"
              placeholder="********"
              secureTextEntry={isConfirmPasswordHidden}
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect={false}
            />
            <StyledTouchableOpacity
              onPress={toggleConfirmPassword}
              className="absolute right-3 top-3"
            >
              <Icon
                icon={isConfirmPasswordHidden ? "eye-off" : "eye"}
                iconSet="MaterialCommunityIcons"
                isVectorIcon
                size={20}
                color="#9E9E9E"
              />
            </StyledTouchableOpacity>
          </StyledView>
          {isSubmitted && confirmPasswordValidation && (
            <StyledText className="text-[#FF3B30] text-xs -mt-3 mb-4">
              {confirmPasswordValidation}
            </StyledText>
          )}
        </StyledView>

        <StyledText className="text-xs text-[#666] mb-4">
          Al registrarte con nosotros, aceptas nuestros términos y condiciones.
        </StyledText>

        {/* Create Account Button */}
        <StyledTouchableOpacity
          className="bg-primary rounded-lg p-3.5 items-center mb-3"
          onPress={register}
        >
          <StyledText className="text-white text-base font-semibold">Crear Cuenta</StyledText>
        </StyledTouchableOpacity>

        {/* Skip Button */}
        <StyledTouchableOpacity className="rounded-lg p-3.5 items-center mb-4" onPress={handleSkip}>
          <StyledText className="text-primary text-base font-medium">Hacer más tarde</StyledText>
        </StyledTouchableOpacity>

        {signUpError && (
          <StyledText className="text-[#FF3B30] text-sm text-center mb-4">{signUpError}</StyledText>
        )}

        {/* Separator */}
        <StyledView className="flex-row items-center my-5">
          <StyledView className="flex-1 h-px bg-[#E5E5E5]" />
          <StyledText className="mx-2.5 text-[#666] text-xs">o inicia con tu cuenta de</StyledText>
          <StyledView className="flex-1 h-px bg-[#E5E5E5]" />
        </StyledView>

        {/* Social Login */}
        <StyledView className="mb-5">
          <StyledTouchableOpacity className="flex-row items-center justify-center border border-[#E5E5E5] rounded-lg p-3 mb-3">
            <StyledView className="mr-3">
              <Icon icon="logo-google" iconSet="Ionicons" isVectorIcon size={20} color="#DB4437" />
            </StyledView>
            <StyledText className="text-sm text-[#333]">Registrarse con Google</StyledText>
          </StyledTouchableOpacity>

          <StyledTouchableOpacity className="flex-row items-center justify-center border border-[#E5E5E5] rounded-lg p-3">
            <StyledView className="mr-3">
              <Icon icon="logo-apple" iconSet="Ionicons" isVectorIcon size={20} color="#000000" />
            </StyledView>
            <StyledText className="text-sm text-[#333]">Registrarse con Apple</StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledScrollView>
    </StyledSafeAreaView>
  )
})
