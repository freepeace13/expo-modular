import { isRejectedWithValue } from "@reduxjs/toolkit"

import { resetState } from "../actions/resetState"

export function unauthenticatedMiddleware({ dispatch }) {
  return (next) => (action) => {
    if (isRejectedWithValue(action) && action.payload.status === 401) {
      // dispatch(api.util.resetApiState())
      dispatch(resetState())
    }

    return next(action)
  }
}
