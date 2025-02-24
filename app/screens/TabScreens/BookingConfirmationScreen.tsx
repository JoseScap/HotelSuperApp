import { View } from "react-native"
import { styled } from "nativewind"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { Button } from "@/components/Button"
import { Icon } from "@/components/Icon"
import { useAppColors } from "@/hooks/useAppColors"
import { useNavigation, useRoute } from "@react-navigation/native"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { BookingStackParamList } from "@/navigators/types"

const StyledView = styled(View)

type Props = NativeStackScreenProps<BookingStackParamList, "BookingConfirmation">

export function BookingConfirmationScreen() {
  const colors = useAppColors()
  const navigation = useNavigation()
  const route = useRoute<Props["route"]>()
  const { bookingId } = route.params

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} className="bg-white">
      <StyledView className="flex-1 items-center justify-center px-4">
        {/* Icono de Éxito */}
        <StyledView
          className="w-20 h-20 rounded-full items-center justify-center mb-6"
          style={{ backgroundColor: colors.primary }}
        >
          <Icon icon="BsCheck" size={40} color="white" />
        </StyledView>

        {/* Mensaje de Éxito */}
        <Text preset="heading" className="text-2xl text-sky-900 text-center mb-3">
          ¡Reserva Confirmada!
        </Text>
        <Text preset="formHelper" className="text-sky-700 text-center mb-6">
          Tu reserva ha sido confirmada exitosamente. Hemos enviado los detalles a tu correo
          electrónico.
        </Text>

        {/* Número de Reserva */}
        <StyledView className="bg-sky-50 rounded-xl p-4 w-full mb-8">
          <Text preset="formHelper" className="text-sky-700 text-center mb-2">
            Número de Reserva
          </Text>
          <Text preset="heading" className="text-sky-900 text-center">
            {bookingId}
          </Text>
        </StyledView>

        {/* Botones */}
        <StyledView className="w-full space-y-4">
          <Button
            preset="filled"
            text="Ver Detalles de la Reserva"
            onPress={() => navigation.navigate("BookingDetail", { bookingId })}
          />
          <Button
            preset="default"
            text="Volver al Inicio"
            onPress={() => navigation.navigate("HomeScreen")}
          />
        </StyledView>
      </StyledView>
    </Screen>
  )
}
