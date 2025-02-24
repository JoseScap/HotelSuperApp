import { useState, useEffect } from "react"
import { supabase } from "@/utils/supabaseClient"
import { TxKeyPath } from "@/i18n"
import { useStores } from "@/models"
import { GoogleSignin } from "@react-native-google-signin/google-signin"

interface UseProfileScreenReturn {
  displayName: string
  isEditing: boolean
  error: TxKeyPath | undefined
  startEditing: () => void
  changeDisplayName: (value: string) => void
  cancelEditing: () => void
  saveDisplayName: (value: string) => Promise<void>
  handleLogout: (navigationCallback: () => void) => Promise<void>
}

export function useProfileScreen(): UseProfileScreenReturn {
  const [displayName, setDisplayName] = useState("")
  const [originalName, setOriginalName] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState<TxKeyPath>()

  const {
    authenticationStore: { logout, displayName: authDisplayName },
  } = useStores()

  function startEditing() {
    setOriginalName(authDisplayName ?? "")
    setIsEditing(true)
  }

  function cancelEditing() {
    setDisplayName(originalName)
    setIsEditing(false)
    setError(undefined)
  }

  function changeDisplayName(value: string) {
    setDisplayName(value)
  }

  async function saveDisplayName(value: string) {
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          display_name: value,
        },
      })

      if (error) {
        setError("profileScreen:errors.updateFailed")
        return undefined
      }

      setDisplayName(value)
      setIsEditing(false)
      setError(undefined)
    } catch {
      setError("profileScreen:errors.updateFailed")
    }
  }

  async function handleLogout(navigationCallback: () => void) {
    await logout()
    await GoogleSignin.signOut()
    navigationCallback()
  }

  useEffect(() => {
    setDisplayName(authDisplayName ?? "")
  }, [authDisplayName])

  return {
    displayName,
    isEditing,
    error,
    startEditing,
    changeDisplayName,
    cancelEditing,
    saveDisplayName,
    handleLogout,
  }
}
