import { Appearance } from "react-native"

import Colors from "./Colors"
import Fonts from "./Fonts"

export const isDark = () => {
  return Appearance.getColorScheme() === "dark"
}

export const getColors = () => {
  const colorScheme = Appearance.getColorScheme() ?? "light"
  return Colors[colorScheme]
}

export { Colors, Fonts }

export default {
  Colors,
  Fonts,
  getColors,
  isDark,
}
