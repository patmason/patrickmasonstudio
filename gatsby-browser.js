/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it

import "./src/styles/index.scss"
import React from "react"
import AppState from "./src/context/AppState"

export const wrapRootElement = ({ element }) => {
  return <AppState>{element}</AppState>
}
