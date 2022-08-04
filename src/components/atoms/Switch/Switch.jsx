import React, { useContext, useState } from "react"
import appContext from "../../../context/appContext"
import cx from "classnames"
import { motion } from "framer-motion"
import boxShadow from "../../../utils/boxShadow"
import { default_transition } from "../../../utils/framerTransitions"
//sound
import useSound from "use-sound"
import switchOnSFX from "../../../sounds/switch-on.mp3"
import switchOffSFX from "../../../sounds/switch-off.mp3"

const Switch = ({ clickHandler = () => {} }) => {
  const [playOn] = useSound(switchOnSFX)
  const [playOff] = useSound(switchOffSFX)
  const {
    state: { darkMode },
  } = useContext(appContext)
  const [switchOn, setSwitchOn] = useState(false)
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

  const hole_variants = {
    no_shadow: {
      boxShadow: darkMode ? boxShadow.dark : boxShadow.off_light,
    },
    initial_shadow: {
      boxShadow: darkMode ? boxShadow.hole_dark : boxShadow.hole_light,
    },
  }
  return (
    <motion.div
      roll="switch"
      onClick={() => {
        setSwitchOn ? playOff() : playOn()
        setSwitchOn(prev => !prev)
        clickHandler()
      }}
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
        "cursor-pointer p-1 px-1.5 h-10 w-switch dark:bg-dark_bg bg-light_bg inline-flex flex-row items-center rounded-full dm_transition",
        {
          "justify-end": !switchOn,
          "justify-start": switchOn,
        }
      )}
    >
      <motion.div
        layout
        transition={transition}
        variants={hole_variants}
        className="w-8 h-8 rounded-full bg-light_bg dark:bg-dark_bg dm_transition"
      ></motion.div>
    </motion.div>
  )
}

export default Switch
