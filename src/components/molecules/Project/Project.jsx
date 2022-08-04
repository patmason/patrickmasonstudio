import React from "react"
import { motion } from "framer-motion"

//components
import Avatar from "../../atoms/Avatar/Avatar"
import AspectRatio from "../../atoms/AspectRatio/AspectRatio"
import Pill from "../../atoms/Pill/Pill"
import Button from "../../atoms/Button/Button"
import Card from "../../atoms/Card/Card"

const Project = ({ handleProjectSelect, project }) => {
  console.log(
    project.childMarkdownRemark.frontmatter.avatar.childImageSharp
      .gatsbyImageData
  )
  return (
    <div className="relative flex flex-col md:w-[50vw] w-[90vw]">
      <div className="flex items-center w-full gap-2 pb-4 p-primary">
        <motion.div
          layout
          layoutId={`${project.childMarkdownRemark.id}_avatar`}
          className="px-2 w-14"
        >
          <Avatar
            image={
              project.childMarkdownRemark.frontmatter.avatar.childImageSharp
                .gatsbyImageData
            }
          />
        </motion.div>
        <motion.h2
          layout="position"
          layoutId={`${project.childMarkdownRemark.id}_title`}
          className="flex-1 truncate"
        >
          <Pill align={"left"}>
            {project.childMarkdownRemark.frontmatter.link}
          </Pill>
        </motion.h2>
        <a
          rel="noopener noreferrer"
          target="_blank"
          href={project.childMarkdownRemark.frontmatter.link}
        >
          <Button>↗</Button>
        </a>
        <div>
          <Button clickHandler={() => handleProjectSelect(null)}>x</Button>
        </div>
      </div>
      <AspectRatio ratio={70}>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center w-full h-full"
        >
          <Card borderRadius="0 0 5px 5px">
            <video
              className="object-contain w-full h-full"
              autoPlay
              muted
              loop
              playsInline
            >
              <source
                src={
                  project.childMarkdownRemark.frontmatter.videoSrcURL.publicURL
                }
                type="video/mp4"
              />
            </video>
          </Card>
        </motion.div>
      </AspectRatio>
      <ul className="flex items-center gap-2 pt-4 p-primary">
        <li>Tags:</li>
        {project.childMarkdownRemark.frontmatter.tags.map(tag => {
          return (
            <li>
              <Pill key={tag}>{tag}</Pill>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Project
