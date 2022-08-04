const { TOGGLE_DARK_MODE } = require("./appActions")

const appReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_DARK_MODE:
      return {
        ...state,
        darkMode: !state.darkMode,
      }

    default:
      return state
  }
}

export default appReducer
