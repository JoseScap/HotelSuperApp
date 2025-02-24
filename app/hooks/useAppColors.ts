import { useStores } from "@/models"

export function useAppColors() {
  const { configStore } = useStores()
  const { colors } = configStore.config.branding

  return {
    primary: colors.primary,
    secondary: colors.secondary,
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
    },
    background: {
      primary: colors.background.primary,
      secondary: colors.background.secondary,
    },
  }
}
