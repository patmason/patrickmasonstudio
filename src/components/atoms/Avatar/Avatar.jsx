import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useStaticQuery, graphql } from "gatsby"
import AspectRatio from "../AspectRatio/AspectRatio"

const Avatar = ({ image }) => {
  return (
    <div
      style={{ webkitMaskImage: "-webkit-radial-gradient(white, black)" }}
      className="overflow-hidden rounded-full max-w-[100px]"
    >
      <AspectRatio ratio={100}>
        <GatsbyImage
          image={image}
          alt="my avatar"
          className="object-cover w-full h-full"
        />
      </AspectRatio>
    </div>
  )
}

export default Avatar
