/* eslint-disable import/first */
/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */
if (__DEV__) {
  // Load Reactotron in development only.
  // Note that you must be using metro's `inlineRequires` for this to work.
  // If you turn it off in metro.config.js, you'll have to manually import it.
  require("./devtools/ReactotronConfig.ts")
}
import "./utils/gestureHandler"
import "./utils/ignoreWarnings"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import * as Linking from "expo-linking"
import { useInitialRootStore } from "@/models"
import { AppNavigator, useNavigationPersistence } from "@/navigators"
import { ErrorBoundary } from "@/screens/ErrorScreen/ErrorBoundary"
import * as storage from "@/utils/storage"
import Config from "@/config"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { initI18n } from "@/i18n"
import { I18nextProvider } from "react-i18next"
import i18next from "i18next"
import { useEffect, useState } from "react"
import { loadDateFnsLocale } from "@/utils/formatDate"
import { styled } from "nativewind"

const StyledGestureHandlerRootView = styled(GestureHandlerRootView)

// Web linking configuration
const prefix = Linking.createURL("/")
const config = {
  screens: {
    Login: {
      path: "",
    },
    Welcome: "welcome",
    Demo: {
      screens: {
        DemoShowroom: {
          path: "showroom/:queryIndex?/:itemIndex?",
        },
        DemoDebug: "debug",
        DemoPodcastList: "podcast",
        DemoCommunity: "community",
      },
    },
  },
}

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

/**
 * This is the root component of our app.
 */
export function App() {
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  const [isI18nInitialized, setIsI18nInitialized] = useState(false)
  const { rehydrated } = useInitialRootStore()

  // Initialize i18n
  useEffect(() => {
    initI18n()
      .then(() => setIsI18nInitialized(true))
      .then(() => loadDateFnsLocale())
  }, [])

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  if (!rehydrated || !isNavigationStateRestored || !isI18nInitialized) {
    return null
  }

  const linking = {
    prefixes: [prefix],
    config,
  }

  // otherwise, we're ready to render the app
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ErrorBoundary catchErrors={Config.catchErrors}>
        <StyledGestureHandlerRootView className="flex-1">
          <I18nextProvider i18n={i18next}>
            <AppNavigator
              linking={linking}
              initialState={initialNavigationState}
              onStateChange={onNavigationStateChange}
            />
          </I18nextProvider>
        </StyledGestureHandlerRootView>
      </ErrorBoundary>
    </SafeAreaProvider>
  )
}
