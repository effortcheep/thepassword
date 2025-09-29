import { FC, useCallback } from "react"
import { View } from "react-native"
import { DrawerContentComponentProps } from "@react-navigation/drawer"

import { Button } from "./Button"
import { Screen } from "./Screen"

export const SideBar: FC<DrawerContentComponentProps> = (props: DrawerContentComponentProps) => {
  const { state, navigation } = props
  const currentRoute = state.routeNames[state.index]
  console.log(currentRoute)

  const handlePressBackButton = useCallback(() => {
    navigation.closeDrawer()
  }, [navigation])
  const handlePressMenuMain = useCallback(() => {
    navigation.navigate("index")
  }, [navigation])
  const handlePressMenuAbout = useCallback(() => {
    navigation.navigate("about")
  }, [navigation])

  return (
    <Screen safeAreaEdges={["top", "bottom"]}>
      <View className="p-7 flex flex-col gap-3">
        <Button text="back" onPress={handlePressBackButton} />
        <Button text="index" onPress={handlePressMenuMain} />
        <Button text="about" onPress={handlePressMenuAbout} />
      </View>
    </Screen>
  )
}
