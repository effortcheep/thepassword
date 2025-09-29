import { useEffect, useState } from "react"
import "@/global.css"
import { SplashScreen } from "expo-router"
import { useFonts } from "@expo-google-fonts/space-grotesk"
import Drawer from "expo-router/drawer"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { KeyboardProvider } from "react-native-keyboard-controller"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider"
import { SideBar } from "@/src/components/SideBar"
import { initI18n } from "@/src/i18n"
import { ThemeProvider } from "@/src/theme/context"
import { customFontsToLoad } from "@/src/theme/typography"
import { loadDateFnsLocale } from "@/src/utils/formatDate"

SplashScreen.preventAutoHideAsync()

if (__DEV__) {
  // Load Reactotron configuration in development. We don't want to
  // include this in our production bundle, so we are using `if (__DEV__)`
  // to only execute this in development.
  require("src/devtools/ReactotronConfig.ts")
}

export { ErrorBoundary } from "@/src/components/ErrorBoundary/ErrorBoundary"

export default function Root() {
  const [fontsLoaded, fontError] = useFonts(customFontsToLoad)
  const [isI18nInitialized, setIsI18nInitialized] = useState(false)

  useEffect(() => {
    initI18n()
      .then(() => setIsI18nInitialized(true))
      .then(() => loadDateFnsLocale())
  }, [])

  const loaded = fontsLoaded && isI18nInitialized

  useEffect(() => {
    if (fontError) throw fontError
  }, [fontError])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <GluestackUIProvider mode="light">
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <ThemeProvider>
          <KeyboardProvider>
            <GestureHandlerRootView>
              <Drawer />
            </GestureHandlerRootView>
          </KeyboardProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GluestackUIProvider>
  )
}
