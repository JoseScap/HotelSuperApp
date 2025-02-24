import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { CompositeScreenProps } from "@react-navigation/native"
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs"

export type AppStackParamList = {
  Landing: undefined
  Login: undefined
  Register: undefined
  RegisterSuccess: undefined
  GuestTabs: undefined
  UserTabs: undefined
  ReservationTabs: undefined
  CheckedInTabs: undefined
  ReservedUserTabs: undefined
  ActivityDetail: { id: string }
  PaymentDetail: { id: string }
  ReservationDetail: { id: string }
}

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

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

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
