import React, { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import cx from "classnames"
import Card from "../../atoms/Card/Card"
import Avatar from "../../atoms/Avatar/Avatar"
import { default_transition } from "../../../utils/framerTransitions"

//dummy data
import { info as deets } from "../../../data/personal_info"

const deets_variants = {
  initial: { opacity: 0 },
  hidden: { opacity: 0 },
  exit: { height: 0 },
  visible: {
    opacity: 1,
    transition: { ...default_transition, delay: 0.5 },
  },
}

const ClockedInNotification = ({ title, message }) => {
  const [expanded, setExpanded] = useState(false)
  const [close, setClose] = useState(false)
  return (
    <Card layout>
      <div className="p-4 ">
        <motion.div
          layout
          className={cx(
            "flex items-center justify-between min-h-20 w-full gap-3 rounded-primary",
            { "flex-col": expanded }
          )}
        >
          <motion.div
            layout
            className={cx("shrink-0 w-14 h-14", { "w-40 h-40": expanded })}
            onClick={() => setClose(prev => !prev)}
          >
            <Avatar />
          </motion.div>
          <motion.div layout className="flex flex-col w-full">
            <motion.div
              layout
              className={cx("flex justify-between", {
                "flex-col": expanded,
              })}
            >
              <motion.div layout className="flex items-center justify-center">
                <motion.h4
                  layout
                  // transition={{ duration: 2, layout: { duration: 3 } }}
                  className={cx("font-medium", { "text-2xl": expanded })}
                >
                  Patrick Mason
                </motion.h4>
              </motion.div>
              {!expanded && <motion.p className="text-grey">6hrs ago</motion.p>}
            </motion.div>
            <motion.div
              layout
              className={cx("flex justify-start truncate text-grey", {
                "justify-center": expanded,
              })}
            >
              <motion.p layout="position">
                Clocked out {expanded && "• 6hrs ago"}
              </motion.p>
            </motion.div>
          </motion.div>
          {!expanded && (
            <motion.div className="flex flex-col items-center justify-center w-1/4 h-10 border-l-2 min-w-max">
              <button onClick={() => setExpanded(prev => !prev)}>•••</button>
            </motion.div>
          )}
        </motion.div>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={"initial"}
              animate={close ? "hidden" : "visible"}
              exit={"exit"}
              onAnimationComplete={variant => {
                console.log(variant)
                if (variant === "hidden") {
                  setExpanded(false)
                  setClose(false)
                }
              }}
              variants={deets_variants}
              className="mt-6"
              key="personal_details"
            >
              {deets.map(deet => {
                return (
                  <motion.div
                    variants={deets_variants}
                    key={deet.title}
                    className="mb-4 bg-gray-50 last:mb-0 rounded-xl"
                  >
                    <h4 className="px-4 mb-1 text-grey">{deet.title}</h4>
                    <p
                      // style={{ boxShadow: boxShadow.hole_light }}
                      className="px-4 py-1"
                    >
                      {deet.content}
                    </p>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  )
}

export default ClockedInNotification
