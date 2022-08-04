import React, { useContext, useState } from "react"
import appContext from "../../../context/appContext"
import { motion } from "framer-motion"
import boxShadow from "../../../utils/boxShadow"
import { default_transition } from "../../../utils/framerTransitions"

const Card = ({
  children,
  layout,
  borderRadius = "25px",
  noShadow,
  // transition = {},
  // animate = {},
  // initial = {},
}) => {
  const {
    state: { darkMode },
  } = useContext(appContext)

  const [transition, setTransition] = useState({
    boxShadow: {
      ...default_transition,
      duration: 0.5,
      ease: "linear",
      delay: 1,
    },
  })

  const variants = {
    no_shadow: {
      boxShadow: darkMode ? boxShadow.off_dark : boxShadow.off_light,
    },
    initial_shadow: {
      boxShadow: darkMode ? boxShadow.on_dark : boxShadow.on_light,
    },
  }

  return (
    <motion.div
      initial={"no_shadow"}
      animate={noShadow ? "no_shadow" : "initial_shadow"}
      onAnimationComplete={variant => {
        if (variant === "initial_shadow") {
          setTransition({
            layout: {
              ...default_transition,
              duration: 0.4,
              ease: [0.37, 0, 0.63, 1],
            },
            boxShadow: {
              ...default_transition,
              duration: 0.2,
            },
          })
        }
      }}
      variants={variants}
      transition={transition}
      layout={layout}
      style={{
        // boxShadow: boxShadow.on_light,
        borderRadius: borderRadius,
      }}
      className="overflow-hidden bg-light_bg dark:bg-dark_bg rounded-primary dm_transition"
    >
      {children}
    </motion.div>
  )
}

export default Card
