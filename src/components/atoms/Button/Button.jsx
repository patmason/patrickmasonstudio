import React, { useContext, useState } from "react"
import appContext from "../../../context/appContext"
import { motion } from "framer-motion"
import boxShadow from "../../../utils/boxShadow"
import { default_transition } from "../../../utils/framerTransitions"

const Button = ({ children, clickHandler }) => {
  const {
    state: { darkMode },
  } = useContext(appContext)

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
      boxShadow: darkMode
        ? boxShadow.button_on_dark
        : boxShadow.button_on_light,
    },
  }

  return (
    <motion.button
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
      whileTap={{
        boxShadow: darkMode ? boxShadow.off_dark : boxShadow.off_light,
        scale: 0.9,
        transition: {
          ...default_transition,
          duration: 0.2,
        },
      }}
      onMouseUp={clickHandler}
      className="px-4 h-10 bg-light_bg dark:bg-dark_bg min-w-[2.5rem] w-full rounded-full dm_transition"
    >
      {children}
    </motion.button>
  )
}

export default Button
