import { NavigationActions, StackActions } from "@react-navigation/native-stack"
import { get, isObject, findIndex } from "lodash"
import PropTypes from "prop-types"
import React, { Component } from "react"

let _navigator
let _previousState = null
let _routes = []

export const setPreviousState = (state) => {
  _previousState = state
}

export const getPreviousState = () => {
  const previousState = _previousState
  _previousState = null
  return previousState
}

export const setTopLevelNavigator = (navigatorRef) => {
  _navigator = navigatorRef
}

export const navigate = (routeName, params, key) => {
  if (isObject(routeName)) {
    params = routeName.params
    key = routeName.key
    routeName = routeName.routeName
  }
  let options = { routeName, params }
  if (key) {
    options = { ...options, key }
  }
  const route = getActiveRoute()
  if (route && route.key) {
    _routes.push(route)
  }
  _navigator.dispatch(NavigationActions.navigate(options))
}

export const goBack = () => {
  const lastRoute = _routes.pop()
  if (lastRoute) {
    _navigator.dispatch(
      NavigationActions.navigate({
        key: lastRoute.key,
        routeName: lastRoute.routeName,
        params: lastRoute.params,
      }),
    )
  } else {
    _navigator.dispatch(NavigationActions.back())
  }
}

export const navigateRoot = (newRoute, backRoute) => {
  let index = 0
  const actions = []
  _routes = []
  if (backRoute) {
    index = 1
    actions.push(NavigationActions.navigate(backRoute))
    _routes = [backRoute]
  }
  actions.push(NavigationActions.navigate(newRoute))
  const resetAction = StackActions.reset({
    index,
    key: null,
    actions,
  })
  _navigator.dispatch(resetAction)
}

export const replacePreviousRouteByRouteName = (navigationState, routeName) => {
  if (!navigationState || !navigationState.routes || navigationState.index < 0) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  if (route.routeName === routeName) {
    // Clear the local history of the routes navigating to a previous route
    const routeIndex = findIndex(_routes, { key: route.key })
    if (routeIndex >= 0) {
      _routes = _routes.slice(0, routeIndex)
    }
    const lastRoute = _routes[_routes.length - 1]
    const previousRoute = navigationState.routes[navigationState.index - 1]
    if (previousRoute && lastRoute && previousRoute.key !== lastRoute.key) {
      return replaceLastRoute(navigationState)
    }
    return null
  }
  // dive into nested navigators
  if (route.routes) {
    route.index = route.routes.length - 1
    return replacePreviousRouteByRouteName(route, routeName)
  }
  navigationState.index--
  return replacePreviousRouteByRouteName(navigationState, routeName)
}

export const getActiveRoute = (navigationState) => {
  navigationState = navigationState || get(_navigator, "state.nav")
  if (!navigationState || !navigationState.routes) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  // dive into nested navigators
  if (route.routes) {
    return getActiveRoute(route)
  }
  return route
}

export const getActiveRouteName = (navigationState) => {
  const route = getActiveRoute(navigationState)
  return route && route.routeName
}

export const mapNavigationStateParamsToProps = (ScreenComponent) => {
  return class extends Component {
    static propTypes = {
      navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        state: PropTypes.shape({
          params: PropTypes.any.isRequired,
        }).isRequired,
      }).isRequired,
    }
    static navigationOptions = ScreenComponent.navigationOptions // better use hoist-non-react-statics
    render() {
      const { navigation } = this.props
      const {
        state: { params },
      } = navigation
      return <ScreenComponent {...this.props} {...params} />
    }
  }
}

const replaceLastRoute = (state) => {
  if (state.routes.length > 1 && state.index > 0) {
    const oldIndex = state.index - 1
    // remove one that we are replacing
    state.routes.splice(oldIndex, 1)
    // index now one less
    state.index = oldIndex
    return state
  }
  return null
}

const configureRouter = (StackNavigator) => {
  // generally defer to the "real" one
  const parentGetStateForAction = StackNavigator.router.getStateForAction
  StackNavigator.router.getStateForAction = (action, inputState) => {
    const state = parentGetStateForAction(action, inputState)

    // fix it up if applicable
    if (state && action.type === NavigationActions.NAVIGATE) {
      if (action.params && action.params.replaceRoute) {
        delete action.params.replaceRoute
        replaceLastRoute(state)
      }

      // workaround to fix issue navigating to components from nested navigators
      replacePreviousRouteByRouteName(state, action.routeName)
    }

    return state
  }
}

export default {
  goBack,
  navigate,
  navigateRoot,
  setTopLevelNavigator,
  getActiveRouteName,
  setPreviousState,
  getPreviousState,
  configureRouter,
}
