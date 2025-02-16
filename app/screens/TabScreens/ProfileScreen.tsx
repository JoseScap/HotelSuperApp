import { FC, Fragment } from "react"
import { TextStyle, ViewStyle } from "react-native"
import { Screen, Text, TextField, Icon, Checkbox } from "@/components"
import { $styles } from "@/theme"
import { BottomHomeTabScreenProps } from "@/navigators/BottomNavigator"
import { useHeader } from "@/utils/useHeader"
import { useProfileScreen } from "@/hooks/useProfileScreen"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ThemedStyle } from "@/theme"
import { useBottomProps } from "@/hooks/useBottomProps"

export const ProfileScreen: FC<BottomHomeTabScreenProps<"Profile">> = function HomeScreen(_props) {
  const { navigation } = _props
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

  const {
    themed,
    theme: { colors, isDark },
    setThemeContextOverride,
  } = useAppTheme()

  const bottomProps = useBottomProps()

  useHeader(
    {
      leftTx: "profileScreen:title",
      rightTx: "common:logOut",
      onRightPress: () => handleLogout(() => navigation.navigate("Landing")),
    },
    [handleLogout],
  )

  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top"]}
      contentContainerStyle={[$styles.flex1, themed($container)]}
      {...bottomProps}
    >
      <Text
        preset="subheading"
        style={themed($sectionSubtitle)}
        tx="profileScreen:sectionPersonalDataTitle"
      />

      <TextField
        value={displayName}
        onChangeText={changeDisplayName}
        containerStyle={themed($textField)}
        labelTx="profileScreen:displayNameLabel"
        editable={isEditing}
        status={error ? "error" : undefined}
        helperTx={error}
        RightAccessory={(props) => (
          <Fragment>
            {isEditing ? (
              <Fragment>
                <Icon
                  icon="check"
                  color={colors.palette.neutral800}
                  containerStyle={props.style}
                  size={20}
                  onPress={() => saveDisplayName(displayName)}
                />
                <Icon
                  icon="x"
                  color={colors.palette.neutral800}
                  containerStyle={props.style}
                  size={20}
                  onPress={cancelEditing}
                />
              </Fragment>
            ) : (
              <Icon
                icon="pin"
                color={colors.palette.neutral800}
                containerStyle={props.style}
                size={20}
                onPress={startEditing}
              />
            )}
          </Fragment>
        )}
      />

      <Text
        preset="subheading"
        style={themed($sectionSubtitle)}
        tx="profileScreen:sectionPreferencesTitle"
      />

      <Text preset="bold" style={themed($sectionSubtitle)} tx="profileScreen:darkModeTitle" />

      <Checkbox
        labelTx={isDark ? "profileScreen:deactivateDarkMode" : "profileScreen:activateDarkMode"}
        value={isDark}
        onValueChange={() => setThemeContextOverride(isDark ? "light" : "dark")}
      />
    </Screen>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.lg,
})

const $textField: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
})

const $sectionSubtitle: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})
