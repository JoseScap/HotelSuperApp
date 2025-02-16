import { FC } from "react"
import { Platform, TextStyle, ViewStyle } from "react-native"
import { Screen, TextField, Icon, Text } from "@/components"
import { $styles } from "@/theme"
import { BottomHomeTabScreenProps } from "@/navigators/BottomNavigator"
import { useHeader } from "@/utils/useHeader"
import { useStores } from "@/models"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { useProfileScreen } from "@/hooks/useProfileScreen"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ThemedStyle } from "@/theme"
import React from "react"
import { useBottomProps } from "@/hooks/useBottomProps"

const isAndroid = Platform.OS === "android"

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
    theme: { colors },
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
      <TextField
        value={displayName}
        onChangeText={changeDisplayName}
        containerStyle={themed($textField)}
        labelTx="profileScreen:displayNameLabel"
        editable={isEditing}
        status={error ? "error" : undefined}
        helperTx={error}
        RightAccessory={(props) => (
          <>
            {isEditing ? (
              <>
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
              </>
            ) : (
              <Icon
                icon="pin"
                color={colors.palette.neutral800}
                containerStyle={props.style}
                size={20}
                onPress={startEditing}
              />
            )}
          </>
        )}
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
