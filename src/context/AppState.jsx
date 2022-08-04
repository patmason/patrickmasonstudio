import React, { useReducer } from "react"
import AppContext from "./appContext"
import reducer from "./appReducer"

const initState = {
  darkMode: false,
}

const AppState = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState)
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppState
