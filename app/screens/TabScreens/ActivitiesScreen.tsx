import { FC } from "react"
import { Image, View } from "react-native"
import { Screen } from "@/components/Screen"
import { useHeader } from "@/utils/useHeader"
import { Card, Text } from "@/components"
import { BottomHomeTabScreenProps } from "@/navigators/BottomNavigator"
import { useBottomProps } from "@/hooks/useBottomProps"
import { styled } from "nativewind"

const StyledView = styled(View)
const StyledImage = styled(Image)

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

    useHeader({
      leftTx: "activitiesScreen:title",
    })

    return (
      <Screen preset="scroll" contentClassName="px-4 py-6" {...bottomProps}>
        <Text tx="activitiesScreen:subtitle" preset="subheading" className="mb-2" />
        {hotelActivities.map((activity, index) => (
          <Card
            key={`hotel-${index}`}
            HeadingComponent={
              <StyledView>
                <Text>{activity}</Text>
              </StyledView>
            }
            ContentComponent={
              <StyledView className="h-14 self-start justify-center px-6">
                <StyledImage source={logo} className="h-[42px] w-[77px]" resizeMode="contain" />
              </StyledView>
            }
            className="mb-2"
          />
        ))}
        <Text tx="activitiesScreen:city" preset="subheading" className="mb-2" />
        {cityActivities.map((activity, index) => (
          <Card
            key={`city-${index}`}
            HeadingComponent={
              <StyledView>
                <Text>{activity}</Text>
              </StyledView>
            }
            ContentComponent={
              <StyledView className="h-14 self-start justify-center px-6">
                <StyledImage source={logo} className="h-[42px] w-[77px]" resizeMode="contain" />
              </StyledView>
            }
            className="mb-2"
          />
        ))}
      </Screen>
    )
  }
