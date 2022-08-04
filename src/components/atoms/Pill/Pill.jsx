import React, { useContext, useEffect, useState } from "react"
import appContext from "../../../context/appContext"
import cx from "classnames"
import { motion } from "framer-motion"
import boxShadow from "../../../utils/boxShadow"
import { default_transition } from "../../../utils/framerTransitions"

const Pill = ({ children, align }) => {
  const {
    state: { darkMode },
  } = useContext(appContext)
  useEffect(() => console.log(darkMode))

  const [transition, setTransition] = useState({
    boxShadow: {
      ...default_transition,
      duration: 0.5,
      ease: "linear",
    },
  })

  const variants = {
    no_shadow: {
      boxShadow: darkMode ? boxShadow.dark : boxShadow.off_light,
    },
    initial_shadow: {
      boxShadow: darkMode ? boxShadow.hole_dark : boxShadow.hole_light,
    },
  }

  return (
    <motion.div
      initial={"no_shadow"}
      animate={"initial_shadow"}
      onAnimationComplete={variant => {
        if (variant === "initial_shadow") {
          setTransition({
            boxShadow: {
              ...default_transition,
              duration: 0.2,
            },
          })
        }
      }}
      variants={variants}
      transition={transition}
      className={cx(
        "px-4 h-10 w-full bg-light_bg dark:bg-dark_bg min-w-[3rem] rounded-full dm_transition inline-flex items-center",
        { "justify-start": align === "left", "justify-center": !align }
      )}
    >
      {children}
    </motion.div>
  )
}

export default Pill
