import React, { useState, useRef, useContext, useEffect } from "react"
import appContext from "../../../context/appContext"
import { motion } from "framer-motion"

//utils
import boxShadow from "../../../utils/boxShadow"
import { default_transition } from "../../../utils/framerTransitions"

//sound
import useSound from "use-sound"
import switchOnSFX from "../../../sounds/switch-on.mp3"
import switchOffSFX from "../../../sounds/switch-off.mp3"

//hooks
import useTime from "../../../hooks/useTime"

//svg variables
const viewBoxWidth = 100
const viewBoxCenter = viewBoxWidth / 2
const patrick = ["P", "A", "T", "R", "I", "C", "K"]
const mason = ["M", "A", "S", "O", "N"]

//Framer motion
const lettersDelay = 2
const handsDelay = 5
const handsDuration = 1.5

const Clock = ({ onClockClick, readyCallback }) => {
  const {
    state: { darkMode },
  } = useContext(appContext)
  const [playOn] = useSound(switchOnSFX)
  const [playOff] = useSound(switchOffSFX)
  const time = useTime(1000)
  const initialTime = useRef(time)
  const [clockState, setClockState] = useState("initial")
  useEffect(() => {
    setClockState("faceVisible")
  }, [])

  const clockVariants = {
    initial: {
      // backgroundColor: "#ace770",
      boxShadow: darkMode ? boxShadow.off_dark : boxShadow.off_light,
    },
    faceVisible: {
      // backgroundColor: "#e7708c",
      boxShadow: darkMode ? boxShadow.on_dark : boxShadow.on_light,
      transition: {
        ...default_transition,
        duration: 0.5,
        ease: "linear",
        delay: 1.5,
      },
    },
    handsInPosition: {
      // backgroundColor: "#7c70e7",
      boxShadow: darkMode ? boxShadow.on_dark : boxShadow.on_light,
      transition: {
        boxShadow: {
          ...default_transition,
          duration: 0.2,
        },
      },
    },
    tap: {
      boxShadow: darkMode ? boxShadow.off_dark : boxShadow.off_light,
      scale: 0.99,
      transition: {
        ...default_transition,
        duration: 0.2,
      },
    },
  }

  return (
    <motion.div
      layout
      variants={clockVariants}
      initial={"initial"}
      animate={clockState}
      onAnimationComplete={variant => {
        if (variant === "faceVisible") {
          readyCallback()
        }
      }}
      whileTap={"tap"}
      onMouseDown={playOn}
      onMouseUp={playOff}
      onClick={onClockClick}
      style={{
        borderRadius: "50%",
      }}
      className="font-light bg-light_bg dark:bg-dark_bg dm_transition"
    >
      <motion.svg
        id="clockFace"
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxWidth}`}
        // className="bg-black"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Letters */}
        <g transform={`rotate(-90 ${viewBoxCenter} ${viewBoxCenter})`}>
          {patrick.map((letter, index) => {
            return (
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  ...default_transition,
                  delay: index * 0.2 + lettersDelay,
                }}
                className={
                  "dark:fill-light_bg fill-dark_text dark:bg-dark_bg  dm_transition"
                }
                fontSize={"10"}
                stroke="none"
                key={index}
                x={viewBoxCenter}
                y={viewBoxCenter}
                textAnchor="middle"
                dominantBaseline="middle"
                transform={`rotate(${
                  index * 30
                } ${viewBoxCenter} ${viewBoxCenter}) translate(0 -42) rotate(-${
                  index * 30 + 270
                } ${viewBoxCenter} ${viewBoxCenter}) translate(0 0.75)`}
              >
                {letter}
              </motion.text>
            )
          })}
          {mason.map((letter, index) => {
            return (
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  ...default_transition,
                  delay: (index + 8) * 0.2 + lettersDelay,
                }}
                className={
                  "dark:fill-light_bg fill-dark_text dark:bg-dark_bg  dm_transition"
                }
                fontSize={"10"}
                stroke="none"
                key={index}
                x={viewBoxCenter}
                y={viewBoxCenter}
                textAnchor="middle"
                dominantBaseline="middle"
                transform={`rotate(${
                  330 - index * 30
                } ${viewBoxCenter} ${viewBoxCenter}) translate(0 -42) rotate(${
                  120 + index * 30
                } ${viewBoxCenter} ${viewBoxCenter}) translate(0 0.75)`}
              >
                {letter}
              </motion.text>
            )
          })}
        </g>
        {/* Hands */}
        <motion.path
          onAnimationComplete={() => {
            setClockState("handsInPosition")
          }}
          initial={{
            opacity: 0,
            rotate: 0,
            originX: "50",
            originY: "50",
          }}
          animate={{
            opacity: 1,
            rotate:
              clockState === "handsInPosition"
                ? (time.hours % 12) * 30 + 30 / (60 / time.minutes)
                : (initialTime.current.hours % 12) * 30 +
                  30 / (60 / initialTime.current.minutes),
          }}
          transition={{
            ...default_transition,
            opacity: {
              duration: 0.5,
            },
            delay: clockState === "handsInPosition" ? 0 : handsDelay,
            duration: clockState === "handsInPosition" ? 0.2 : handsDuration,
          }}
          id="hours"
          d="M48.1815 23.9996C48.9089 23.519 49.4609 23.0318 49.7922 22.5707C49.7662 22.863 49.7402 23.2267 49.7402 23.6943L49.7402 50H50.2598L50.2598 23.6943C50.2598 23.2267 50.2338 22.863 50.2078 22.5707C50.5391 23.0318 51.0911 23.519 51.8185 23.9996L52.1563 23.5904C51.1236 22.9604 50.5456 22.4019 50.0195 21.6744H49.9805C49.4545 22.4019 48.8764 22.9604 47.8438 23.5904L48.1815 23.9996Z"
          className={
            "dark:fill-light_bg fill-dark_text dark:bg-dark_bg  dm_transition"
          }
          // transform={`rotate(${
          //   (time.hours % 12) * 30 + 30 / (60 / time.minutes)
          // } ${viewBoxCenter} ${viewBoxCenter})`}
        />
        <motion.path
          initial={{
            opacity: 0,
            rotate: 0,
            originX: "50",
            originY: "50",
          }}
          animate={{
            opacity: 1,
            rotate:
              clockState === "handsInPosition"
                ? [time.minutes === 0 ? 0 : null, time.minutes * 6 + 1]
                : initialTime.current.minutes * 6,
          }}
          transition={{
            ...default_transition,
            opacity: {
              duration: 0.5,
            },
            delay: clockState === "handsInPosition" ? 0 : handsDelay,
            duration: clockState === "handsInPosition" ? 0.2 : handsDuration,
          }}
          id="minutes"
          stroke="none"
          d="M48.1815 16.0002C48.9089 15.5196 49.4609 15.0325 49.7922 14.5713C49.7662 14.8636 49.7402 15.2273 49.7402 15.6949V50.0006H50.2598V15.6949C50.2598 15.2273 50.2338 14.8636 50.2078 14.5713C50.5391 15.0325 51.0911 15.5196 51.8185 16.0002L52.1563 15.591C51.1236 14.961 50.5456 14.4025 50.0195 13.675H49.9805C49.4545 14.4025 48.8764 14.961 47.8438 15.591L48.1815 16.0002Z"
          className={"dark:fill-light_bg fill-dark_text  dm_transition"}
          // transform={`rotate(${
          //   time.minutes * 6
          // } ${viewBoxCenter} ${viewBoxCenter})`}
        />
        <motion.line
          initial={{
            opacity: 0,
            rotate: 0,
            originX: "50",
            originY: "50",
          }}
          animate={{
            opacity: 1,
            rotate:
              clockState === "handsInPosition"
                ? [time.seconds === 0 ? 1 : null, (time.seconds + 1) * 6]
                : (initialTime.current.seconds + handsDelay + 1) * 6,
          }}
          transition={{
            ...default_transition,
            opacity: {
              duration: 0.5,
            },
            delay: clockState === "handsInPosition" ? 0 : handsDelay,
            duration: clockState === "handsInPosition" ? 0.2 : handsDuration,
          }}
          id="secondHand"
          stroke="#da482b"
          strokeWidth={0.4}
          x1={viewBoxCenter}
          y1={`${viewBoxCenter + 6}`}
          x2={viewBoxCenter}
          y2="5"
          // transform={`rotate(${
          //   time.seconds * 6
          // } ${viewBoxCenter} ${viewBoxCenter})`}
        />
        <motion.circle
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            ...default_transition,
            duration: 0.5,
            delay: handsDelay,
          }}
          stroke="none"
          cx="50"
          cy="50"
          r="1"
          fill="#da482b"
        />
      </motion.svg>
    </motion.div>
  )
}

export default Clock
