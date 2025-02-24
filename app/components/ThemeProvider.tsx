import { useEffect } from "react"
import { useStores } from "@/models"
import { observer } from "mobx-react-lite"

export const ThemeProvider = observer(function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { configStore } = useStores()
  const { colors } = configStore.config.branding

  // Actualizamos los estilos globales cuando cambien los colores
  useEffect(() => {
    // Aquí podríamos actualizar los estilos globales si fuera necesario
    console.log("Colors updated:", colors)
  }, [colors])

  return children
})
