export interface Booking {
  id: string
  checkIn: string
  checkOut: string
  guestCount: number
  roomType: string
  status: BookingStatus
  totalPrice: number
  activities?: BookingActivity[]
}

export type BookingStatus = 'pending' | 'confirmed' | 'checked-in' | 'completed' | 'cancelled'

export interface BookingActivity {
  id: string
  activityId: string
  date: string
  time: string
  participants: number
  status: BookingActivityStatus
  cost: number
}

export type BookingActivityStatus = 'scheduled' | 'completed' | 'cancelled'

export interface BookingFormData {
  checkIn: string
  checkOut: string
  guestCount: number
  roomType: string
} 