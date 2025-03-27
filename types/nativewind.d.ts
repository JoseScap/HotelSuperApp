import "nativewind/types"

// Extender las interfaces de ScrollView para incluir contentContainerClassName
declare module "react-native" {
  interface ScrollViewProps {
    contentContainerClassName?: string
  }

  interface SafeAreaViewProps {
    className?: string
  }
}

// Declaraciones específicas para soportar className en todos los componentes
declare module "react-native" {
  interface ViewProps {
    className?: string
  }

  interface TextProps {
    className?: string
  }

  interface TextInputProps {
    className?: string
  }

  interface TouchableOpacityProps {
    className?: string
  }

  interface ImageProps {
    className?: string
  }
}
