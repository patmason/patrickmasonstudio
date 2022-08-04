import React from "react"
import { motion } from "framer-motion"
import Card from "../../atoms/Card/Card"
import Pill from "../../atoms/Pill/Pill"

//data
import { info } from "../../../data/personal_info"
import { socials } from "../../../data/personal_info"
import Button from "../../atoms/Button/Button"

const Info = () => {
  const infoContainer = {
    initial: { opacity: 0, y: 100 },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        delay: 0.3,
        duration: 0.3,
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
    exit: {
      opacity: 0,
    },
  }
  const infoItem = {
    initial: { opacity: 0, scale: 0.5 },
    enter: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const socialsItem = {
    initial: { opacity: 0, scale: 0 },
    enter: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", duration: 0.3 },
    },
  }

  return (
    <motion.div
      layout
      initial={"initial"}
      animate={"enter"}
      variants={infoContainer}
      className="rounded-primary"
    >
      <motion.div
        variants={infoItem}
        className="flex justify-between my-primary"
      >
        {socials.map(item => {
          return (
            <div className="flex-1 mr-primary last:mr-0" key={item}>
              <a href={item.link} rel="noopener noreferrer" target="_blank">
                <Button>
                  <motion.div
                    variants={socialsItem}
                    className="flex items-center justify-center h-full py-2 first-line:flex rounded-xl"
                  >
                    <item.icon />
                  </motion.div>
                </Button>
              </a>
            </div>
          )
        })}
      </motion.div>
      {info.map(item => {
        return (
          <div key={item.title}>
            <motion.div variants={infoItem} className="rounded-xl mb-primary">
              <Card>
                <div className="p-primary">
                  <div className="w-max">
                    <Pill>
                      <h2 className="uppercase">{item.title}</h2>
                    </Pill>
                  </div>
                  <p className="mt-primary">{item.content}</p>
                </div>
              </Card>
            </motion.div>
          </div>
        )
      })}
    </motion.div>
  )
}

export default Info
