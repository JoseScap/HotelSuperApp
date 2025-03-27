import { StyleProp, TextStyle } from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign"
import Entypo from "react-native-vector-icons/Entypo"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import Feather from "react-native-vector-icons/Feather"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import FontAwesome6 from "react-native-vector-icons/FontAwesome6"
import Fontisto from "react-native-vector-icons/Fontisto"
import Foundation from "react-native-vector-icons/Foundation"
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Octicons from "react-native-vector-icons/Octicons"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import Zocial from "react-native-vector-icons/Zocial"

/**
 * Available icon sets in the IconProvider component
 */
export type IconSet =
  | "AntDesign"
  | "Entypo"
  | "EvilIcons"
  | "Feather"
  | "FontAwesome"
  | "FontAwesome5"
  | "FontAwesome6"
  | "Fontisto"
  | "Foundation"
  | "Ionicons"
  | "MaterialCommunityIcons"
  | "MaterialIcons"
  | "Octicons"
  | "SimpleLineIcons"
  | "Zocial"

export interface IconProps {
  /**
   * The name of the icon
   */
  name: string

  /**
   * The icon set to use
   */
  iconSet?: IconSet

  /**
   * The size of the icon, default is 24
   */
  size?: number

  /**
   * The color of the icon
   */
  color?: string

  /**
   * Optional style overrides for the icon
   */
  style?: StyleProp<TextStyle>

  /**
   * Optional onPress handler
   */
  onPress?: () => void
}

/**
 * A flexible icon component that supports multiple icon sets from react-native-vector-icons
 * Defaults to MaterialIcons if no iconSet is specified
 */
export function IconProvider({
  name,
  iconSet = "MaterialIcons",
  size = 24,
  color = "black",
  style,
  onPress,
}: IconProps) {
  // Get the right icon component based on iconSet
  let IconComponent: any

  switch (iconSet) {
    case "AntDesign":
      IconComponent = AntDesign
      break
    case "Entypo":
      IconComponent = Entypo
      break
    case "EvilIcons":
      IconComponent = EvilIcons
      break
    case "Feather":
      IconComponent = Feather
      break
    case "FontAwesome":
      IconComponent = FontAwesome
      break
    case "FontAwesome5":
      IconComponent = FontAwesome5
      break
    case "FontAwesome6":
      IconComponent = FontAwesome6
      break
    case "Fontisto":
      IconComponent = Fontisto
      break
    case "Foundation":
      IconComponent = Foundation
      break
    case "Ionicons":
      IconComponent = Ionicons
      break
    case "MaterialCommunityIcons":
      IconComponent = MaterialCommunityIcons
      break
    case "Octicons":
      IconComponent = Octicons
      break
    case "SimpleLineIcons":
      IconComponent = SimpleLineIcons
      break
    case "Zocial":
      IconComponent = Zocial
      break
    default:
      IconComponent = MaterialIcons
  }

  return <IconComponent name={name} size={size} color={color} style={style} onPress={onPress} />
}
