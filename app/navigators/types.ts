import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { CompositeScreenProps } from "@react-navigation/native"
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { NavigatorScreenParams } from "@react-navigation/native"
import type { Activity } from "@/types/activities"
import type { Destination } from "@/types/destinations"
import type { Booking } from "@/types/booking"

export type AppStackParamList = {
  Landing: undefined
  Login: undefined
  BottomTabs: NavigatorScreenParams<BottomTabParamList>
}

export type BottomTabParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>
  BookingStack: NavigatorScreenParams<BookingStackParamList>
  ProfileStack: NavigatorScreenParams<ProfileStackParamList>
}

export type HomeStackParamList = {
  HomeScreen: undefined
  ActivityDetail: {
    activityId: string
  }
  DestinationDetail: {
    destinationId: string
  }
}

export type BookingStackParamList = {
  BookingScreen: undefined
  BookingDetail: {
    bookingId: string
  }
  BookingFlow: {
    activityId: string
  }
  BookingConfirmation: {
    bookingId: string
  }
}

export type ProfileStackParamList = {
  ProfileScreen: undefined
  Settings: undefined
  Help: undefined
}

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

export type BottomHomeParamList = {
  Home: undefined
  Profile: undefined
  Activities: undefined
}

export type GuestTabParamList = {
  Explore: undefined
  Booking: undefined
  Profile: undefined
}

export type UserTabParamList = {
  Explore: undefined
  Booking: undefined
  Profile: undefined
}

export type ReservedUserTabParamList = {
  Explore: undefined
  Booking: undefined
  Reservations: undefined
  Profile: undefined
}

export type CheckedInTabParamList = {
  Home: undefined
  Explore: undefined
  Payments: undefined
  Profile: undefined
}

export type ReservationTabParamList = {
  Home: undefined
  Explore: undefined
  Payments: undefined
  Profile: undefined
  Reservations: undefined
}

export type GuestTabScreenProps<T extends keyof GuestTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<GuestTabParamList, T>,
  NativeStackScreenProps<AppStackParamList>
>

export type UserTabScreenProps<T extends keyof UserTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<UserTabParamList, T>,
  NativeStackScreenProps<AppStackParamList>
>

export type ReservationTabScreenProps<T extends keyof ReservationTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<ReservationTabParamList, T>,
    NativeStackScreenProps<AppStackParamList>
  >

export type BottomHomeTabScreenProps<T extends keyof BottomHomeParamList> = CompositeScreenProps<
  BottomTabScreenProps<BottomHomeParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamList {}
  }
}
