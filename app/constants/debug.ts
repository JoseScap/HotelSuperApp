import { ViewStyle } from "react-native"

type DebugColors = "red" | "green" | "blue" | "yellow" | "purple" | "orange" | "pink" | "gray"

export const $debugBox: Record<DebugColors, ViewStyle> = {
  red: {
    borderWidth: 1,
    borderColor: "red",
  },
  green: {
    borderWidth: 1,
    borderColor: "green",
  },
  blue: {
    borderWidth: 1,
    borderColor: "blue",
  },
  yellow: {
    borderWidth: 1,
    borderColor: "yellow",
  },
  purple: {
    borderWidth: 1,
    borderColor: "purple",
  },
  orange: {
    borderWidth: 1,
    borderColor: "orange",
  },
  pink: {
    borderWidth: 1,
    borderColor: "pink",
  },
  gray: {
    borderWidth: 1,
    borderColor: "gray",
  },
}
