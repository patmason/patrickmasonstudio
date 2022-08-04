import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import useMeasure from "react-use-measure"

const Carousel = () => {
  const [count, setCount] = useState(1)
  const [ref, { width }] = useMeasure()
  const prev = usePrevious(count)
  const direction = prev < count ? 1 : -1

  return (
    <div className="text-dark_text">
      <div className="flex justify-between">
        <button onClick={() => setCount(count - 1)}>Prev</button>
        <button onClick={() => setCount(count + 1)}>Next</button>
      </div>
      <div className="flex justify-center mt-8">
        <div
          ref={ref}
          className="relative flex items-center justify-center w-1/2 h-24 overflow-hidden bg-purple-200 rounded"
        >
          <AnimatePresence custom={{ direction, width }}>
            <motion.div
              key={count}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={{ direction, width }}
              // transition={{ duration: 1 }}
              className={`absolute flex items-center justify-center w-20 h-20 ${
                colors[Math.abs(count) % 4]
              }`}
            >
              {direction}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

const colors = ["bg-yellow-200", "bg-green-300", "bg-blue-500", "bg-gray-300"]
const variants = {
  enter: ({ direction, width }) => ({
    x: direction * width,
  }),
  center: { x: 0 },
  exit: ({ direction, width }) => ({
    x: direction * (width * -1),
  }),
}
function usePrevious(state) {
  const [tuple, setTuple] = useState([null, state])
  if (tuple[1] !== state) {
    setTuple([tuple[1], state])
  }
  return tuple[0]
}
export default Carousel
