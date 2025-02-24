export interface Destination {
  id: string
  name: string
  location: string
  imageUrl: string
  rating?: number
  distance?: string
  description?: string
}

export interface DestinationCardProps {
  destination: Destination
  onPress?: (destination: Destination) => void
} 