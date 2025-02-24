import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    authToken: types.maybe(types.string),
    displayName: types.maybe(types.string),
    hasReservation: types.optional(types.boolean, false),
    hasCheckedIn: types.optional(types.boolean, false),
  })
  .views((store) => ({
    get isAuthenticated() {
      return !!store.authToken
    },
  }))
  .views((store) => ({
    get canAccessHotelFeatures() {
      return store.isAuthenticated && store.hasCheckedIn
    },
    get canMakeReservation() {
      return store.isAuthenticated && !store.hasReservation
    },
  }))
  .actions((store) => ({
    setAuthToken(value?: string) {
      store.authToken = value
    },
    setDisplayName(value: string) {
      store.displayName = value
    },
    toggleHasReservation() {
      store.hasReservation = !store.hasReservation
      // Si quitamos la reserva, también quitamos el check-in
      if (!store.hasReservation) {
        store.hasCheckedIn = false
      }
    },
    toggleHasCheckedIn() {
      // Solo podemos hacer check-in si tenemos reserva
      if (store.hasReservation) {
        store.hasCheckedIn = !store.hasCheckedIn
      }
    },
    logout() {
      store.authToken = undefined
      store.displayName = undefined
      store.hasReservation = false
      store.hasCheckedIn = false
    },
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> {}
