import { Store } from "core-module"

import { settingsSlice, selectColorMode } from "../store"

export function useAppearance() {
  const { colorMode, changeColorMode } = useColorMode()
  return {
    colorMode,
    changeColorMode,
  }
}

export function useColorMode() {
  const dispatch = Store.useAppDispatch()
  const colorMode = Store.useTypedSelector(selectColorMode)

  const changeColorMode = (mode) => {
    dispatch(settingsSlice.actions.changeColorMode(mode))
  }

  return {
    colorMode,
    changeColorMode,
  }
}
