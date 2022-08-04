import React, { useContext } from "react"
import cx from "classnames"
//context
import appContext from "../context/appContext"
//components
import Seo from "../components/seo"
import ClockWidget from "../components/widgets/ClockWidget/ClockWidget"
import ProjectsWidget from "../components/widgets/ProjectsWidget/ProjectsWidget"
import { LayoutGroup } from "framer-motion"
const IndexPage = () => {
  const { state } = useContext(appContext)
  return (
    <>
      <Seo title="Home" />
      <div
        className={cx("antialiased h-full", {
          dark: state.darkMode,
        })}
      >
        <div className="bg-light_bg dark:bg-dark_bg text-dark_text dark:text-light_bg min-h-[100vh] h-full dm_transition">
          <div className="flex flex-col items-start justify-between h-full md:flex-row gap-primary p-primary">
            <div className="flex flex-col w-full h-full md:w-1/3 shrink-0">
              <LayoutGroup>
                <ClockWidget />
                <ProjectsWidget />
              </LayoutGroup>
            </div>
            <div className="w-full md:w-1/3 shrink-0"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default IndexPage
