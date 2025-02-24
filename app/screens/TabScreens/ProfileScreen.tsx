import { View } from "react-native"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { styled } from "nativewind"
import { Icon } from "@/components/Icon"
import { Button } from "@/components/Button"
import { useStores } from "@/models"
import { observer } from "mobx-react-lite"
import { useHotelConfig } from "@/hooks/useHotelConfig"
import { Switch } from "react-native"
import { TxKeyPath } from "@/i18n"

const StyledView = styled(View)

export const ProfileScreen = observer(function ProfileScreen() {
  const {
    authenticationStore: {
      isAuthenticated,
      hasReservation,
      hasCheckedIn,
      toggleHasReservation,
      toggleHasCheckedIn,
      logout,
    },
  } = useStores()
  const { name: hotelName } = useHotelConfig()

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} className="bg-background-primary">
      {/* Header */}
      <StyledView className="bg-primary px-4 py-6">
        <Text preset="heading" className="text-2xl text-white mb-2">
          {hotelName}
        </Text>
        <Text preset="formHelper" className="text-white/90">
          Mi Perfil
        </Text>
      </StyledView>

      <StyledView className="p-4">
        {/* Sección de Datos Personales */}
        <StyledView className="mb-8">
          <Text preset="subheading" tx="profileScreen:sectionPersonalDataTitle" className="mb-4" />

          {/* Avatar y Nombre */}
          <StyledView className="flex-row items-center mb-6">
            <StyledView className="w-16 h-16 rounded-full bg-primary/10 items-center justify-center mr-4">
              <Icon icon="BsMenuApp" size={32} color="#0EA5E9" />
            </StyledView>
            <StyledView>
              <Text preset="formLabel" className="text-text-primary text-lg mb-1">
                {isAuthenticated ? "Usuario verificado" : "Sin verificar"}
              </Text>
              <Text preset="formHelper" className="text-text-secondary">
                {isAuthenticated ? "Cuenta activa" : "Por favor, inicia sesión"}
              </Text>
            </StyledView>
          </StyledView>

          {/* Estado de la cuenta */}
          <StyledView className="bg-background-secondary rounded-lg p-4 mb-4">
            <Text preset="formLabel" className="text-text-primary mb-2">
              Estado de la cuenta
            </Text>
            <Text preset="formHelper" className="text-text-secondary">
              {isAuthenticated
                ? "Tu cuenta está activa y verificada"
                : "Por favor, inicia sesión para acceder a todas las funciones"}
            </Text>
          </StyledView>
        </StyledView>

        {/* Sección de Estado (Solo visible cuando está autenticado) */}
        {isAuthenticated && (
          <StyledView className="mb-8">
            <Text preset="subheading" className="mb-4 text-text-primary">
              Estado de Reserva
            </Text>

            {/* Toggle de Reserva */}
            <StyledView className="bg-background-secondary rounded-lg p-4 mb-4">
              <StyledView className="flex-row items-center justify-between">
                <StyledView>
                  <Text preset="formLabel" className="text-text-primary mb-1">
                    Tiene Reserva
                  </Text>
                  <Text preset="formHelper" className="text-text-secondary">
                    {hasReservation ? "Reserva activa" : "Sin reserva"}
                  </Text>
                </StyledView>
                <Switch value={hasReservation} onValueChange={toggleHasReservation} />
              </StyledView>
            </StyledView>

            {/* Toggle de Check-in (Solo visible si tiene reserva) */}
            {hasReservation && (
              <StyledView className="bg-background-secondary rounded-lg p-4">
                <StyledView className="flex-row items-center justify-between">
                  <StyledView>
                    <Text preset="formLabel" className="text-text-primary mb-1">
                      Check-in Realizado
                    </Text>
                    <Text preset="formHelper" className="text-text-secondary">
                      {hasCheckedIn ? "Check-in completado" : "Pendiente de check-in"}
                    </Text>
                  </StyledView>
                  <Switch value={hasCheckedIn} onValueChange={toggleHasCheckedIn} />
                </StyledView>
              </StyledView>
            )}
          </StyledView>
        )}

        {/* Sección de Acciones */}
        <StyledView className="mb-8">
          <Text
            preset="subheading"
            tx={"profileScreen:sectionActionsTitle" as TxKeyPath}
            className="mb-4"
          />

          <Button
            tx="common:logOut"
            preset="default"
            className="border-primary"
            textClassName="text-primary"
            onPress={logout}
            LeftAccessory={() => (
              <Icon icon="BsCaretLeft" size={20} color="#0EA5E9" className="mr-2" />
            )}
          />
        </StyledView>
      </StyledView>
    </Screen>
  )
})
