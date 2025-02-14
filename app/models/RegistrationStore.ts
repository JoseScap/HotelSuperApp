import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { TxKeyPath } from "@/i18n"

export const RegistrationStoreModel = types
  .model("RegistrationStore")
  .props({
    email: "",
    password: "",
    passwordConfirmation: "",
  })
  .actions(withSetPropAction)
  .views((store) => ({
    get validationError(): TxKeyPath | undefined {
      if (store.email.length === 0) return "registrationScreen:errors.emailRequired"
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.email)) return "registrationScreen:errors.emailInvalid"
      if (store.password.length === 0) return "registrationScreen:errors.passwordRequired"
      if (store.password.length < 8) return "registrationScreen:errors.passwordTooShort"
      if (!/^[a-zA-Z0-9]+$/.test(store.password)) return "registrationScreen:errors.passwordInvalid"
      if (store.password !== store.passwordConfirmation) 
        return "registrationScreen:errors.passwordsDontMatch"
      return undefined
    },
  }))
  .actions((store) => ({
    reset() {
      store.setProp("email", "")
      store.setProp("password", "")
      store.setProp("passwordConfirmation", "")
    },
  }))

export interface RegistrationStore extends Instance<typeof RegistrationStoreModel> {}
export interface RegistrationStoreSnapshotOut extends SnapshotOut<typeof RegistrationStoreModel> {}
export interface RegistrationStoreSnapshotIn extends SnapshotIn<typeof RegistrationStoreModel> {}

// Test if we typed everything correctly
// @ts-ignore
RegistrationStoreModel.properties.email.isOptional 