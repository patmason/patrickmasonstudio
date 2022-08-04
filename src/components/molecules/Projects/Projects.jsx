import React, { useState, useCallback, useContext } from "react"
import appContext from "../../../context/appContext"
import boxShadow from "../../../utils/boxShadow"
import { useStaticQuery, graphql } from "gatsby"
import { motion } from "framer-motion"
import useEmblaCarousel from "embla-carousel-react"

//Components
import Avatar from "../../atoms/Avatar/Avatar"
import Button from "../../atoms/Button/Button"
import AspectRatio from "../../atoms/AspectRatio/AspectRatio"

const Projects = ({ handleProjectSelect }) => {
  const {
    state: { darkMode },
  } = useContext(appContext)

  const [canScrollNext, setCanScrollNext] = useState(true)
  const [canScrollPrev, setCanScrollPrev] = useState(false)

  const {
    allFile: { nodes: projects },
  } = useStaticQuery(graphql`
    query {
      allFile(
        filter: {
          sourceInstanceName: { eq: "projects" }
          extension: { eq: "md" }
        }
      ) {
        nodes {
          childMarkdownRemark {
            frontmatter {
              videoSrcURL {
                publicURL
              }
              videoTitle
              avatar {
                childImageSharp {
                  gatsbyImageData
                }
              }
              title
              tags
              link
            }
            id
          }
        }
      }
    }
  `)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    // dragFree: true,
    containScroll: "trimSnaps",
    slidesToScroll: "auto",
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
    setCanScrollNext(emblaApi.canScrollNext())
    setCanScrollPrev(emblaApi.canScrollPrev())
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext()
      setCanScrollNext(emblaApi.canScrollNext())
      setCanScrollPrev(emblaApi.canScrollPrev())
    }
  }, [emblaApi, setCanScrollNext])

  return (
    <div ref={emblaRef} className="relative overflow-hidden">
      <div className="flex w-full gap-primary p-primary cursor-grab">
        <div className="flex flex-col w-1/4 px-2 cursor-pointer shrink-0">
          <AspectRatio ratio={100}>
            <a
              href="mailto:hello@patrickmason.studio"
              rel="noopener noreferrer"
            >
              <div
                style={{
                  boxShadow: darkMode ? boxShadow.on_dark : boxShadow.on_light,
                }}
                className="flex items-center justify-center w-full h-full rounded-full"
              >
                <svg
                  className="w-1/2 h-1/2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.25}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
            </a>
          </AspectRatio>
          <h2 className="mt-2 text-center truncate">Add Project</h2>
        </div>
        {projects.map(project => {
          return (
            <div
              onClick={() => handleProjectSelect(project)}
              key={project.childMarkdownRemark.id}
              className="flex flex-col w-1/4 cursor-pointer shrink-0 last:mr-primary"
            >
              <motion.div
                layout
                layoutId={`${project.childMarkdownRemark.id}_avatar`}
                className="px-2 mb-2"
              >
                <Avatar
                  image={
                    project.childMarkdownRemark.frontmatter.avatar
                      .childImageSharp.gatsbyImageData
                  }
                />
              </motion.div>
              <motion.h2
                layout="position"
                layoutId={`${project.childMarkdownRemark.id}_title`}
                className="text-center truncate"
              >
                {project.childMarkdownRemark.frontmatter.title}
              </motion.h2>
            </div>
          )
        })}
      </div>
      {canScrollNext && (
        <div className="absolute inset-y-0 flex items-center justify-center right-2">
          <Button clickHandler={scrollNext}>
            <span className="absolute -translate-x-1/2 -translate-y-1/2">
              →
            </span>
          </Button>
        </div>
      )}
      {canScrollPrev && (
        <div className="absolute inset-y-0 flex items-center justify-center left-2">
          <Button clickHandler={scrollPrev}>
            <span className="absolute -translate-x-1/2 -translate-y-1/2">
              ←
            </span>
          </Button>
        </div>
      )}
    </div>
  )
}

export default Projects
