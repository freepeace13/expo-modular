import { useDispatch, useSelector } from "react-redux"

import { store, persistor } from "./configureStore"

export const useAppDispatch = useDispatch
export const useTypedSelector = useSelector

export default {
  store,
  persistor,
  useAppDispatch,
  useTypedSelector,
}
