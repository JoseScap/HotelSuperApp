import { FC, Fragment } from "react"
import { BottomHomeTabScreenProps } from "@/navigators/BottomNavigator"
import { useHeader } from "@/utils/useHeader"
import { useProfileScreen } from "@/hooks/useProfileScreen"
import { useBottomProps } from "@/hooks/useBottomProps"
import { Checkbox, Icon, Screen, Text, TextField } from "@/components"
import { useColorScheme } from "nativewind"

const StyledView = styled(View)

export const ProfileScreen = observer(function ProfileScreen() {
  const {
    displayName,
    isEditing,
    error,
    startEditing,
    cancelEditing,
    saveDisplayName,
    changeDisplayName,
    handleLogout,
  } = useProfileScreen()

  const { colorScheme, setColorScheme } = useColorScheme()
  const isDark = colorScheme === "dark"
  const bottomProps = useBottomProps()

  useHeader(
    {
      leftTx: "profileScreen:title",
      rightTx: "common:logOut",
      onRightPress: () => handleLogout(() => navigation.navigate("Landing")),
    },
  } = useStores()
  const { name: hotelName } = useHotelConfig()

  return (
    <Screen preset="scroll" contentClassName="px-4 py-6" {...bottomProps}>
      <Text preset="subheading" className="mb-4" tx="profileScreen:sectionPersonalDataTitle" />

      <TextField
        value={displayName}
        onChangeText={changeDisplayName}
        containerClassName="mb-6"
        labelTx="profileScreen:displayNameLabel"
        editable={isEditing}
        status={error ? "error" : undefined}
        helperTx={error}
        RightAccessory={() => (
          <Fragment>
            {isEditing ? (
              <Fragment>
                <Icon
                  icon="check"
                  className="text-neutral-800"
                  size={20}
                  onPress={() => saveDisplayName(displayName)}
                />
                <Icon icon="x" className="text-neutral-800" size={20} onPress={cancelEditing} />
              </Fragment>
            ) : (
              <Icon icon="pin" className="text-neutral-800" size={20} onPress={startEditing} />
            )}
          </StyledView>
        )}

      <Text preset="subheading" className="mb-4" tx="profileScreen:sectionPreferencesTitle" />

      <Text preset="bold" className="mb-4" tx="profileScreen:darkModeTitle" />

      <Checkbox
        labelTx={isDark ? "profileScreen:deactivateDarkMode" : "profileScreen:activateDarkMode"}
        value={isDark}
        onValueChange={() => setColorScheme(isDark ? "light" : "dark")}
      />
    </Screen>
  )
}
