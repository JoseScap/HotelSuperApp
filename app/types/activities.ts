export interface Activity {
  id: string
  title: string
  description: string
  imageUrl: string
  duration: string
  schedule: string
  price: number
  category: "spa" | "fitness" | "dining" | "entertainment" | "sports" | "tours"
  available: boolean
  maxParticipants: number
  location: string
  amenities: string[]
}

export interface Destination {
  id: string
  name: string
  location: string
  imageUrl: string
  rating?: number
  distance?: string
  description: string
}

export interface Booking {
  id: string
  activityId: string
  date: string
  time: string
  participants: number
  status: "pending" | "confirmed" | "completed" | "cancelled"
  totalPrice: number
  paymentMethod: string
  paymentStatus: "pending" | "paid" | "refunded"
  bookingReference: string
  specialRequests?: string
  contactInfo: {
    name: string
    email: string
    phone: string
  }
}

export type ActivityCategory = "resort" | "spa" | "gastronomy" | "activities"

export interface ActivityCardProps {
  activity: Activity
  onPress?: (activity: Activity) => void
}
