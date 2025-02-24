import hotelConfig from "@/config/hotelConfig.json"

export interface HotelConfig {
  // Branding
  name: string
  shortName: string
  logo: string
  colors: {
    primary: string
    secondary: string
    text: {
      primary: string
      secondary: string
    }
    background: {
      primary: string
      secondary: string
    }
  }
  // Contact
  address: string
  phone: string
  email: string
  social: {
    instagram: string
    facebook: string
    twitter: string
  }
  // Features
  features: {
    activities: {
      resort: {
        enabled: boolean
        icon: string
        order: number
      }
      spa: {
        enabled: boolean
        icon: string
        order: number
      }
      gastronomy: {
        enabled: boolean
        icon: string
        order: number
      }
      activities: {
        enabled: boolean
        icon: string
        order: number
      }
    }
    booking: {
      enabled: boolean
      requireAuth: boolean
    }
    checkIn: {
      enabled: boolean
      requireAuth: boolean
      availableFrom: string
    }
  }
}

/**
 * Hook para acceder a la configuración del hotel.
 * Proporciona acceso a toda la configuración del hotel incluyendo branding,
 * información de contacto y características habilitadas.
 *
 * @returns {HotelConfig} La configuración completa del hotel
 *
 * @example
 * ```tsx
 * const { name, colors, features } = useHotelConfig()
 * ```
 */
export function useHotelConfig(): HotelConfig {
  return {
    // Branding
    name: hotelConfig.branding.name,
    shortName: hotelConfig.branding.shortName,
    logo: hotelConfig.branding.logo,
    colors: hotelConfig.branding.colors,
    // Contact
    address: hotelConfig.contact.address,
    phone: hotelConfig.contact.phone,
    email: hotelConfig.contact.email,
    social: hotelConfig.contact.social,
    // Features
    features: hotelConfig.features,
  }
}
