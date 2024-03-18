import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationLightTheme,
} from "@react-navigation/native"
import merge from "deepmerge"
import {
  configureFonts,
  MD3LightTheme,
  MD3DarkTheme,
  adaptNavigationTheme,
} from "react-native-paper"

import { colors } from "./colors"
import { fonts } from "./fonts"

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationLightTheme,
  reactNavigationDark: NavigationDarkTheme,
})

const CombinedLightTheme = merge(MD3LightTheme, LightTheme)
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme)

const theme = {
  light: {
    ...CombinedLightTheme,
    fonts: configureFonts({ config: fonts }),
    colors: {
      ...CombinedLightTheme.colors,
      ...colors.light,
    },
  },
  dark: {
    ...CombinedDarkTheme,
    fonts: configureFonts({ config: fonts }),
    colors: {
      ...CombinedDarkTheme.colors,
      ...colors.dark,
    },
  },
}

export default theme
