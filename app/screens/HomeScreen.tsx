import { observer } from "mobx-react-lite"
import { ViewStyle, View, FlatList } from "react-native"
import { Screen, Text, Card } from "../components"
import { MainTabScreenProps } from "../navigators"
import { spacing } from "../theme"

interface HomeScreenProps extends MainTabScreenProps<"Home"> {}

export const HomeScreen = observer(function HomeScreen(props: HomeScreenProps) {
  const { navigation } = props

  return (
    <Screen preset="scroll" contentContainerStyle={$container}>
      <Text preset="heading" tx="homeScreen.welcome" style={$header} />
      
      <View style={$section}>
        <Text preset="subheading" tx="homeScreen.activities" style={$sectionHeader} />
        <FlatList
          horizontal
          data={[]} // Aquí irían tus actividades
          renderItem={({ item }) => (
            <Card
              title={item.title}
              image={item.image}
              onPress={() => {}}
            />
          )}
        />
      </View>

      <View style={$section}>
        <Text preset="subheading" tx="homeScreen.recommendations" style={$sectionHeader} />
        <FlatList
          horizontal
          data={[]} // Aquí irían tus recomendaciones
          renderItem={({ item }) => (
            <Card
              title={item.title}
              image={item.image}
              onPress={() => {}}
            />
          )}
        />
      </View>
    </Screen>
  )
})

const $container: ViewStyle = {
  flex: 1,
  padding: spacing.md,
}

const $header: TextStyle = {
  marginBottom: spacing.lg,
}

const $section: ViewStyle = {
  marginBottom: spacing.xl,
}

const $sectionHeader: TextStyle = {
  marginBottom: spacing.sm,
} 