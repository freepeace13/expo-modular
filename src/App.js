import { useFonts, Roboto_400Regular, Roboto_500Medium } from "@expo-google-fonts/roboto"
import { NavigationContainer } from "@react-navigation/native"
import { Navigator as CoreNavigator, Utils, Theme, withFontsLoader } from "core-module"
import * as SplashScreen from "expo-splash-screen"
import { useEffect, useState } from "react"
import { PaperProvider } from "react-native-paper"

function AppNavigator() {
  return (
    <NavigationContainer prefix={Utils.getDeepLink()} theme={Theme.isDark()}>
      <CoreNavigator />
    </NavigationContainer>
  )
}

function App() {
  const [isAppReady, setIsAppReady] = useState(false)
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
  })

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.hideAsync()
      } catch (e) {
        //
      } finally {
        setIsAppReady(true)
      }
    }
    if (fontsLoaded) {
      prepare()
    }
  }, [fontsLoaded])

  if (!isAppReady) {
    return null
  }

  return (
    <PaperProvider theme={Theme.getColors()}>
      <AppNavigator />
    </PaperProvider>
  )
}

export default withFontsLoader(App)
