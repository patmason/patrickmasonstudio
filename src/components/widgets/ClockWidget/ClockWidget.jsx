import React, { useState, useContext } from "react"
import appContext from "../../../context/appContext"
import { AnimatePresence, motion } from "framer-motion"
import cx from "classnames"
//components
import Card from "../../atoms/Card/Card"
import Clock from "../../molecules/Clock/Clock"
import Switch from "../../atoms/Switch/Switch"
import Button from "../../atoms/Button/Button"
import Info from "../../molecules/Info/Info"
//utilities
import { default_transition } from "../../../utils/framerTransitions"
import boxShadow from "../../../utils/boxShadow"
const ClockWidget = () => {
  const {
    state: { darkMode },
    dispatch,
  } = useContext(appContext)
  const [isOpen, setIsOpen] = useState(false)
  const [showSwitches, setShowSwitches] = useState(false)

  return (
    <>
      <div className="relative z-10 mb-primary">
        <Card layout>
          <div className="relative p-primary">
            {showSwitches && (
              <motion.div
                layout
                className="absolute flex justify-between left-primary right-primary"
              >
                <motion.div>
                  <Button
                    clickHandler={() => {
                      setIsOpen(prev => !prev)
                    }}
                  >
                    {isOpen ? `X` : `?`}
                  </Button>
                </motion.div>
                <div className="">
                  <Switch
                    clickHandler={() => dispatch({ type: "TOGGLE_DARK_MODE" })}
                  />
                </div>
              </motion.div>
            )}
            <motion.div layout className="flex justify-center">
              <div
                onClick={() => setIsOpen(prev => !prev)}
                className={cx("w-full", { "w-1/2": isOpen })}
              >
                <Clock readyCallback={() => setShowSwitches(true)} />
              </div>
            </motion.div>
            {isOpen && <Info />}
          </div>
        </Card>
      </div>
    </>
  )
}

export default ClockWidget
