import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useStaticQuery, graphql } from "gatsby"
import AspectRatio from "../AspectRatio/AspectRatio"

const Avatar = ({ image }) => {
  const avatarQuery = useStaticQuery(graphql`
    query {
      file(relativeDirectory: { eq: "avatar" }) {
        childImageSharp {
          gatsbyImageData(width: 200)
        }
      }
    }
  `)
  const image_data = getImage(avatarQuery.file)
  return (
    <div className="overflow-hidden rounded-full max-w-[100px]">
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
