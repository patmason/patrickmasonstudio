import React from "react"
import { motion } from "framer-motion"
const AspectRatio = ({ children, ratio }) => {
  return (
    <div className={`relative`} style={{ paddingBottom: `${ratio}%` }}>
      <div className="absolute inset-0">{children}</div>
    </div>
  )
}

export default AspectRatio
