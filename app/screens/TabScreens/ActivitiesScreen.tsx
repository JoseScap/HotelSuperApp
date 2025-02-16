import { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Screen } from "@/components/Screen"
import { ThemedStyle } from "@/theme"
import { useHeader } from "@/utils/useHeader"
import { Card, Text } from "@/components"
import { useAppTheme } from "@/utils/useAppTheme"
import { BottomHomeTabScreenProps } from "@/navigators/BottomNavigator"
import { useBottomProps } from "@/hooks/useBottomProps"
import { $SCREEN_CONTENT_CONTAINER } from "@/constants/common"

const logo = require("../../../assets/images/logo.png")

const hotelActivities = [
  "Spa & Wellness",
  "Gimnasio",
  "Piscina & Jacuzzi",
  "Clases de Yoga",
  "Cata de vinos",
  "Noche de cine",
  "Clases de cocina",
  "Torneos de juegos de mesa",
  "Música en vivo",
  "Actividades para niños",
]

const cityActivities = [
  "Tour por el casco histórico",
  "Visita a un museo local",
  "Excursión a la montaña",
  "Paseo en bicicleta",
  "Degustación gastronómica",
  "Paseo en barco por el río",
  "Visita a mercados locales",
  "Espectáculo de danzas tradicionales",
  "Parque de diversiones",
  "Tour de bares y pubs",
]

export const ActivitiesScreen: FC<BottomHomeTabScreenProps<"Activities">> =
  function ActivitiesScreen(_props) {
    const { themed } = useAppTheme()
    const bottomProps = useBottomProps()

    useHeader({
      leftTx: "activitiesScreen:title",
    })

    return (
      <Screen
        preset="scroll"
        contentContainerStyle={themed($SCREEN_CONTENT_CONTAINER)}
        {...bottomProps}
      >
        <Text tx="activitiesScreen:subtitle" preset="subheading" style={themed($bottomSpace)} />
        {hotelActivities.map((activity, index) => (
          <Card
            key={`hotel-${index}`}
            HeadingComponent={
              <View>
                <Text>{activity}</Text>
              </View>
            }
            ContentComponent={
              <View style={themed($logoContainer)}>
                <Image source={logo} style={$logoImage} />
              </View>
            }
            style={themed($bottomSpace)}
          />
        ))}
        <Text tx="activitiesScreen:city" preset="subheading" style={themed($bottomSpace)} />
        {cityActivities.map((activity, index) => (
          <Card
            key={`city-${index}`}
            HeadingComponent={
              <View>
                <Text>{activity}</Text>
              </View>
            }
            ContentComponent={
              <View style={themed($logoContainer)}>
                <Image source={logo} style={$logoImage} />
              </View>
            }
            style={themed($bottomSpace)}
          />
        ))}
      </Screen>
    )
  }

const $bottomSpace: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})

const $logoImage: ImageStyle = {
  height: 42,
  width: 77,
}

const $logoContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignSelf: "flex-start",
  justifyContent: "center",
  height: 56,
  paddingHorizontal: spacing.lg,
})
