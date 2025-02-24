import { createContext, useContext } from "react"
import type { RootStore } from "./RootStore"

const RootStoreContext = createContext<RootStore>({} as RootStore)

export const RootStoreProvider = RootStoreContext.Provider

export function useStores(): RootStore {
  const store = useContext(RootStoreContext)
  if (store === null) {
    throw new Error("Store cannot be null, please add a StoreProvider")
  }
  return store
}
