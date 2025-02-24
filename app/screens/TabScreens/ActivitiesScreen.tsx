import { FC } from "react"
import { Image, ImageStyle, View } from "react-native"
import { Screen } from "@/components/Screen"
import { Card, Text } from "@/components"
import { BottomHomeTabScreenProps } from "@/navigators/BottomNavigator"
import { useBottomProps } from "@/hooks/useBottomProps"

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
    const bottomProps = useBottomProps()

    return (
      <Screen preset="scroll" {...bottomProps}>
        <Text tx="activitiesScreen:subtitle" preset="subheading" />
        {hotelActivities.map((activity, index) => (
          <Card
            key={`hotel-${index}`}
            HeadingComponent={
              <View>
                <Text>{activity}</Text>
              </View>
            }
            ContentComponent={
              <View>
                <Image source={logo} style={$logoImage} />
              </View>
            }
          />
        ))}
        <Text tx="activitiesScreen:city" preset="subheading" />
        {cityActivities.map((activity, index) => (
          <Card
            key={`city-${index}`}
            HeadingComponent={
              <View>
                <Text>{activity}</Text>
              </View>
            }
            ContentComponent={
              <View>
                <Image source={logo} style={$logoImage} />
              </View>
            }
          />
        ))}
      </Screen>
    )
  }

const $logoImage: ImageStyle = {
  height: 42,
  width: 77,
}
