import { createAction } from "@reduxjs/toolkit"

export const resetState = createAction("resetState", () => {
  return { payload: null }
})
