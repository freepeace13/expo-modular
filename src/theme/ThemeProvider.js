import React from "react"
import { PaperProvider } from "react-native-paper"
import { useAppearance } from "settings-module"

import theme from "./base"

export default function ThemeProvider({ children }) {
  const { colorMode } = useAppearance()
  return (
    <PaperProvider theme={theme[colorMode]} settings={{ rippleEffectEnabled: true }}>
      {children}
    </PaperProvider>
  )
}
