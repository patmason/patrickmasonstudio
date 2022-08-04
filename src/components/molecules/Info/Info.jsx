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
      <motion.div variants={infoItem} className="rounded-xl mb-primary">
        <Card>
          <div className="p-primary">
            <div className="w-max">
              <Pill>
                <h2 className="uppercase">About</h2>
              </Pill>
            </div>
            <p className="mt-primary">
              Patrick Mason is a multi-disciplinary creative with a focus on
              website design and development. He collaborates with cultural,
              commercial and individual clients to create engaging and
              conceptual designs. His work has been featured on{" "}
              <a
                className="underline"
                href="https://www.itsnicethat.com/articles/double-click-october-2021-archives-digital-291021"
                target="_blank"
                rel="noopener noreferrer"
              >
                It's Nice That
              </a>{" "}
              and{" "}
              <a
                className="underline"
                href="https://www.hoverstat.es/features/the-global-studio"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hoverstat.es
              </a>
              .
            </p>
            <p className="mt-primary">
              He lives and works on unceded Gadigal land, Eora (Sydney)
            </p>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}

export default Info
