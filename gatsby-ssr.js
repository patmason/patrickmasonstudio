import "./src/styles/index.scss"
import React from "react"
import AppState from "./src/context/AppState"

export const wrapRootElement = ({ element }) => {
  return <AppState>{element}</AppState>
}
