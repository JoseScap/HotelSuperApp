import { types, flow } from "mobx-state-tree"
import AsyncStorage from "@react-native-async-storage/async-storage"
import defaultConfig from "@/config/hotelConfig.json"

const CONFIG_STORAGE_KEY = "@hotel_config"

export const ConfigStoreModel = types
  .model("ConfigStore")
  .props({
    config: types.frozen(defaultConfig),
  })
  .actions((self) => ({
    setConfig(config: typeof defaultConfig) {
      self.config = config
    },
  }))
  .actions((self) => ({
    loadConfig: flow(function* () {
      try {
        const storedConfig = yield AsyncStorage.getItem(CONFIG_STORAGE_KEY)
        if (storedConfig) {
          self.setConfig(JSON.parse(storedConfig))
        }
      } catch (error) {
        console.error("Error loading config:", error)
      }
    }),

    updateColor: flow(function* (
      type: "primary" | "secondary" | "text" | "background",
      color: string,
    ) {
      // Crear una copia profunda del config actual
      const newConfig = JSON.parse(JSON.stringify(self.config))

      // Actualizar el color según el tipo
      if (type === "text" || type === "background") {
        newConfig.branding.colors[type].primary = color
      } else {
        newConfig.branding.colors[type] = color
      }

      // Actualizar el estado
      self.setConfig(newConfig)

      try {
        yield AsyncStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(newConfig))
      } catch (error) {
        console.error("Error saving config:", error)
      }
    }),

    resetConfig: flow(function* () {
      self.setConfig(defaultConfig)
      try {
        yield AsyncStorage.removeItem(CONFIG_STORAGE_KEY)
      } catch (error) {
        console.error("Error resetting config:", error)
      }
    }),
  }))
  .actions((self) => ({
    afterCreate() {
      self.loadConfig()
    },
  }))
